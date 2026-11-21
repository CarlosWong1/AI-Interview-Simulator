import test from "node:test";
import assert from "node:assert/strict";
import express from "express";
import request from "supertest";
import { createRequireAuth } from "../middleware/requireAuth.js";
import { createInterviewRouter } from "../routes/interviewRouter.js";
import { createRateLimiter } from "../middleware/rateLimiter.js";

const fakeAuth = (req, res, next) => {
  const userId = req.get("x-test-user-id");

  if (!userId) {
    return res.status(401).json({
      error: "Unauthorized"
    });
  }

  req.user = { id: userId };

  return next();
};

const createTestApp = ({auth, limiter, startController, evaluationController}) => {
  const app = express();
  const router = createInterviewRouter(auth, limiter, startController, evaluationController);

  app.use("/api/interview", router);

  return app;
}

test("Should return 401 when requesting interview without authentication", async () => {
  let controllerCalls = 0;
  let rateLimiterCalls = 0;

  const fakeController = (req, res) => {
    controllerCalls++;
    return res.status(200).json({ message: "Success" });
  };

  const fakeRateLimiter = (req, res, next) => {
    rateLimiterCalls++;
    return next();
  }

  const app = createTestApp({
    auth: fakeAuth,
    limiter: fakeRateLimiter,
    startController: fakeController,
    evaluationController: fakeController
  })

  const response = await request(app)
    .post("/api/interview/start")
  
  assert.equal(response.status, 401);
  assert.equal(controllerCalls, 0);
  assert.equal(rateLimiterCalls, 0);
})

test("Should allow authenticated requests to reach controller", async () => {
  let receivedUserId = null; 
  let controllerCalls = 0;
  let rateLimiterCalls = 0;

  const fakeController = (req, res) => {
    controllerCalls++;
    receivedUserId = req.user.id;
    return res.status(200).json({ message: "Success" });
  };

  const fakeRateLimiter = (req, res, next) => {
    rateLimiterCalls++;
    return next();
  }

  const app = createTestApp({
    auth: fakeAuth,
    limiter: fakeRateLimiter,
    startController: fakeController,
    evaluationController: fakeController
  })

  const response = await request(app)
    .post("/api/interview/start")
    .set("x-test-user-id", "user-111"); 
  
  assert.equal(response.status, 200);
  assert.equal(receivedUserId, "user-111");
  assert.equal(controllerCalls, 1);
  assert.equal(rateLimiterCalls, 1);
})

test("Should block unauthenticated evaluation request", async () => {
  let evaluatedCalls = 0;
  let rateLimiterCalls = 0;

  const fakeController = (req, res) => {
    evaluatedCalls++;
    return res.status(200).json({ message: "Success" });
  };

  const middleware = createRequireAuth(() => {
    throw new Error("Supabase should not be called");
  });

  const fakeRateLimiter = (req, res, next) => {
    rateLimiterCalls++;
    return next();
  }

  const app = createTestApp({
    auth: middleware,
    limiter: fakeRateLimiter,
    startController: fakeController,
    evaluationController: fakeController
  })

  const response = await request(app)
    .post("/api/interview/evaluate")
  
  assert.equal(response.status, 401);
  assert.equal(evaluatedCalls, 0);
  assert.equal(rateLimiterCalls, 0);
})

test("Should execute only evaluation controller with valid authentication", async () => {
  let startCalls = 0;
  let evaluationCalls = 0;
  let userId = null;
  let rateLimiterCalls = 0;

  const fakeValidClient = {
    auth: {
      getUser: async () => ({
        data: {
          user: {
            id: "user-121212",
            email: "validUser@example.com"
          }
        },
        error: null
      })
    }
  }

  const fakeStartController = (req, res) => {
    startCalls++;
    return res.status(200).json({message: "Success"});
  }

  const fakeEvaluationController = (req, res) => {
    evaluationCalls++;
    userId = req.user.id;
    return res.status(200).json({message: "Success"});
  }

  const middleware = createRequireAuth(() => fakeValidClient);

  const fakeRateLimiter = (req, res, next) => {
    rateLimiterCalls++;
    return next();
  }

  const app = createTestApp({
    auth: middleware,
    limiter: fakeRateLimiter,
    startController: fakeStartController,
    evaluationController: fakeEvaluationController
  })

  const response = await request(app)
    .post("/api/interview/evaluate")
    .set("Authorization", "Bearer valid-token")

  assert.equal(response.status, 200);
  assert.equal(evaluationCalls, 1);
  assert.equal(userId, "user-121212");
  assert.equal(startCalls, 0);
  assert.equal(rateLimiterCalls, 1)
})

test("Should share rate limit across interview endpoints", async () => {
  let startCalls = 0;
  let evaluationCalls = 0;
  let userId = null;

  const limiter = createRateLimiter(2, 60_000);

  const fakeValidClient = {
    auth: {
      getUser: async () => ({
        data: {
          user: {
            id: "user-111",
            email: "validUser@example.com"
          }
        },
        error: null
      })
    }
  }

  const fakeStartController = (req, res) => {
    startCalls++;
    return res.status(200).json({message: "Success"});
  }

  const fakeEvaluationController = (req, res) => {
    evaluationCalls++;
    userId = req.user.id;
    return res.status(200).json({message: "Success"});
  }

  const middleware = createRequireAuth(() => fakeValidClient);

  const app = createTestApp({
    auth: middleware,
    limiter: limiter,
    startController: fakeStartController,
    evaluationController: fakeEvaluationController
  })

  const response1 = await request(app)
    .post("/api/interview/start")
    .set("Authorization", "Bearer valid-token")

  const response2 = await request(app)
    .post("/api/interview/evaluate")
    .set("Authorization", "Bearer valid-token")

  const response3 = await request(app)
    .post("/api/interview/start")
    .set("Authorization", "Bearer valid-token")

  assert.equal(startCalls, 1);
  assert.equal(evaluationCalls, 1);
  assert.equal(userId, "user-111")
  assert.equal(response1.status, 200);
  assert.equal(response2.status, 200);
  assert.equal(response3.status, 429);
  assert.equal(response3.body.error, "Too many requests. Please try again");
})

test("Should track rate limits separately for each user", async () => {
  let startCalls = 0;

  const limiter = createRateLimiter(2, 60_000);

  const fakeStartController = (req, res) => {
    startCalls++;
    return res.status(200).json({ message: "Success" });
  };

  const app = createTestApp({
    auth: fakeAuth,
    limiter: limiter,
    startController: fakeStartController,
    evaluationController: fakeStartController
  })

  const response1 = await request(app)
    .post("/api/interview/start")
    .set("x-test-user-id", "user-111")

  const response2 = await request(app)
    .post("/api/interview/start")
    .set("x-test-user-id", "user-222")

  const response3 = await request(app)
    .post("/api/interview/start")
    .set("x-test-user-id", "user-111")

  const response4 = await request(app)
    .post("/api/interview/start")
    .set("x-test-user-id", "user-222")

  const response5 = await request(app)
    .post("/api/interview/start")
    .set("x-test-user-id", "user-111");

  assert.equal(response1.status, 200);
  assert.equal(response2.status, 200);
  assert.equal(response3.status, 200);
  assert.equal(response4.status, 200);
  assert.equal(response5.status, 429);
  assert.equal(startCalls, 4);
});
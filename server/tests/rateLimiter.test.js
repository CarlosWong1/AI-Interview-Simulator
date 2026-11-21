import test from "node:test";
import assert from "node:assert/strict";
import { createRateLimiter } from "../middleware/rateLimiter.js";

const mockResponse = () => ({
  statusCode: null,
  body: null,

  status(code) {
    this.statusCode = code;
    return this;
  },

  json(data) {
    this.body = data;
    return this;
  }
});

test("Rate limiter allows a new user's first request", () => {
  let nextCalls = 0;

  const limiter = createRateLimiter(2, 60_000);

  const req = {
    user: {
      id: "user-123"
    }
  }

  const res = mockResponse();

  const next = () => {
    nextCalls++;
  }

  limiter(req, res, next);

  assert.equal(nextCalls, 1);
})

test("Rate limiter rejects request exeeding the limit", () => {
  let nextCalls = 0;

  const limiter = createRateLimiter(2, 60_000);

  const req = {
    user: {
      id: "user-123",
      email: "validUser@example.com"
    }
  }

  const res = mockResponse();

  const next = () => {
    nextCalls++;
  }

  limiter(req, res, next);
  limiter(req, res, next);
  limiter(req, res, next);

  assert.equal(nextCalls, 2);
  assert.equal(res.statusCode, 429);
  assert.equal(res.body.error, "Too many requests. Please try again");
})

test("Rate limiter tracks user independently", () => {
  let user1NextCalls = 0;
  let user2NextCalls = 0;
  
  const limiter = createRateLimiter(2, 60_000);

  const req1 = {
    user: {
      id: "user-1212"
    }
  }

  const req2 = {
    user: {
      id: "user-2323"
    }
  }

  const res1 = mockResponse();
  const res2 = mockResponse();

  const next1 = () => {
    user1NextCalls++;
  };

  const next2 = () => {
    user2NextCalls++;
  }

  limiter(req1, res1, next1);
  limiter(req1, res1, next1);
  limiter(req2, res2, next2);
  limiter(req1, res1, next1);

  assert.equal(user1NextCalls, 2);
  assert.equal(user2NextCalls, 1);
  assert.equal(res1.statusCode, 429);
  assert.equal(res1.body.error, "Too many requests. Please try again");
  assert.equal(res2.statusCode, null);
})

test("Rate limiter resets after time window expires", (t) => {
  let currentTime = 1000;
  let nextCalls = 0;

  t.mock.method(Date, "now", () => currentTime);

  const limiter = createRateLimiter(2, 1000);

  const req = {
    user: {
      id: "user-123"
    }
  }

  const blockedRes = mockResponse();
  const resetRes = mockResponse();

  const next = () => {
    nextCalls++;
  }

  limiter(req, blockedRes, next);
  limiter(req, blockedRes, next);
  limiter(req, blockedRes, next);

  currentTime = 2000;

  limiter(req, resetRes, next);

  assert.equal(blockedRes.statusCode, 429);
  assert.equal(blockedRes.body.error, "Too many requests. Please try again");
  assert.equal(nextCalls, 3);
  assert.equal(resetRes.statusCode, null);
})


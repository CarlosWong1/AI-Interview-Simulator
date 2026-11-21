import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../app.js";
import express from "express";
import { createInterviewRouter } from "../routes/interviewRouter.js";
import { createInterviewTopicController } from "../controllers/interviewController.js";

const fakeAuth = (req, res, next) => {
  req.user = { id: "test-user-123" };
  return next();
};

const fakeGenerateQuestions = async () => ({
  questions: []
});

const testStartController = createInterviewTopicController(fakeGenerateQuestions);

const testApp = express();

testApp.use(express.json());

const fakeRateLimiter = (req, res, next) => {
  return next();
}

const router = createInterviewRouter(fakeAuth, fakeRateLimiter, testStartController, (req, res) => res.sendStatus(501));

testApp.use("/api/interview", router);

test("GET /api/health returns 200", async () => {
  const response = await request(app).get("/api/health");

  assert.equal(response.status, 200);
  assert.equal(response.body.status, "ok");
})

test("GET unknown endpoint returns 404", async () => {
  const response = await request(app).get("/api/does-not-exist");

  assert.equal(response.status, 404);
})

test("POST /api/interview/start rejects invalid topic", async () => {
  const response = await request(testApp)
    .post("/api/interview/start")
    .send({topic: "finance"});

  assert.equal(response.status, 400);
  assert.equal(response.body.error, "Invalid interview topic");
})

test("POST /api/interview/start rejects missing topic", async () => {
  const response = await request(testApp)
    .post("/api/interview/start")
    .send({topic: ""});

  assert.equal(response.status, 400);
  assert.equal(response.body.error, "Topic is required");
})
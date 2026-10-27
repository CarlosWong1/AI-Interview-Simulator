import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../app.js";

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
  const response = await request(app)
    .post("/api/interview/start")
    .send({topic: "finance"});

  assert.equal(response.status, 400);
  assert.equal(response.body.error, "Invalid interview topic");
})

test("POST /api/interview/start rejects missing topic", async () => {
  const response = await request(app)
    .post("/api/interview/start")
    .send({topic: ""});

  assert.equal(response.status, 400);
  assert.equal(response.body.error, "Topic is required"); 
})
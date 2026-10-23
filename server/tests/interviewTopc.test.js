import test from "node:test";
import assert from "node:assert/strict";
import { interviewTopics } from "../lib/InterviewTopics.js";

test("Frontend topic should exist", () => {
  assert.ok(interviewTopics.frontend);
});
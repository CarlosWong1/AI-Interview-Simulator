import test from "node:test";
import assert from "node:assert/strict";
import { createInterviewTopicController } from "../controllers/interviewController.js";

const fakeGenerateQuestions = async () => {
  return {
    questions: [
      { question: "What is React?" },
      { question: "What is useState?" },
      { question: "What is useEffect?" },
    ],
  };
};

const fakeGeminiFailure = async () => {
  throw new Error("Gemini API unavailable");
};

const req = {
  body: {
    topic: "frontend",
  },
};

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
  },
});

test("Controller returns mocked interview questions", async () => {
  const controller = createInterviewTopicController(fakeGenerateQuestions);

  const res = mockResponse();
  await controller(req, res);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, await fakeGenerateQuestions());
});

test("Controller handles Gemini PAI faliure", async () => {
  const controller = createInterviewTopicController(fakeGeminiFailure);

  const res = mockResponse();
  await controller(req, res);

  assert.equal(res.statusCode, 500);
  assert.deepEqual(res.body.error, "Gemini API unavailable");
});

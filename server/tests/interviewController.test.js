import test from "node:test";
import assert from "node:assert/strict";
import { createInterviewTopicController, createInterviewEvaluation} from "../controllers/interviewController.js";

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
  const fakeGenerateQuestions = async () => {
    return {
      questions: [
        { question: "What is React?" },
        { question: "What is useState?" },
        { question: "What is useEffect?" },
      ],
    };
  };

  const controller = createInterviewTopicController(fakeGenerateQuestions);

  const res = mockResponse();
  await controller(req, res);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, {questions: [
        { question: "What is React?" },
        { question: "What is useState?" },
        { question: "What is useEffect?" },
      ],});
});

test("Controller handles Gemini API faliure", async () => {
  const fakeGeminiFailure = async () => {
    throw new Error("Gemini API unavailable");
  };

  const controller = createInterviewTopicController(fakeGeminiFailure);

  const res = mockResponse();
  await controller(req, res);

  assert.equal(res.statusCode, 500);
  assert.equal(res.body.error, "Internal server error");
});

test("Controller rejects missing interview topic", async () => {
  let generatedCalls = 0;

  const fakeGenerate = async () => {
    generatedCalls++
    return {questions: []}
  };

  const controller = createInterviewTopicController(fakeGenerate);

  const req = {
    body: {}
  }

  const res = mockResponse();
  await controller(req, res);

  assert.equal(res.statusCode, 400);
  assert.equal(res.body.error, "Topic is required");
  assert.equal(generatedCalls, 0);
})

test("Controller rejects invalid interview topic", async () => {
  let generatedCalls = 0;

  const fakeGenerate = async () => {
    generatedCalls++
    return {questions: []}
  };

  const controller = createInterviewTopicController(fakeGenerate);

  const req = {
    body: {
      topic: "Banana"
    }
  }

  const res = mockResponse();
  await controller(req, res);

  assert.equal(res.statusCode, 400);
  assert.equal(res.body.error, "Invalid interview topic");
  assert.equal(generatedCalls, 0);
})

test("Controller rejects non-string interview topic", async () => {
  let generatedCalls = 0;

  const fakeGenerate = async () => {
    generatedCalls++
    return {questions: []}
  };

  const controller = createInterviewTopicController(fakeGenerate);

  const req = {
    body: {
      topic: 123
    }
  }

  const res = mockResponse();
  await controller(req, res);

  assert.equal(res.statusCode, 400);
  assert.equal(res.body.error, "Invalid interview topic");
  assert.equal(generatedCalls, 0);
})

test("Controller return successful interview evaluation", async () => {
  let selectedTopic = null;
  let recievedResponses = null;

  const fakeGenerateEvaluation = async (topic, responses) => {
    selectedTopic = topic;
    recievedResponses = responses;

    return {
      score: 85,
      feedback: "Good understanding of the topic"
    }
  };

  const controller = createInterviewEvaluation(fakeGenerateEvaluation);

  const req = {
    body: {
      topic: "frontend",
      responses: [
        {
          question: "What is React?",
          answer: "React is a Javascript library for building user interfaces"
        }
      ]
    }
  }

  const res = mockResponse();
  await controller(req, res);

  assert.equal(res.statusCode, 200);
  assert.equal(selectedTopic, "frontend");
  assert.deepEqual(recievedResponses, req.body.responses);
  assert.deepEqual(res.body, {score: 85, feedback: "Good understanding of the topic"});
})

test("Controller rejects evaluation missing topic", async () => {
  let evaluationCalls = 0;

  const fakeGenerateEvaluation = async () => {
    evaluationCalls++;
    return {}
  };

  const controller = createInterviewEvaluation(fakeGenerateEvaluation);

  const req = {
    body: {
      responses: [
        {
          question: "What is React?",
          answer: "React is a Javascript library for building user interfaces"
        }
      ]
    }
  }

  const res = mockResponse();
  await controller(req, res);

  assert.equal(res.statusCode, 400);
  assert.equal(evaluationCalls, 0);
  assert.equal(res.body.error, "Topic and responses required");
})

test("Controller rejects when there is no response", async () => {
  let evaluationCalls = 0;

  const fakeGenerateEvaluation = async () => {
    evaluationCalls++;
    return {}
  };

  const controller = createInterviewEvaluation(fakeGenerateEvaluation);

  const req = {
    body: {
      topic: "frontend",
      responses: []
    }
  }

  const res = mockResponse();
  await controller(req, res);

  assert.equal(res.statusCode, 400);
  assert.equal(evaluationCalls, 0);
  assert.equal(res.body.error, "Topic and responses required");
})

test("Controller rejects when response is invalid", async () => {
  let evaluationCalls = 0;

  const fakeGenerateEvaluation = async () => {
    evaluationCalls++;
    return {}
  };

  const controller = createInterviewEvaluation(fakeGenerateEvaluation);

  const req = {
    body: {
      topic: "frontend",
      responses: "What I dont knowe anything"
    }
  }

  const res = mockResponse();
  await controller(req, res);

  assert.equal(res.statusCode, 400);
  assert.equal(evaluationCalls, 0);
  assert.equal(res.body.error, "Topic and responses required");
})

test("Controller handles Gemini evaluation faliure", async () => {
  let evaluationCalls = 0;

  const fakeGenerateEvaluation = async () => {
    evaluationCalls++;
    throw new Error("Gemini API unavailable")
  }

  const controller = createInterviewEvaluation(fakeGenerateEvaluation);

  const req = {
    body: {
      topic: "frontend",
      responses: [
        {
          question: "What is React?",
          answer: "React is a Javascript library for building user interfaces"
        }
      ]
    }
  }

  const res = mockResponse();
  await controller(req, res);

  assert.equal(res.statusCode, 500);
  assert.deepEqual(res.body, {error: "Internal server error"});
  assert.equal(evaluationCalls, 1);
})
import { GoogleGenAI } from "@google/genai";
import * as z from "zod";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  console.error("ERROR: GEMINI_API_KEY is not defined in your environment!");
  process.exit(1);
}

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

// THIS IS GETTING THE QUESTIONS FROM GEMINI
const interviewQuestionsJsonSchema = {
  type: "object",
  properties: {
    questions: {
      type: "array",
      description: "Interview questions generated for the selected topic.",
      items: {
        type: "object",
        properties: {
          question: {type: "string", description: "Interview question"}
        },
        required: ["question"]
      }
    }
  },
  required: ["questions"]
};

const interviewQuestionsSchema = z.fromJSONSchema(interviewQuestionsJsonSchema);

export async function generateInterviewQuestions(topic) {
  const response = await ai.interactions.create({
    model: "gemini-3.5-flash-lite",
    input: `Give me three junior interview questions about ${topic}`,
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: interviewQuestionsJsonSchema
    }
  });
  const question = interviewQuestionsSchema.parse(JSON.parse(response.output_text));
  return question;
}

// THIS IS GETTING THE EVALUATION FROM GEMINI
const resultEvaluationJsonSchema = {
  type: "object",
  properties: {
    overall_score: {
      type: "number",
      description: "The overall score of the interview out of 100."
    },
    summary: {
      type: "string",
      description: "The summary of the interview."
    },
    strengths: {
      type: "array",
      description: "List of strengths from the interview.",
      items: {
        type: "string",
        description: "The strength from thew interview."
      }
    },
    improvements: {
      type: "array",
      description: "The list of improvements from the interview.",
      items: {
        type: "string",
        description: "The improvement from the interview."
      }
    },
    question_feedback: {
      type: "array",
      description: "The feedback from each question and answer from the interview.",
      items: {
        type: "object",
        properties: {
          question: {type: "string", description: "The interview question."},
          answer: {type: "string", description: "The interview answer."},
          score: {type: "number", description: "The individual score of the question and answer out of 10."},
          feedback: {type: "string", description: "The feedback from the question and answer."}
        },
        required: ["question", "answer", "score", "feedback"]
      }
    },
    overall_feedback: {
      type: "string",
      description: "Constructive overall feedback for the interview."
    }
  },
  required: ["overall_score", "summary", "strengths", "improvements", "question_feedback", "overall_feedback"]
};

const resultEvaluationSchema = z.fromJSONSchema(resultEvaluationJsonSchema);

export async function generateResultEvaluation(topic, responses) {
  const resultEvaluationPrompt = `
    You are a senior software engineer conducting a technical interview for a junior software developer.

    The interview topic is: ${topic}

    Below are the interview questions and the candidate's answers:

    ${JSON.stringify(responses, null, 2)}

    Evaluate the candidate fairly and objectively.

    Guidelines:
    - Assume the candidate is applying for a junior software developer position.
    - Score the interview out of 100 based on technical knowledge, correctness, clarity, and problem-solving ability.
    - Be constructive and encouraging while remaining honest.
    - Point out both strengths and areas for improvements, maximum 3 lists each.
    - Evaluate each question individually.
    - Give each question a score out of 10.
    - Explain why the score was given.
    - Do not invent information that the candidate did not mention.
    - If an answer is partially correct, explain what was correct and what was missing.
    - If the candidate gives an incorrect answer, explain the correct concept briefly.

    Return only valid JSON that matches the provided response schema.
  `;
  const response = await ai.interactions.create({
    model: "gemini-3.5-flash-lite",
    input: resultEvaluationPrompt,
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: resultEvaluationJsonSchema
    }
  });
  const resultEvaluation = resultEvaluationSchema.parse(JSON.parse(response.output_text));
  return resultEvaluation;
}
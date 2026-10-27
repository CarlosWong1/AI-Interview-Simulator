import { generateInterviewQuestions, generateResultEvaluation } from "../services/ai-service.js";
import { interviewTopics } from "../lib/InterviewTopics.js";

export const createInterviewTopicController = (generateQuestions) => {
  return async (req, res) => {
    try {
      const { topic } = req.body;

      if (!topic) {
        return res.status(400).json({ error: "Topic is required" });
      }

      if (typeof topic !== "string" || !Object.hasOwn(interviewTopics, topic)) {
        return res.status(400).json({ error: "Invalid interview topic" });
      }

      const selectedTopic = interviewTopics[topic];

      const questions = await generateQuestions(selectedTopic);

      return res.status(200).json(questions);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
};

export const getInterviewTopic =
  createInterviewTopicController(generateInterviewQuestions);

export const getInterviewEvaluation = async (req, res) => {
  try {
    const { topic, responses } = req.body;

    if (!topic || !Array.isArray(responses) || responses.length === 0) {
      return res.status(400).json({ error: "Topic and responses required" });
    }

    const result = await generateResultEvaluation(topic, responses);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

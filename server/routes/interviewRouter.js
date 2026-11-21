import { getInterviewTopic, getInterviewEvaluation } from "../controllers/interviewController.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { createRateLimiter } from "../middleware/rateLimiter.js";
import express from "express"

export const createInterviewRouter = (authMiddleware, rateLimiter, startController, evaluateController) => {
  const router = express.Router();
  router.post("/start", authMiddleware, rateLimiter, startController);
  router.post("/evaluate", authMiddleware, rateLimiter, evaluateController);
  return router;
}

const interviewLimiter = createRateLimiter(10, 15 * 60 * 1000);
const router = createInterviewRouter(requireAuth, interviewLimiter, getInterviewTopic, getInterviewEvaluation);
export default router;
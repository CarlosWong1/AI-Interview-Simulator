import { getInterviewTopic, getInterviewEvaluation } from "../controllers/interviewController.js";
import express from "express"

const router = express.Router();

router.post("/start", getInterviewTopic);
router.post("/evaluate", getInterviewEvaluation)

export default router;
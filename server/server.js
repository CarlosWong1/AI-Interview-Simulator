import dotenv from "dotenv";
import interviewRouter from "./routes/interviewRouter.js";
import express from "express";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors())
app.use(express.json());

app.use("/api/interview", interviewRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`)
})
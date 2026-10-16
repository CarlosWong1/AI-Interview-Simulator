import dotenv from "dotenv";
import interviewRouter from "./routes/interviewRouter.js";
import accountRouter from "./routes/accountRoutes.js";
import express from "express";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://carloswong1.github.io"
  ]
}));
app.use(express.json());

app.use("/api/interview", interviewRouter)
app.use("/api/account", accountRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`)
})
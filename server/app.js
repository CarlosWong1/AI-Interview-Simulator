import interviewRouter from "./routes/interviewRouter.js";
import accountRouter from "./routes/accountRoutes.js";
import express from "express";
import cors from "cors";

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

app.get("/api/health", (req, res) => {
  res.status(200).json({status: "ok"});
})

export default app;
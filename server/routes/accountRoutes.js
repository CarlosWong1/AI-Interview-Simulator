import express from "express";
import { deleteAccount } from "../controllers/accountController.js";

const router = express.Router();

router.post("/delete-account", deleteAccount);

export default router;
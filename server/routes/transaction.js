import express from "express";
import { transactions } from "../controller/transaction.js";

const router = express.Router();

router.get("/transactions",transactions);

export default router;
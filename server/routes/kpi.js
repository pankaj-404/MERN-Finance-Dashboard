import express from "express";
import { kpis } from "../controller/kpi.js";

const router = express.Router();

router.get("/kpis", kpis);

export default router;

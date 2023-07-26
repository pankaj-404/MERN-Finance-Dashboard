import express from "express";
import { products } from "../controller/product.js";

const router = express.Router();

router.get("/products", products);

export default router;
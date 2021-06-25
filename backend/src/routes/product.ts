import express from "express";
const router = express.Router();
import {
  createProduct,
  createCategory,
} from "../controllers/productController";
import { authenticateToken } from "../middleware/authentication";

router.post("/createproduct", authenticateToken, createCategory, createProduct);

export default router;

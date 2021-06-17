import express from "express";
const router = express.Router();
import { addUser } from "../controllers/userController";

router.post("/signup", addUser);

module.exports = router;

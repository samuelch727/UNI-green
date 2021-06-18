import express from "express";
const router = express.Router();
import {
  addSubUser,
  addUser,
  loginUser,
  sendUserData,
} from "../controllers/userController";
import { authenticateToken, generateToken } from "../middleware/authentication";

router.post("/signup", addUser, generateToken, sendUserData);
router.get("/login", loginUser, generateToken, sendUserData);
router.post("/create-sub-user", authenticateToken, addSubUser);

module.exports = router;

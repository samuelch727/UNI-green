import express from "express";
const router = express.Router();
import {
  addSubUser,
  addUser,
  loginUser,
  sendUserData,
} from "../controllers/userController";
import { authenticateToken, generateToken } from "../middleware/authentication";

router.post("/signup", addUser);
router.post("/login", loginUser, generateToken, sendUserData);
router.post("/create-sub-user", authenticateToken, addSubUser);

module.exports = router;

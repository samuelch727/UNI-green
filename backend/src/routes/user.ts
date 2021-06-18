import express from "express";
const router = express.Router();
import {
  addSubUser,
  addUser,
  loginUser,
  sendUserData,
} from "../controllers/userController";
import { authenticateToken } from "../middleware/authentication";

router.post("/signup", addUser);
router.post("/login", loginUser, sendUserData);
router.post("/create-sub-user", authenticateToken, addSubUser);

module.exports = router;

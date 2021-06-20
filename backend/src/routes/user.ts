import express from "express";
const router = express.Router();
import {
  addSubUser,
  addUser,
  loginUser,
  sendUserData,
  updatePassword,
  updateSubuserList,
} from "../controllers/userController";
import { authenticateToken, generateToken } from "../middleware/authentication";

router.post("/signup", addUser, generateToken, sendUserData);
router.get("/login", loginUser, generateToken, sendUserData);
router.post(
  "/create-sub-user",
  authenticateToken,
  addSubUser,
  updateSubuserList
);
router.post(
  "/changepassword",
  authenticateToken,
  loginUser,
  generateToken,
  updatePassword
);

module.exports = router;

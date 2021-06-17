import express from "express";
const router = express.Router();
import {
  addUser,
  loginUser,
  sendUserData,
} from "../controllers/userController";

router.post("/signup", addUser);
router.post("/login", loginUser, sendUserData);

module.exports = router;

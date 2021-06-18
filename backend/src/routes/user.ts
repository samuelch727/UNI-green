import express from "express";
const router = express.Router();
import {
  addSubUser,
  addUser,
  loginUser,
  sendUserData,
} from "../controllers/userController";

router.post("/signup", addUser);
router.post("/login", loginUser, sendUserData);
router.post("/create-sub-user", addSubUser);

module.exports = router;

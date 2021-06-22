import express from "express";
const router = express.Router();
import {
  addSubUser,
  addUser,
  getSubuserData,
  loginUser,
  sendUserData,
  updatePassword,
  updateSubuserList,
} from "../controllers/userController";
import { authenticateToken, generateToken } from "../middleware/authentication";

router.post("/signup", addUser, generateToken, sendUserData);
router.get("/login", loginUser, generateToken, getSubuserData, sendUserData);
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
router.get("/getsubusers", authenticateToken, getSubuserData, sendUserData);

/*
return json: 
{
  user: {
    userid: id,
    username: name,
  }
}
*/

module.exports = router;

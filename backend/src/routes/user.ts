import express from "express";
const router = express.Router();
import {
  addSubUser,
  addUser,
  deleteUser,
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
  "/createsubuser",
  authenticateToken,
  addSubUser,
  updateSubuserList,
  generateToken,
  getSubuserData,
  sendUserData
);
router.post(
  "/changepassword",
  authenticateToken,
  loginUser,
  updatePassword,
  generateToken,
  getSubuserData,
  sendUserData
);
router.get("/getsubusers", authenticateToken, getSubuserData, sendUserData);
router.put("/deleteuser", authenticateToken, loginUser, deleteUser);

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

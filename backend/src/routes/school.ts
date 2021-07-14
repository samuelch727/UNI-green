import express from "express";
const router = express.Router();
import {
  addSchool,
  sendSchoolData,
  updateSchoolData,
  deleteSchool,
} from "../controllers/schoolController";
import { authenticateToken, generateToken } from "../middleware/authentication";
import {
  checkUserAdmin,
  checkUserAdminOrSchoolAdmin,
} from "../middleware/userPermission";

// router.post("/signup", authenticateToken, addSchool, sendSchoolData);
router.post(
  "/signup",
  authenticateToken,
  checkUserAdmin,
  addSchool,
  sendSchoolData
);
// router.put("/update-school-info", authenticateToken, updateSchoolData, sendSchoolData);
router.put(
  "/update-school-info",
  authenticateToken,
  checkUserAdminOrSchoolAdmin,
  updateSchoolData,
  sendSchoolData
);
router.put("/delete-school", authenticateToken, checkUserAdmin, deleteSchool);

module.exports = router;

// post: create; put: update; get: read

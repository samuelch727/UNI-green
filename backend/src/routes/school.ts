import express from "express";
const router = express.Router();
import {
  addSchool,
  sendSchoolData,
  updateSchoolData,
  deleteSchool,
} from "../controllers/schoolController";
import { authenticateToken, generateToken } from "../middleware/authentication";

// router.post("/signup", authenticateToken, addSchool, sendSchoolData);
router.post("/signup", addSchool, sendSchoolData);
// router.put("/update-school-info", authenticateToken, updateSchoolData, sendSchoolData);
router.put("/update-school-info", updateSchoolData, sendSchoolData);
router.put("/delect-school", deleteSchool);

module.exports = router;

// post: create; put: update; get: read

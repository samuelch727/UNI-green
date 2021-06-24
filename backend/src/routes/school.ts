import express from "express";
const router = express.Router();
import { addSchool, updateSchoolData } from "../controllers/schoolController";
import { authenticateToken, generateToken } from "../middleware/authentication";

router.post("/signup", authenticateToken, addSchool);
router.put("/update-school-info", authenticateToken, updateSchoolData);

module.exports = router;

// post: create; put: update; get: read

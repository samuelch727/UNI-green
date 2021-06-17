import express from "express";
const router = express.Router();
import { addUser } from "../controllers/userController";

router.post("/signup", (req, res) => {
  console.log("recieved");
  addUser(req, res);
});

router.get("/", (req, res) => {
  res.send("Test");
});

module.exports = router;

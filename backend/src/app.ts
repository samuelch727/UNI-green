import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/.env" });
const app = express();
app.use(bodyParser.json());

mongoose.connect(
  process.env.DB_CONNECTION ?? "",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Database connected")
);

const usersRouter = require("./routes/user");
app.use("/api/user/", usersRouter);

app.get("/", (req, res) => {
  res.send("Test");
});

app.listen(5000, () => {
  console.log("Server running");
});

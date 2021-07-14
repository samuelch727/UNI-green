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
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const usersRouter = require("./routes/user");
import productRouter from "./routes/product";
app.use("/api/user/", usersRouter);
app.use("/api/product/", productRouter);
const schoolsRouter = require("./routes/school");
app.use("/api/school/", schoolsRouter);
//For front end -- Require user(school)'s input: name, description, iconUrl, address, tel

app.listen(5000, () => {
  console.log("Server running");
});

export default app;

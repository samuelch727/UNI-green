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

require("./models/Category");
require("./models/Order");
require("./models/Product");
require("./models/Request");
require("./models/School");
require("./models/SubUser");
require("./models/SubOrder");

const usersRouter = require("./routes/user");
app.use("/api/user/", usersRouter);
const schoolsRouter = require("./routes/school");
app.use("/api/school/", schoolsRouter);
//For front end -- Require user(school)'s input: name, description, iconUrl, address, tel
const ordersRouter = require("./routes/order");
app.use("/api/order/", ordersRouter);

app.listen(5000, () => {
  console.log("Server running");
});

export default app;

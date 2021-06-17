import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send({
    res: "hello",
  });
});

app.listen(5000, () => {
  console.log("server running");
});

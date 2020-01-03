const express = require("express");

const port = process.env.PORT || 3002;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", require("./routes/index"));

app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  err.customMessage = "Not Found";

  next(err);
});

app.listen(port, () => {
  console.log(`app is running on ${port}`);
});

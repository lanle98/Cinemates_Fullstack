const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("root");
  res.send("root");
});

module.exports = router;

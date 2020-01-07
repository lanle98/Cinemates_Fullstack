const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

router.get("/", (req, res) => {
  console.log(req.query.input);
  let api = "https://api.themoviedb.org/3",
    find = "/search/movie",
    pageNumber = `?`,
    api_key = `api_key=8b3aa7357a1283c0b7821398836c387f&query=${req.query.input}&page=${req.query.page}`,
    url = api + find + pageNumber + api_key;
  console.log("search " + url);
  fetch(url)
    .then(res => res.json())
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));
});

router.post("/", (req, res) => {
  res.redirect("/search?input=" + req.body.input);
});

module.exports = router;

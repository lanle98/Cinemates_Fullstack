const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

router.get("/discover", (req, res) => {
  let api = "https://api.themoviedb.org/3",
    find = "/discover/movie",
    pageNumber = `?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&`,
    api_key = "api_key=8b3aa7357a1283c0b7821398836c387f",
    url = api + find + pageNumber + api_key;
  console.log(url);

  fetch(url)
    .then(res => res.json())
    .then(data => {
      res.json(data);
    });
});

router.get("/search", (req, res) => {
  let input = req.query.input;
  let api = "https://api.themoviedb.org/3",
    find = "/search/movie",
    pageNumber = `?`,
    api_key = `api_key=8b3aa7357a1283c0b7821398836c387f&query=${input}`,
    url = api + find + pageNumber + api_key;
  console.log("search " + url);

  fetch(url)
    .then(res => res.json())
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));
});

module.exports = router;

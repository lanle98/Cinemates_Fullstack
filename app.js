const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3002;
const app = express();
const fetch = require("node-fetch");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/discover", (req, res) => {
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

app.use("/categories", require("./routes/categories"));
app.use("/search", require("./routes/search"));

app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  err.customMessage = "Not Found";

  next(err);
});

app.listen(port, () => {
  console.log(`app is running on ${port}`);
});

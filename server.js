require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
// var axios = require("axios");
// var cheerio = require("cheerio");
var mongoose = require("mongoose");
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3101;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

require("./routes/htmlRoutes")(app);

mongoose.connect("mongodb://localhost/newsScraper", { useNewUrlParser: true });

app.listen(PORT, function() {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});
// });

module.exports = app;

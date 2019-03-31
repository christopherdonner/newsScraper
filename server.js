// require("dotenv").config();
// var express = require("express");
// // var logger = require("morgan");
// var mongoose = require("mongoose");
// var exphbs = require("express-handlebars");
// // Our scraping tools
// // Axios is a promised-based http library, similar to jQuery's Ajax method
// // It works on the client and on the server
// var axios = require("axios");
// var cheerio = require("cheerio");

// // Require all models
// var db = require("./models");
// require("./routes/htmlRoutes")(app);

// var PORT = process.env.PORT || 3101;

// // Initialize Express
// var app = express();
// var mongoose = mongoose();
// // Configure middleware

// // Use morgan logger for logging requests
// // app.use(logger("dev"));
// // Parse request body as JSON
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// // Make public a static folder
// app.use(express.static("public"));

// // Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/newsScraper", { useNewUrlParser: true });

// // Handlebars
// app.engine(
//   "handlebars",
//   exphbs({
//     defaultLayout: "main"
//   })
// );
// app.set("view engine", "handlebars");
// // Start the server
// app.listen(PORT, function() {
//     console.log("App running on port " + PORT + "!");
//   });

// module.exports = app;


require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3101;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
// require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// // Connect to the Mongo DB
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

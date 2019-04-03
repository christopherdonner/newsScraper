var axios = require("axios");
var cheerio = require("cheerio");

var db = require("../models");

module.exports = function (app) {

  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/scrape", function (req, res) {
    axios.get("https://www.nytimes.com/section/world").then(function (response) {
      var $ = cheerio.load(response.data);

      $("article h2").each(function (i, element) {
        var result = {};

        result.title = $(element).text();
        //   result.title = $(this)
        //     .children("span")
        //     .text();
        result.link = $(this)
          .children("a")
          .attr("href");

        db.Article.create(result)
          .then(function (dbArticle) {
            console.log(dbArticle);
          })
          .catch(function (err) {
            console.log(err);
          });
      });

      res.send("Scrape Complete");
    });
  });

  app.get("/articles", function (req, res) {
    db.Article.find({})
      .then(function (dbArticle) {
        res.json(dbArticle);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.get("/articles/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })
      .populate("note")
      .then(function (dbArticle) {
        res.json(dbArticle);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.post("/articles/:id", function (req, res) {
    db.Note.create(req.body)
      .then(function (dbNote) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
      })
      .then(function (dbArticle) {
        res.json(dbArticle);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.post("/articles/", function (req, res) {
    console.log("clear")
    db.Article.deleteMany();
  })

  app.post("/saved/", function (req, res){
    console.log("article saved")
    db.Article.findOneAndUpdate({ _id: req.params.id })
  })
}

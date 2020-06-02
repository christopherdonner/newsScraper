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

      $("li article").each(function (i, element) {
        var result = {};
        console.log(this)
        // console.log(element)
        result.title = $(element).text();
        console.log(result.title)
        //   result.title = $(this)   
        //     .children("span")
        //     .text();
        result.link = $(element).children("a").attr("href");
        
          result.image=$(this).children("figure")
          console.log("IMAGE!")
          console.log(result.image)

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
    db.Article.deleteMany({ }).then(function (results){
      console.log(results)
    });
  })

  app.put("/articles/:id", function (req, res){
    console.log(req.params)
    db.Article.findOneAndUpdate({ _id: req.params.id }, {saved: true})
  })
  
  app.get("/saved/", function(req, res){
    console.log("/saved/");
    db.Article.find({saved: true}).then(function (dbArticle){res.json(dbArticle) })
  })
  
}
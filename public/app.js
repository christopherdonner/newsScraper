$.getJSON("/articles", function (data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append(`<p data-id=${data[i]._id}>${data[i].title}<br /><a href="https://www.nytimes.com${data[i].link}"> https://www.nytimes.com${data[i].link} </a></p>`);
    $("#articles").append(`<button class="btn btn-primary saveArticle">Save</button>`)
  }
});

$(document).on("click", "p", function () {
  $("#notes").empty();
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .then(function (data) {
      console.log(data);
      $("#notes").append(`<h2>${data.title}</h2>`);
      $("#notes").append("<input id='titleinput' name='title' >");
      $("#notes").append("<br><br>")
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea><br>");
      $("#notes").append(`<button class="btn btn-primary" data-id=${data._id} id='savenote'>Save Note</button>`);

      if (data.note) {
        $("#titleinput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
      }
    });
});

$(document).on("click", "#savenote", function () {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  })
    .then(function (data) {
      console.log(data);
      $("#notes").empty();
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});

$(".scrape-new").on("click", function () {
  console.log("/scrape")
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
  .then(function (){
    console.log("scrape complete")
    location.reload();
  })
})

$(".clear").on("click", function () {
  console.log("delete")
  $.ajax({
    method: "POST",
    url: "/articles",
  })
  .then(function (){
    console.log("articles cleared")
    location.reload();
  })
})

$(".saveArticle").on("click", function (){
  console.log("saveArticle")
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "PUT",
    url: "/articles/" + thisId
  }).then(function(){
    return 
  })
})
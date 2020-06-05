var dataID = 0

function saveArticle(dataID) {
  console.log("saveArticle")
  console.log(dataID)
  $.ajax({
    method: "PUT",
    url: "/articles/" + dataID
  }).then(function () {
    console.log(`saved ${dataID}`)
    return
  })
}

function drawArticles() {

};

function drawModal() {

}

$.getJSON("/articles", function (data) {
  console.log(data)
  for (var i = 0; i < data.length; i++) {
    dataID = data[i]._id
    $(".articles").append(
      `<img data-id=${data[i]._id} src="${data[i].image}" alt="Card image cap" title="${data[i].title}" width="200" height="200">
`)
  }

});



$(document).on("click", "img", function (e) {
  $("#notes").empty();
  console.log(e)
  let X = e.clientX
  let Y = e.clientY
  console.log($(this).attr("data-id"))
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .then(data => {
      console.log(data);
      $(".modal").css("display", "inline")
      $(".modal").css("top", Y).css("left", X)
      $("#notesTitle").html(`<row><div class='col-1 offset-11' id='close'><button type="button" class="close">X</button></div></row><row><h4>${data.title}</h4></row>`);
      $(".close").on("click", () => { $('.modal').css("display", "none") })
      $("#notesBody").html(`<br><p>${data.blurb}</p><br>`)
      $("#notesBody").append("<input id='titleinput' name='title' ><br><br>");
      $("#notesBody").append("<textarea id='bodyinput' name='body'></textarea><br>");
      $("#notesBody").append(`<button class="btn btn-primary" data-id="${data._id}" id='savenote'>Save Note</button> `);
      $("#notesBody").append(`<a href="https://www.nytimes.com${data.link}"><button class="btn btn-primary" data-id="${data._id}" id='savenote'>Open</button> `);
      $("#notesBody").append(`<button class="btn btn-primary saveArticle" data-id="${data._id}">Save Article</button> `);
      $(".saveArticle").on("click", () => { saveArticle(data._id) })

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
      $(".modal").css("display", "none")
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
    .then(function () {
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
    .then(function () {
      console.log("articles cleared")
      location.reload();
    })
})
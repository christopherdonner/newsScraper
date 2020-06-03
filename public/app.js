var dataID=0

function drawArticles(){

};

function drawModal(){
  
}

$.getJSON("/articles", function (data) {
  console.log(data)
  for (var i = 0; i < data.length; i++) {
    dataID=data[i]._id
    $(".articles").append(`<<p data-id=${data[i]._id}>${data[i].title}><br><img src="${data[i].image}" width=320, heigh=240><br /><a href="https://www.nytimes.com${data[i].link}"></a></p>`);
    $(".saveArticle").on("click", function(){
      saveArticle(dataID)
      // event.stopPropagation();
      event.preventDefault();
    })
  }
});



$(document).on("click", "p", function (e) {
  $("#notes").empty();
  console.log(e)
 let X = e.clientX
 let Y = e.clientY
//  let 
  console.log($(this).attr("data-id"))
  var thisId = $(this).attr("data-id");


  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .then(function (data) {
      console.log(data);
      $(".modal").css("display", "inline")
      $(".modal").css("top", Y).css("left", X)
      // $(".modal").html(`<div class='col-1 offset-11' id='close'>X</div>`)
      $("#notesTitle").html(`<row><div class='col-1 offset-11' id='close'>X</div></row><row><h3>${data.title}</h3></row>`);
      $("#notesBody").html("<input id='titleinput' name='title' >");
      $("#notesBody").append("<br><br>")
      $("#notesBody").append("<textarea id='bodyinput' name='body'></textarea><br>");
      $("#notesBody").append(`<button class="btn btn-primary" data-id="${data._id}" id='savenote'>Save Note</button>`);
      $("#notesBody").append(`<a href="https://www.nytimes.com${data.link}"><button class="btn btn-primary" data-id="${data._id}" id='savenote'>Open</button>`);
      
      $(".saveArticle").on("click", function(e){
        saveArticle(dataID)
        
        event.stopPropagation(e);
        event.preventDefault(e);
      })

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
      // $("#notes").empty();
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

// $(".saveArticle").on("click", function(){
//   console.log(saveArticle)
//   saveArticle(dataID)
//   // event.stopPropagation();
//   // event.preventDefault();
// })

function saveArticle(dataID){
  console.log("saveArticle")
  console.log(dataID)
  $.ajax({
    method: "PUT",
    url: "/articles/" + dataID
  }).then(function(){
    console.log(`saved ${dataID}`)
    return 
  })
}
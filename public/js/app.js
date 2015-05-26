document.addEventListener("DOMContentLoaded", function(event) { 

(function(){

  document.querySelector('form').addEventListener('submit', function(event){
    event.preventDefault();
    document.querySelector(".search").innerHTML= "";
    document.querySelector(".movie").innerHTML= "";
    var input = document.querySelector('input').value;
    var movieSearch = new XMLHttpRequest();
    movieSearch.open('get', 'http://omdbapi.com/?s=' + encodeURIComponent(input), true);
    movieSearch.addEventListener('load', function(response){
      var res =  JSON.parse(this.response).Search;
      for(var i = 0; i < res.length; i++){
        var node = document.createElement('li');
        node.innerText = res[i].Title;
        document.querySelector('.search').appendChild(node);
// start of movie details addition
        node.addEventListener('click', function(){
          document.querySelector(".movie").innerHTML = "";
          var details = new XMLHttpRequest();
          details.open('get', 'http://omdbapi.com/?t=' + this.innerHTML, true);
          details.addEventListener('load', function(response){
          var responses = ["Title", "Year", "Rated", "Genre", "Plot"];
            for(var j = 0; j < responses.length; j++){
              var newElement = document.createElement('li');
              newElement.id = responses[j];
              newElement.innerText = JSON.parse(this.response)[responses[j]];
              document.querySelector('.movie').appendChild(newElement);
            }
          });
          details.send();
        });  
// end of movie details
      }
  });
    movieSearch.send();
  });
})();
});
























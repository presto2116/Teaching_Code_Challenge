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
              moviePoster = document.createElement( "img" );
              moviePoster.src = JSON.parse(this.response).Poster;
              document.querySelector( '.movie' ).appendChild( moviePoster );
              console.log(moviePoster);

              favorited = document.createElement("a");
              favorited.href = '/';
              favorited.innerText = "Add to Favorites";
              document.querySelector('.movie').appendChild(favorited);
              favorited.addEventListener("click", postToFavorites);
            
          });
          details.send();
        });  
// end of movie details
      }
  });
    movieSearch.send();
  });

function postToFavorites(){
    var addToFavorites = new XMLHttpRequest();
    addToFavorites.open( "post", "/favorites" );
    addToFavorites.setRequestHeader('Content-Type', 'application/json');
    var favorite_movie = {
      title: Title.innerText,
      year: Year.innerText,
      rated: Rated.innerText,
      genre: Genre.innerText,
      plot: Plot.innerText,
      poster: moviePoster.src
    };
    console.log(favorite_movie);
addToFavorites.send( JSON.stringify( favorite_movie));
  }
})();
});

// Document.ready equivalent for no Jquery
document.addEventListener("DOMContentLoaded", function(event) { 

  (function(){

    document.querySelector('form').addEventListener('submit', function(event){
      event.preventDefault();
      // clears old searches
      document.querySelector(".search").innerHTML= "";
      document.querySelector(".movie").innerHTML= "";
      var input = document.querySelector('input').value;
      var movieSearch = new XMLHttpRequest();
      movieSearch.open('get', 'http://omdbapi.com/?s=' + encodeURIComponent(input), true);
      movieSearch.addEventListener('load', function(response){
        var res =  JSON.parse(this.response).Search;
        // loops through each movie response
        for(var i = 0; i < res.length; i++){
          var node = document.createElement('li');
          node.innerText = res[i].Title;
          document.querySelector('.search').appendChild(node);
          // add click listener on each title
          node.addEventListener('click', function(){
            // clears movie list
            document.querySelector(".search").innerHTML = "";
            var details = new XMLHttpRequest();
            details.open('get', 'http://omdbapi.com/?t=' + this.innerHTML, true);
            details.addEventListener('load', function(response){
              var responses = ["Title", "Year", "Rated", "Genre", "Plot"];
              // loops through the movie to get all the details
              for(var j = 0; j < responses.length; j++){
                var newElement = document.createElement('p');
                newElement.id = responses[j];
                newElement.innerText = JSON.parse(this.response)[responses[j]];
                // appends all the details to .movie
                document.querySelector('.movie').appendChild(newElement);
              }
              // get movie poster(outside of loop because it uses different syntax)
              moviePoster = document.createElement( "img" );
              moviePoster.src = JSON.parse(this.response).Poster;
              document.querySelector( '.movie' ).appendChild( moviePoster );
              console.log(moviePoster);
              // create add to favorites link
              addToFavorites = document.createElement("a");
              addToFavorites.classList.add("add-favorite");
              addToFavorites.href = '/';
              addToFavorites.innerText = "Add to Favorites";
              document.querySelector('.movie').appendChild(addToFavorites);
              addToFavorites.addEventListener("click", postToFavorites);
            });
    details.send();
    });  
    }
    });
    movieSearch.send();
    });
// function for posting json to data.json
function postToFavorites(){
  var favoritesPost = new XMLHttpRequest();
  favoritesPost.open( "post", "/favorites" );
  favoritesPost.setRequestHeader('Content-Type', 'application/json');
    var favorited_movie = {
      title: Title.innerText,
      year: Year.innerText,
      rated: Rated.innerText,
      genre: Genre.innerText,
      plot: Plot.innerText,
      poster: moviePoster.src
    };

  favoritesPost.send( JSON.stringify( favorited_movie));
}
})();
});

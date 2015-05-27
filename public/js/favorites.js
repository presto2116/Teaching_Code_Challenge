document.addEventListener("DOMContentLoaded", function(event) { 

(function(){
  var getFavorites = new XMLHttpRequest();
  getFavorites.open('get', '/favorites', true);
  getFavorites.setRequestHeader('Content-Type', 'application/json');

  // Render user's favorite movies on page upon successful AJAX call
  getFavorites.addEventListener('load', function(response){
    var res =  JSON.parse(this.response);
    for ( var i=0; i < res.length; i++ ){

      // Create container for each movie
      var favMovies = document.createElement( "div" );
      document.getElementById( "fav-movies-container" ).appendChild( favMovies );

    var title = document.createElement( 'h3' );
    title.classList.add("title");
    title.innerHTML = res[i].favTitle;
    favMovies.appendChild( title );

    var poster = document.createElement( 'img' );
    poster.classList.add("fav-poster");
    poster.src = res[i].favPoster;
    favMovies.appendChild( poster );

    var year = document.createElement( 'p' );
    year.classList.add("fav-movie");
    year.innerHTML = "Year: " + res[i].favYear;
    favMovies.appendChild( year );

    var rated = document.createElement( 'p' );
    rated.classList.add("fav-movie");
    rated.innerHTML = "Rated: " + res[i].favRated;
    favMovies.appendChild( rated );

    var plot = document.createElement( 'p' );
    plot.classList.add("fav-movie");
    plot.innerHTML = "Plot: " + res[i].favPlot;
    favMovies.appendChild( plot );
    }
  });
  getFavorites.send();
})();
});

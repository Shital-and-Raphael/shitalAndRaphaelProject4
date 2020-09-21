// creating our app object
const moviesApp = {};

moviesApp.getMovies = function (query) {
  $.ajax({
    url: "https://api.themoviedb.org/3/search/movie",
    method: "GET",
    dataType: "json",
    data: {
      api_key: "4f9560632152b0224a1ed3e7562039b6",
      query: query,
    },
  }).then((res) => {
    $("#results").empty();
    res.results.forEach((movie) => {
      $.ajax({
        url: `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
        method: "GET",
        dataType: "JSON",
        data: {
          api_key: "4f9560632152b0224a1ed3e7562039b6",
        },
      }).then((trailers) => {
        moviesApp.addMovieDisplay(movie, trailers);
      });
    });
  });
};

// •	Users should be able to type out the movies name. 
moviesApp.userInput = function () {
// •	Use jquery .on(‘submit’) to listen for search form submit.
  $("form").on("submit", function (event) {
    $(".welcomeImageContainer").hide();
    event.preventDefault();
    // •	Use search value, from $(this).val(), to make API call to TMDB with query = search value.
    const userSearch = $("input").val();
    moviesApp.getMovies(userSearch);
    $("#input").val("");
  });
};

// •	Set response cards into results section.
moviesApp.addMovieDisplay = function (movie, trailers) {
  let videoHtml = "";
  trailers.results.forEach((trailer) => {
    videoHtml += `<li><a href="https://www.youtube.com/watch?v=${trailer.key}" target="_blank" rel="noopener noreferrer">${trailer.name}</a></li>`;
    trailerKey = `${trailer.key}`;
  });

// •	Use response from API call to create movie information cards using jquery and html. The response will contain a “results” field that is an array with 0 or more objects.  
if (trailers.results.length !== 0) {
// •	For each movie result in the “results” field:
// o	Append poster path to TMDB image url: 
// o	Use image url as image for card.
// o	Add rating as number out of 10.
// o	Add movie title 
// o	Add synopsis.
// o	Add release date.

    $("#results").append(`
    <div class="movieContainer">
      <div class="imageContainer">
        <img src='http://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}' alt="${movie.title}"></div>
      <div class='info'>
        <h2>${movie.title}</h2>
        <div class= dateAndRatings>
          <p class='releaseDate'><span>Release Date:</span> ${movie.release_date}</p>
          <p><span>Ratings:</span> ${movie.vote_average}</p>
        </div>
        <p class='overview'>${movie.overview}</p>
        
        <ul>${videoHtml}</ul>
        </ul>  
        <div class="trailerContainer">
          <iframe class="trailer" src="https://www.youtube.com/embed/${trailerKey}" frameborder="1px" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    </div>
    `);
  } else {
    $("#results").append(`
    <div class="movieContainer">
      <div class="imageContainer">
        <img src='http://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}' alt="${movie.title}"></div>
      <div class='info'>
        <h2>${movie.title}</h2>
        <div class= dateAndRatings>
          <p class='releaseDate'><span>Release Date:</span> ${movie.release_date}</p>
          <p><span>Ratings:</span> ${movie.vote_average}</p>
        </div>
        <p class='overview'>${movie.overview}</p>
        
        
      </div>
    </div>
    `);
  }
};

moviesApp.init = function () {
  moviesApp.userInput();
};

// document ready
$(function () {
  moviesApp.init();
});

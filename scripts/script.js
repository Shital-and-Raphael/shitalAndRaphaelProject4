console.log("ready to code !");

// creating our app object
const moviesApp = {};

// create a function that gets monkey artwork from Rijks museum
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
    // console.log(res.results);
    $("#results").empty();
    moviesApp.displayMovies(res.results);
  });
};

moviesApp.userInput = function () {
  $("form").on("submit", function (event) {
    $(".welcome-image-container").hide();
    // console.log(" Lets's submit!");
    event.preventDefault();
    const userSearch = $("input").val();
    // console.log(userSearch);
    moviesApp.getMovies(userSearch);
  });
};

moviesApp.displayMovies = function (movie) {
  movie.forEach((piece) => {
    console.log(piece);
    // const title = $("<h2>").text(piece.title);
    // const overview = $("<p>").text(piece.overview);
    // const image = $("<img>").attr({
    //   src: `http://image.tmdb.org/t/p/w300_and_h450_bestv2/${piece.poster_path}`,
    //   alt: piece.title,
    // });
    // $("#results").append(
    //   `<div class="test"><img src='http://image.tmdb.org/t/p/w300_and_h450_bestv2/${piece.poster_path}' alt=""></div>`
    // );
    $("#results").append(`
    <div class="movie-container">
      <div class="image-container">
        <img src='http://image.tmdb.org/t/p/w300_and_h450_bestv2/${piece.poster_path}' alt=""></div>
      <div class='info'>
        <h2>${piece.title}</h2>
        <p class='release-date'>Release date: ${piece.release_date}</p>
        <p class='overview'>${piece.overview}</p>
        <p>Popularity: ${piece.popularity}</p>
      <div>
    </div>
    `);
  });
};

moviesApp.init = function () {
  moviesApp.userInput();
};

// document ready
$(function () {
  moviesApp.init();
});

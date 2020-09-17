
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

moviesApp.addMovieDisplay = function (movie, trailers) {
  console.log(movie);
  console.log(trailers);
  let videoHtml = "";
  trailers.results.forEach((trailer) => {
      //https://www.freecodecamp.org/news/how-to-use-html-to-open-link-in-new-tab/
    videoHtml += `<a href="https://www.youtube.com/watch?v=${trailer.key}" target="_blank" rel="noopener noreferrer">${trailer.name}</a>`;
  });

  $("#results").append(`
    <div class="movie-container">
      <div class="image-container">
        <img src='http://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}' alt=""></div>
      <div class='info'>
        <h2>${movie.title}</h2>
        <p class='release-date'>Release date: ${movie.release_date}</p>
        <p>Ratings: ${movie.vote_average}</p>
        <p class='overview'>${movie.overview}</p>
        <p>${videoHtml}</p>
      <div>
    </div>
    `);
};

// moviesApp.displayMovies = function (movie) {
//   movie.forEach((piece) => {
//     console.log(piece);
//     // const title = $("<h2>").text(piece.title);
//     // const overview = $("<p>").text(piece.overview);
//     // const image = $("<img>").attr({
//     //   src: `http://image.tmdb.org/t/p/w300_and_h450_bestv2/${piece.poster_path}`,
//     //   alt: piece.title,
//     // });
//     // $("#results").append(
//     //   `<div class="test"><img src='http://image.tmdb.org/t/p/w300_and_h450_bestv2/${piece.poster_path}' alt=""></div>`
//     // );
//     $("#results").append(`
//     <div class="movie-container">
//       <div class="image-container">
//         <img src='http://image.tmdb.org/t/p/w300_and_h450_bestv2/${piece.poster_path}' alt=""></div>
//       <div class='info'>
//         <h2>${piece.title}</h2>
//         <p class='release-date'>Release date: ${piece.release_date}</p>
//         <p>Ratings: ${piece.vote_average}</p>
//         <p class='overview'>${piece.overview}</p>
//       <div>
//     </div>
//     `);
//   });
// };

moviesApp.init = function () {
  moviesApp.userInput();
};

// document ready
$(function () {
  moviesApp.init();
});

console.log("ready to code !");

// creating our app object
const moviesApp = {};



// create a function that gets monkey artwork from Rijks museum
moviesApp.getMovies = function () {
  $.ajax({
    url: "https://api.themoviedb.org/3/search/movie",
    method: "GET",
    dataType: "json",
    data: {
      api_key: '4f9560632152b0224a1ed3e7562039b6',
      query: "spiderman",
    },
  }).then((res) => {
    console.log(res);
  });
};


moviesApp.init = function (){
    moviesApp.getMovies();
};


// document ready
$(function () {
    moviesApp.init();
  });
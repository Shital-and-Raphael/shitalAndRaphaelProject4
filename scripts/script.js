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
      api_key: '4f9560632152b0224a1ed3e7562039b6',
      query: query,
    },
  }).then((res) => {
    console.log(res);
  });
};

moviesApp.userInput = function() {
$('form').on('submit', function(event) {
    // console.log(" Lets's submit!");
    event.preventDefault();
    const userSearch = $('input').val();
    console.log(userSearch);
    // moviesApp.getMovies(userSearch);
})
}
moviesApp.init = function (){
    moviesApp.getMovies();
    moviesApp.userInput();
};


// document ready
$(function () {
    moviesApp.init();
  });
const search = document.querySelector('#searchForm');
search.addEventListener('submit', getMovies);

function getMovies(e) {

    e.preventDefault();
    //get user input
    let searchInput = document.querySelector('#searchTxt').value;

    //fetch data from the Api 
    axios.get('https://www.omdbapi.com/?s=' + searchInput + '&apikey=d5d3093e')
        .then((response) => {

            let movies = response.data.Search;

            let output = '';
            for (var i = 0; i < movies.length; i++) {
                var Poster = movies[i].Poster;
                var Title = movies[i].Title;
                var ID = movies[i].imdbID;

                output += `
                <div class="col-md-3">
                    <div class="well text-center">
                    <img src="` + Poster + `">
                    <h5>` + Title + `</h5>
                    <a onClick="moviesSelected(` + ID + `)" class="btn btn-primary" href="#">Movies Details</a>
                    </div>
                </div>
                `;
            }

            document.querySelector('#movies').innerHTML = output;
        })

    .catch((err) => {
        console.log(err);
    });

}


//function for movie selected for movie.html
function moviesSelected(ID) {

    //to passed data from one page to another is through session storage
    sessionStorage.setItem('movieId', ID);
    window.location = 'movie.html';
    return false;

}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get('https://www.omdbapi.com/?i=' + movieId + '&apikey=d5d3093e')
        .then((response) => {

            console.log(response);
            let movie = response.data;

            let output = `
            <div class="row">
                <div class="col-md-4">
                    <img src=" ` + movie.Poster `">
                </div>

                <div class="col-md-8">
                <h2>` + movie.Title `</h2>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre:</strong>` + movie.Genre `</li>
                    <li class="list-group-item"><strong>Released:</strong>` + movie.Released `</li>
                    <li class="list-group-item"><strong>Rated:</strong>` + movie.Rated `</li>
                    <li class="list-group-item"><strong>IMDB Rating:</strong>` + movie.imdbRating `</li>
                    <li class="list-group-item"><strong>Director:</strong>` + movie.Director `</li>
                    <li class="list-group-item"><strong>Writer:</strong>` + movie.Writer `</li>
                    <li class="list-group-item"><strong>Actors:</strong>` + movie.Actors `</li>
                </ul>
                
                </div>
            </div>

            <div class="row">
            <div class="well">
            <h3>Plot</h3>
            ` + movie.Plot `
            <hr>
            <a href="http://imdb.com/title/+`
            movie.imdbID `" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back to Search</a>
            </div>
            </div>
            `;

            document.querySelector('#movies').innerHTML = output;
        })

    .catch((err) => {
        console.log(err);
    });
}
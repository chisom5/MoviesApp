document.querySelector('#searchForm').addEventListener('submit', getMovies);

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
                output += `
                <div class="col-md-3">
                    <div class="well text-center">
                    <img src="` + Poster + `">
                    <h5>` + Title + `</h5>
                    <a onClick="moviesSelected()" class="btn btn-primary" href="">Movies Details</a>
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
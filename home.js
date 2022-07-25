class Movie {
    constructor(name, director, year, image) {
        this.name = name;
        this.director = director;
        this.year = year;
        this.image = image;
        this.elo = 1000;
    }
}
let voteCount = 0;
let movie1;
let movie2;

let movieList = [new Movie("The Wolf of Wall Street", "Martin Scorsese", "2013", "https://xl.movieposterdb.com/13_11/2013/993846/xl_993846_6b55e2ea.jpg"),
new Movie("Interstellar", "Christopher Nolan", "2014", "https://media-cache.cinematerial.com/p/500x/ctpnz4mq/interstellar-movie-poster.jpg?v=1456424450"),
new Movie("Iron Man", "Jon Favreau", "2008", "https://xl.movieposterdb.com/08_03/2008/371746/xl_371746_4243f899.jpg"),
new Movie("Pulp Fiction", "Quentin Tarantino", "1994", "https://media-cache.cinematerial.com/p/500x/hmc4otl5/pulp-fiction-theatrical-movie-poster.jpg?v=1479233327"),
new Movie("Indiana Jones", "Steven Speilberg", "1981", "https://xl.movieposterdb.com/20_08/1981/82971/xl_82971_a5e3e742.jpg"),
new Movie("Star Wars", "George Lucas", "1978", "https://xl.movieposterdb.com/21_01/1977/76759/xl_76759_43e2730c.jpg"),
new Movie("Jaws", "Steven Spielberg", "1975", "https://media-cache.cinematerial.com/p/500x/oqvquhra/jaws-movie-poster.jpg?v=1606342749"),
new Movie("Avatar", "James Cameron", "2009", "https://media-cache.cinematerial.com/p/500x/flxsfhmz/avatar-movie-poster.jpg?v=1456063182"),
new Movie("Titanic", "James Cameron", "1997", "https://media-cache.cinematerial.com/p/500x/0f0v4qo6/titanic-movie-poster.jpg?v=1456630107"),
new Movie("The Dark Knight", "Christopher Nolan", "2008", "https://media-cache.cinematerial.com/p/500x/udapnxr3/the-dark-knight-movie-poster.jpg?v=1456051180"),];


window.onload = function () {
    loadMovies();
}

function loadMovies() {

    let shuffledList = movieList.sort(() => 0.5 - Math.random());
    let selected = shuffledList.slice(0, 2);

    for (let i = 0; i < 2; i++) {
        document.getElementById("movietitle" + i).textContent = selected[i].name;
        document.getElementById("moviedirector" + i).textContent = selected[i].director;
        document.getElementById("movieyear" + i).textContent = selected[i].year;
        document.getElementById("movieimage" + i).src = selected[i].image;
    }
    movie1 = selected[0];
    movie2 = selected[1];

    document.getElementById("refresh__button").addEventListener("click", generateLeaderboard);
    document.getElementById("button0").addEventListener("click", clickFirst);
    document.getElementById("button1").addEventListener("click", clickSecond);
    console.log(movie1);
    console.log(movie2);
}
function clickFirst() {
    voteCount++;
    EloRating(movie1, movie2);
    loadMovies();
}
function clickSecond() {
    voteCount++;
    EloRating(movie2, movie1);
    loadMovies();
}


function generateLeaderboard() {
    if (voteCount < 5) {
        alert("Please make more selections for more accurate ratings.");
        return;
    }
    let sorted = sortMovies();
    let table = document.getElementById("leaderboard__table");
    let leaderboard = document.getElementById("leaderboard");
    let dataHtml = "";
    for (let i = 0; i < 5; i++) {
        dataHtml += "<tr><td class=" + "\"" + "leaderboard__num" + "\"" + ">" + (i + 1) + "</td><td>" + sorted[i].name + "</td><td>" + sorted[i].elo.toFixed() + "</td></tr>";
    }
    leaderboard.innerHTML = dataHtml;
    table.style.display = "table";
}
function sortMovies() {
    return movieList.sort((a, b) => {
        return b.elo - a.elo;
    })
}

function Probability(rating1, rating2) {
    return (
        (1.0 * 1.0) / (1 + 1.0 * Math.pow(10, (1.0 * (rating1 - rating2)) / 400))
    );
}

// Function to calculate Elo rating
// K is a constant.
// d determines whether Player A wins
// or Player B.
function EloRating(Ra, Rb) {
    let K = 300;
    // To calculate the Winning
    // Probability of Player B
    let Pb = Probability(Ra.elo, Rb.elo);

    // To calculate the Winning
    // Probability of Player A
    let Pa = Probability(Rb.elo, Ra.elo);

    Ra.elo = Ra.elo + K * (1 - Pa);
    Rb.elo = Rb.elo + K * (0 - Pb);
}























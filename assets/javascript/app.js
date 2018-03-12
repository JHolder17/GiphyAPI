//starting options for my movie giphy api
var topics = ["Gone in 60 Seconds", "Rush Hour", "Scarface", "White Men Can't Jump", "Fruitville Station"]

// movie buttons function
function buttons() {

    //empty what in the buttons div
    $("#buttons").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {
        //creating button
        var a = $("<button>");
        // Adding a class of movie-btn to our button
        a.addClass("movie-btn");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttons").append(a);
    }
}

// add a movie button on submit
$("#add").on("click", function (event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var movie = $("#movie").val().trim();

    // Adding movie from the textbox to our array
    topics.push(movie);

    // Calling renderButtons which handles the processing of our movie array
    buttons();
});

//display the gif's fot movies
function dispayGif() {

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    })}

buttons();
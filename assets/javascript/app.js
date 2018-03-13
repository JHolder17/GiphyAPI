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

    // Calling buttons which handles the processing of our movie array
    buttons();
});

//display the gif's fot movies
function dispayGif() {

    var movie = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=mKgRh4hFUILQPj1TUs4qNxT0nGHltUvP&q=" + movie + "&limit=10&offset=0&rating=G&lang=en"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        //loop through the ten gifs that get displayed 

        // Retrieving the URL for the image ??HOw to get all ten images from array
        var gif = response[i].data.bitly_gif_url;

        // Creating an element to hold the image
        var image = $("<img>").attr("src", gif);

        // Appending the image
        $("#Gifs").append(image);

        //rating info
        var rating = response[i].rating;

        // making a p for the rating
        var pOne = $("<p>").text("Rating: " + rating);

        //display rating
        $("#Gifs").append(pOne);
    });
}
//click event for the buttons
$(document).on("click", ".movie-btn", dispayGif);


buttons();

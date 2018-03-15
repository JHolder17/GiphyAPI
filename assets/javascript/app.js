//starting options for my movie giphy api
var topics = ["Gone in 60 Seconds", "Rush Hour", "Scarface", "White Men Can't Jump", "Toy Story"]

// display movie buttons function
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

//display the gif's for movies
function dispayGifs() {
    
    //empty old gif details
    $("#gifs").empty();

    var movie = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=mKgRh4hFUILQPj1TUs4qNxT0nGHltUvP&q=" + movie + "&limit=10&offset=0&rating=G&lang=en"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.data);

        //loop through the ten gifs that get displayed 
        for (var i = 0; i < response.data.length; i++) {

            //place to hold gif & rating
            var gifDetails = $("<div class='gifDetails'>");

            //rating info
            var rating = response.data[i].rating;

            // making a p for the rating
            var p = $("<p>").text("Rating: " + rating);

            //display rating
            gifDetails.append(p);

            // Store gif data,location in array
            var gif = response.data[i].images.fixed_height.url;

            // Creating an element to hold the gif
            var image = $("<img>").attr("src", gif);
            $(image).attr("data-still", response.data[i].images.fixed_height_still.url); 
            $(image).attr("data-animate", response.data[i].images.fixed_height.url);
            $(image).attr("data-state", "animate");

            // Display in html 
            gifDetails.prepend(image);

            // Putting the entire movie above the previous movies
            $("#gifs").prepend(gifDetails);
        }
    });
}

//pause gifs function
$(document).on("click", "img", function(){

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        console.log($(this).attr("data-still"));
      }

});
//click event for the buttons
$(document).on("click", ".movie-btn", dispayGifs);


buttons();

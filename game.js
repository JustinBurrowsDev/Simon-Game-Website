let buttonColors = ["red", "blue", "green", "yellow"]; // created an array to hold all the button colors

let gamePattern = [];
let userClickedPattern = [];

let started = false;

let level = 0;

$(document).keypress(function() { // jQuery detects once the key board is pressed then calls nextSequence().
    if (!started) {

        $("level-title").text("Level" + level); // changes the "Press A to Start" in to "Level 0" once the game has started.
        nextSequence();
        started = true;

    }
});

// Using jQuery to detect when any of the buttons are clicked and to trigger a handler function.
$(".btn").click(function() {

    let userChosenColor = $(this).attr("id"); // stores the id of the button that got clicked.

    userClickedPattern.push(userChosenColor); // Adds the content of the variable userChosenColor to the end of the new userClickedPattern.

    playSound(userChosenColor); // plays the corresponding sound when the user clicks.

    checkAnswer(userClickedPattern.length - 1); // passes index of the last answer
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { //check if user entered pattern is the same as the game pattern.
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) { // checks to see if the user finished their sequence.

            setTimeout(function() { //calls nextSequence() after 1000 millisecond delay.
                nextSequence();
            }, 1000);
        }
    } else {

        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over"); // changes the look of the website once the user gets an answer wrong.
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart"); // changes the title of the website once the user get a answer wrong.

        startOver();
    }
}


function nextSequence() {

    userClickedPattern = []; //resets the userClickedPattern

    level++; // increases the level by 1 each time nextSequence is called.

    $("#level-title").text("Level" + level); // updates the h1 with the value of level.

    let randomNumber = Math.floor(Math.random() * 4); // generates a new random number between 0 and 3.
    let randomChosenColor = buttonColors[randomNumber]; // selects a random color from the buttonColors array.
    gamePattern.push(randomChosenColor); // adds the new randomChosenColor generated to the end of the gamePattern.

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); // used jQuery to animate a flash to the button selected.

    playSound(randomChosenColor); // plays the corresponding sound in current sequence.

}

function playSound(name) {

    let audio = new Audio("sounds/" + name + ".mp3"); //plays the sound for the button color selected.
    audio.play();

}

function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed"); // adds the pressed class to the current button.

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed"); // remove the "pressed" class after 100 milliseconds
    }, 100);

}


function startOver() {

    level = 0;
    gamePattern = [];
    started = false;

}

var buttonsColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

$(document).ready(function () {
    $(".btn").click(function () {
        var userChosenColour = $(this).attr('id');
        userClickedPattern.push(userChosenColour);
        console.log(userClickedPattern);

    });
});
$(document).ready(function () {
    $(".btn").click(function playSound(name) {
        var buttonClass = $(this).attr('id');
        if (buttonClass === "red") {
            var sRed = new Audio("./sounds/red.mp3");
            sRed.play();
        }
        else if (buttonClass === "blue") {
            var sBlue = new Audio("./sounds/blue.mp3");
            sBlue.play();
        }
        else if (buttonClass === "yellow") {
            var sYellow = new Audio("./sounds/yellow.mp3");
            sYellow.play();
        }
        else if (buttonClass === "green") {
            var sGreen = new Audio("./sounds/green.mp3");
            sGreen.play();
        }

    });
});
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonsColours[randomNumber];
    gamePattern.push(randomChosenColour);
    var selectedButton = document.getElementById(randomChosenColour);
    $(selectedButton).fadeOut(100).fadeIn(100);




    if (randomChosenColour === "red") {

        selectedButton.addEventListener("click", () => {
            var soundRed = new Audio("./sounds/red.mp3");
            soundRed.play();
        });

    } else if (randomChosenColour === "green") {

        selectedButton.addEventListener("click", () => {
            var soundGreen = new Audio("./sounds/green.mp3");
            soundGreen.play();
        });


    } else if (randomChosenColour === "blue") {

        selectedButton.addEventListener("click", () => {
            var soundBlue = new Audio("./sounds/blue.mp3");
            soundBlue.play();
        });


    } else if (randomChosenColour === "yellow") {

        selectedButton.addEventListener("click", () => {
            var soundYellow = new Audio("./sounds/yellow.mp3");
            soundYellow.play();
        });


    }

};


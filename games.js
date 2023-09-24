var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  // to play the corresponding sound when clicked
  playSound(userChosenColour);
  //calling the animate effect
  
  animatePress(userChosenColour);
  //calling the answer verification function
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over!press any key to start");
    $("#score").text(`Your highest level is ${level}`)
    //call startover() to restart
    startOver();
  }
}

// next seuence random
function nextSequence() {
  // once the sequence is triggered reset the userClickedPattern
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  //generating random number and passing to game pattern array
  var roundNumber = 4;
  var randomNumber = Math.floor(Math.random() * roundNumber);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  //selecting the button with the same id as the randomChosenColor plus adding flashing effect
  $(document).ready(function () {
    $("#" + randomChosenColor)
      .fadeOut(200)
      .fadeIn(200)
      .fadeIn(200);
  });

  // to play for random color choosen
  playSound(randomChosenColor);
}


// play sound when button clicked
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// adding animations
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 200);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

$(document).ready(function () {
    $(".instructions-btn").click(function () {
      $("#instructionsOverlay").css("display", "flex");
    });
    $(".close-btn").click(function () {
      $("#instructionsOverlay").slideUp();
    });
  });

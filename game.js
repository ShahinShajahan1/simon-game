alert("This game REQUIRES a keyboard key input to start. So if you are using a mobile device/phone it may not work");
var started = false;
var level =0;
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[]
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColour =$(this).attr("id");
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){        
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } 
    else {
        var waudio= new Audio('sounds/wrong.mp3')
        waudio.play()
        $("body").addClass("game-over");        
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 200);
        startOver()
    }
}


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(150).fadeIn(150).fadeOut(150).fadeIn(150);
    playSound(randomChosenColour);
};

function playSound(name){
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
};

function startOver(){
    level=0;
    gamePattern =[];
    started =false;
}

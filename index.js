var pattern = [];
var userChoice = [];
var level = 0;
var started = 0;

function playAudio(id){
    const audio = new Audio('sounds/'+id+'.mp3');
    audio.play();
}

function randomChoice(){
    const squares = ['green','red','yellow','blue']
    const choice = Math.floor(Math.random()*10)%4;

    $('#'+squares[choice]).fadeOut(100).fadeIn(100);
    playAudio(squares[choice]);

    return squares[choice]
}


function check(currLevel){
    if(pattern[currLevel] === userChoice[currLevel]){
        if(pattern.length === userChoice.length){
            setTimeout(function(){
                startGame();
            },1000);
        }
    }
    else{
        playAudio('wrong');
        $('body').addClass('game-over');
        $('#level-title').text('Game Over, Press Any key to start over');
    
        setTimeout(function(){
            $('body').removeClass('game-over');
        });
    
        level = 0;
        pattern = [];
        started = -1;
    }   
}

function startGame(){
    userChoice = [];
    level += 1;
    $('#level-title').text('Level '+level);
    pattern.push(randomChoice());
}

$(document).click(function(){
    if(started === 0){
        started += 1;
        startGame();
    }
    started += 1;   
})

$('.btn').on('click',function(){
    if(started){
    playAudio(this.id);
    self = $(this);
    self.addClass('pressed');
    setTimeout(function(){
        self.removeClass('pressed');
    },100);
    userChoice.push(this.id);
    check(userChoice.length-1)}
});




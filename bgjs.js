//  PADDLE GAME ::::: SEGELFARTYG

var c = document.getElementById("bgcanvas");
var ctx = c.getContext("2d");
var tegnell = document.getElementById("tegil");
var elias = document.getElementById("eliboy");
var ebba = document.getElementById("ebba");
var stefan = document.getElementById("stefan");
var anti = document.getElementById("anti");
var scoreboard = document.getElementById("scoreboard");
var cup = document.getElementById("cup");
var Keystate = [];
var bx = 240;
var by = 432;
var count = 0;
var skjut = 0;
var shots = [];
var orb = [];
var started = false;
var score = 0;
var done = false;
var clock;
var game;
var gamespeed =500;
var enemy = 0;
var ballsize = 15;
var rainrate = 1;
var end = false;
var button11 = document.getElementById("button1");


window.addEventListener("load", Background);
button11.addEventListener("mousedown", GO);




function Background(){

    document.addEventListener("keydown", function(event){ 
        Keystate[event.keyCode] = true;
     });
 
     document.addEventListener("keyup", function(event){
         delete Keystate[event.keyCode];
     });
     
    Interval();
}

function GO(){
    score = 0;
    var bar = document.getElementById("bar");
    var overlay = document.getElementById("overlays");
    var out = document.getElementById("outer");
    var scorearea1 = document.getElementById("scorearealeft");
    var scorearea2 = document.getElementById("scorearearight");
  
    out.style.display = "grid";
    scorearea1.style.display = "grid";
    scorearea2.style.display = "grid";
    overlay.style.background = "linear-gradient(90deg, rgba(38, 0, 255, 0) 45%, rgba(4, 0, 255, 0) 50%, rgba(4, 0, 255, 0.014) 55%);";
    overlay.style.animation = "2s fade forwards"; 
    out.style.animation = "1s start forwards";
    scorearea1.style.animation = "1s start forwards";
    scorearea2.style.animation = "1s start forwards";
    bar.style.animation ="2s forwards flyg"; 

    rainrate = 5;
    started = true; 
    orb = [];
    shots = [];
    bx = 240;
    gamespeed = 500;

    Start();
}



function Start(){

    PaintBoard();
     setTimeout(() => {
   
        clock = setInterval(timer, gamespeed);
        game = setInterval(Loop, 10);

     }, 1000);

   
}

function Loop(){

    if(end == true){
        orb = [];
        shots = [];
        bx = 245;
        StopGame();
        resetTimer();

        var bar = document.getElementById("bar");
        var overlay = document.getElementById("overlays");
        var out = document.getElementById("outer");
        var scorearea1 = document.getElementById("scorearealeft");
        var scorearea2 = document.getElementById("scorearearight");
        var area = document.getElementById("area");
        var button1 = document.getElementById("button1");

        out.style.animation = "1s end forwards";
        setTimeout(function(){out.style.display = "none"}, 1000);
        scorearea1.style.animation = "1s end forwards";
        scorearea2.style.animation = "1s end forwards";
        setTimeout(function(){scorearea1.style.display = "none"}, 1000);
        setTimeout(function(){scorearea2.style.display = "none"}, 1000);
    
        area.innerHTML = "FIKARASTEN ÄR SLUT. <br> DU FICK I DIG TOTALT <span class='result'>" + score.toString() + "</span><br>KOPPAR KAFFE.<div class='textarea'>"+
        "<button id='button1' onmousedown='GO()' >KÖR IGEN</button></div>";
        button1.childNodes[0].nodeValue = "KÖR IGEN";
        overlay.style.background = "linear-gradient(90deg, rgba(38, 0, 255, 0) 45%, rgba(4, 0, 255, 0) 50%, rgba(4, 0, 255, 0.014) 55%);";
        overlay.style.animation = "1s fadeback forwards";
        bar.style.animation = "1s flygner forwards";
        
        score = 0;
        end = false;
    
    }

    else{

        if(Keystate[32] && skjut >= 1){
                shots.push([bx + 27.5, by, 2]);
                skjut = 0;
        }
        
        if(Keystate[37] && bx -5 >= 0 && !Keystate[39]){
            bx = bx - 5;
        }
        else{
            bx = bx;
        }
        if(Keystate[39] && bx +5 <= 435 && !Keystate[37]){
            bx = bx + 5;
        }
        else{
            bx = bx;
        }
        if(started){
            
        LaunchEnemy(orb);
        CalcShots(shots);
        RemoveEnemies(orb, shots);
        RemoveLaunched(shots);
        CalcObjects();

        }
    }



}

function PaintBoard(){
    
    window.requestAnimationFrame(PaintBoard);
    ctx.clearRect(0,0,c.height, c.width);

    if(started){
        ctx.drawImage(tegnell, bx, by, tegnell.width, tegnell.height);              
    }
        PaintLaunched(shots);
        PaintEnemies(orb);     
}

function PaintLaunched(arr){

    for (var i = 0; i < arr.length; i++){

        var tempx;
        var tempy;

        tempx = arr[i][0]
        tempy = arr[i][1]

    ctx.drawImage(anti, tempx, tempy, anti.width, anti.height);
    }
}

function CalcShots(arr){


    for (var i = 0; i < arr.length; i++){

            if(arr[i][1] > 0 && arr[i][2] > 1){
                
                arr[i][1] = arr[i][1] - 5;
            } 

            if(arr[i][2] > 0.5 && arr[i][2] <= 1){

                arr[i][0] = arr[i][0] + 5;
            }
           
            if(arr[i][2] < 0.5){

                arr[i][0] = arr[i][0] - 5;
            }
    }
}


function RemoveVacc(arr, arr2){

    for(var i = 0; i < arr.length; i++){

        if(arr2.length >= 1){

            for(var j = 0; j < arr2.length; j++){
    
                if(arr[i][0] >= arr2[j][0] -20 && arr[i][0] <= arr2[j][0] +25 && arr2[j][2] == 2){
    
                        if(arr[i][1] >= arr2[j][1] -5 && arr[i][1] <= arr2[j][1] + 5){
        
                            if(arr[i][3] == 2){

                                var temprandom = Math.random();

                                arr[i][3] = temprandom;
                                arr2[j][2] = temprandom;
                                resetTimer();
                                if(gamespeed > 150){
                                  gamespeed = gamespeed - 5;
                                }
                                else if(gamespeed < 150 && gamespeed > 75){
                                    gamespeed = gamespeed - 1;
                                }
                                else if(gamespeed < 75 && gamespeed > 50){
                                    gamespeed = gamespeed -0.25;
                                }
                                clock = setInterval(timer, gamespeed);
                            }
                            
                            score++;
                            break;
                        }
                        else{
                            break;
                        }
                }    
            }
        }

    }
};

function LaunchEnemy(arr){

        for (var i = 0; i < arr.length; i++){
            
            if(arr[i][3] != 2){

                if(arr[i][3] > 0.5 && arr[i][3] <= 1){

                    arr[i][0] = arr[i][0] + 5;

                }
                else if (arr[i][3] < 0.5){
    
                arr[i][0] = arr[i][0] - 5;
                }

            }
            else{

                var tempy;
                tempy = arr[i][1];
       
                arr[i][1] = tempy + 5;

            }
        }
}

function PaintEnemies(arr){

    for (var i = 0; i < arr.length; i++){ 

        var tempx = arr[i][0];
        var tempy = arr[i][1];
        var shape = "";
        var color = "";

        if(arr[i][2] == 1){
                shape = "stefan";
                color = "red";
        }
        if(arr[i][2] == 2){
                shape = "man";
                color = "white";
        }
        if(arr[i][2] == 3){
                shape = "ebba";
                color = "gold";
        }
    
        switch(shape){

            case "ball":
                ctx.beginPath();
                ctx.arc(tempx, tempy, ballsize, 2 * Math.PI, false);
                ctx.fillStyle = color;
                ctx.fill();
                ctx.stroke();
            break;
            case "stefan":
                ctx.drawImage(stefan, tempx, tempy - 50, elias.width, elias.height); 
            break;
            case "man":
                ctx.drawImage(elias, tempx, tempy - 50, elias.width, elias.height);  
            break;
            case "ebba":
                ctx.drawImage(ebba, tempx, tempy - 50, elias.width, elias.height);  
            break;

            default:
        }
    }
}


function CalcObjects(){

var random = 0;
var tempa = 0;
var i = 0;

for(i = 0; i < 4; i++){
    tempa = Math.random() * 10;
    random += tempa;
}

if(enemy % 2 == 0 && !done){

    if(random > 25){

            orb.push([Math.random() * 500, -50, 2, 2, 1]);
            done = true;

    }
    else if(random < 25 && random > 15){

            orb.push([Math.random() * 500, -50, 1, 2, 1]);
            done = true;
       
    }
    else if(random < 15){
   
            orb.push([Math.random() * 500, -50, 3, 2, 1]);
            done = true;
      
    }
}

}

function RemoveLaunched(arr){

    if(arr.length > 0){

        for(var i = 0; i < arr.length; i++){

            if(arr[i][1] < 0){

                arr.splice(i, 1);
                break;

            }
            
            if(arr[i][0] < 0){

                arr.splice(i, 1);

                break;
            }
       
            if(arr[i][0] > c.width){

                arr.splice(i, 1);
                break;

            }
        }
    }
}


function RemoveEnemies(arr, arr2){

    if(arr.length > 0){

        RemoveVacc(arr, arr2);

        for (var i = 0; i < arr.length; i++){

                    if(arr[i][1] >= by){

                        if(arr[i][2] == 2 && arr[i][0] >= bx -10 && arr[i][0] <= bx +60){

                            arr.splice(i, 1);
                            end = true;
                            break;
                        }

                        if(arr[i][2] == 1  && arr[i][0] >= bx -10 && arr[i][0] <= bx + 60)
                        {

                            
                            arr.splice(i, 1);
                            end = true;
                            break;
                      
                        }
                        if(arr[i][2] == 3  && arr[i][0] >= bx -10 && arr[i][0] <= bx + 60)
                        {
                            
                            arr.splice(i, 1);
                            end = true;
                            break;
                        }

                    }  
                    if(arr[i][1] >= by + 200){
                        arr.splice(i, 1);
                    } 
                    if(arr[i][0] > c.width || arr[i][0] < -100){
                        arr.splice(i, 1);
                    }   
            }
        }
        scoreboard.innerHTML = "Koppar: " + score;
}


    
function Interval(){
    setInterval(() => {
   
        count++;
        
        if(count <= 1){
            skjut += 1;
            
        }
        else{
            count = 0;
        }
    }, 100);
}



function StopGame(){

clearInterval(game);

}

function timer(){ 
    done = false;
}

function resetTimer(){
clearInterval(clock);
}
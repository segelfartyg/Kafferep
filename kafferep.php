<!--PADDLE-GAME ::::: SEGELFARTYG -->
<!DOCTYPE html>
<html>
<head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Kafferep</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="bgcss.css">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Staatliches&display=swap" rel="stylesheet">


        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="theme-color" content="#ffffff">
</head>
<body>

    <div class="header">
            <div class="title">        
                <h2>KAFFEREP</h2>
                <h3>med Samuel Swarén</h3>
            </div>
                <div class="pictures">
                    <img id="eliboy" width="25" height="55" src="kaffe.png">
                    <img id="ebba" width="25" height="55" src="kaffe.png">
                    <img id="stefan" width="25" height="55" src="kaffe.png">
                </div>
            
            <img id="tegil" width="75" height="75" src="samuel2.png">
        
    </div>


    <div id="overlays">
        
        <div class="header">
            
            <div class="title">
                <h2>KAFFEREP</h2>
                <h3>med Samuel Swarén</h3>
            </div>
                
            <img id="tegil" width="75" height="75" src="samuel2.png">

            </div>
            
        <div class="overlay">

            <div id="bar">
           
                <div id="area">
                    HAN KOM. HAN SÅG. HAN FIKADE!
                    <div class="textarea">
                        <button id="button1">KÖR</button>    
                    </div>        
                </div>             
    
            </div>   

        </div>    
        
    </div>
        
    
    <div id="con">     
                
        <div id="scorearealeft">
            <img id="kaffe" src="kaffe.png" >
        </div>
    
        <div id="outer">
            <div id="out">
                <div id="gamearea">
                    <canvas id="bgcanvas" height="500" width="500">
                      
                    </canvas>
                </div>
            </div>  
        </div>    


        <div id="scorearearight">   
            <div id="scoreboard" class="scoreboard">Koppar: 0</div>
        </div>
    </div>
       
    <div class="controls">Styr Samuel med "<-" "->" och skjut kaffe med mellanslag<br> Samla så mycket kaffe som möjligt utan att få det i huvudet</div>
    <div class="social"><img src="sailor.PNG"></div>
    <img id="anti" width="30" height="55" src="cup.png">
    <img id="cup" width="50px" height="50px" src="cup.png">
  
    <script src="bgjs.js" async defer></script>
    </body>
</html>

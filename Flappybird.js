
/*                  HIGH SCORES PAGE IS ADDED...
                POST HIGH SCORES IN TIPS & THANKS... 
    IF HIGH SCORE IS OVER 100, MUST HAVE PROOF IN A SPIN OFF! 
                    THANKS FOR PLAYING
    
    
    
    
    
    HUGE THANKS TO ECHOS OF RAGE FOR ADDING THIS GAME TO HIS 
    PROGRAM SPOTLIGHTS LIST, AND GETTING EVERYONE HERE FOR ME! 
*/
{
    var score = 0;
    var screen = 0;
    var pipes = [];
    var speed;
    var started= false;
    var playerAlive = true;
    var flappySize = 2;}//Globals
    {
    var flappy = function(x, y) {
        this.x = x;
        this.y = y;
        this.jumped = false;
        this.UP = 4;
        this.gravity = 0.3;
        this.drawing = [
            "      111111     ",
            "    11yyy1ww1    ",
            "   1yyyy1wwww1   ",
            " 1111yyy1www1w1  ",
            "1wwww1yy1www1w1  ",
            "1wwwww1yy1wwww1  ",
            "1ywwwy1yyy111111 ",
            " 1yyy1yyy1oooooo1",
            "  111ttt1o111111 ",
            "  1tttttt1ooooo1 ",
            "   11ttttt11111  ",
            "     11111       ",
        ];
    };
    flappy.prototype.draw = function(){
        //FLAPPING UP!! 
        if(this.jumped===true){
            this.y -= this.UP;this.UP -= this.gravity;
        }
        pushMatrix();
        translate(this.x, this.y);
        
        if(started) {
            rotate(-this.UP);
        }
        if(this.y < 0) {
            this.UP -= 10;
        }
        noStroke();
        
        //THE CHARACTER DRAWING
        for(var y = 0; y < this.drawing.length; y ++) {
            for(var x = 0; x < this.drawing[y].length; x ++) {
                if(this.drawing[y][x] === "y") {fill(247, 255, 0);}
                if(this.drawing[y][x] === "w") {fill(255, 255, 255);}
                if(this.drawing[y][x] === "1") {fill(0, 0, 0);}
                if(this.drawing[y][x] === "o") {fill(255, 162, 0);}
                if(this.drawing[y][x] === "t") {fill(179, 179, 84);}
                if(this.drawing[y][x] === " ") {noFill();}
                rect(x*flappySize,y*flappySize,flappySize-0.1,flappySize-0.1);
            }
        }
        if(started === true && mouseIsPressed && playerAlive===true) {
            playSound(getSound("retro/jump2"));
            if(this.jumped === false || this.UP < 0.4) {
                if(this.y > 0) {
                    this.UP = 5;
                    this.jumped = true;
                }
            }
        }
        popMatrix();
    };
    var player = new flappy(200,200);}//Flappy
    {
    var Pipe = function(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    };
    Pipe.prototype.draw = function() {
    // draws top (A) and bottom (B) pipe
        image(Pipe.A, this.x, this.y - this.z - 390);
        image(Pipe.B, this.x, this.y);
    
        // show gap (testing)
            //noFill();
            //stroke(0, 128, 0);
            //rect(this.x-0, this.y-this.z+2, 80, this.z-4);
            if(player.x > this.x + 79 && player.x < this.x +81.5 && playerAlive === true){
                score += 1;
                playSound(getSound("rpg/coin-jingle"));
            }
        // show hit boxes
            //stroke(128, 0, 0);
            //rect(this.x+10, this.y+0, 60, this.y+100);
            if(player.x  +33 > this.x+10 && 
               player.x + 12 < this.x + 70 && player.y + 24 > this.y){
                    //playSound(getSound("rpg/hit-splat"));
                    speed = 0; 
                    player.jumped=false; 
                    playerAlive = false;
               }
            
            //rect(this.x+10,0, 60, this.y-this.z);
            if(player.x + 33 > this.x + 10 && 
            player.x + 12 < this.x + 70 && player.y + 24 > 0 && player.y + 24 <this.y - this.z +24){
                //playSound(getSound("retro/hit2"));
                speed = 0; 
                player.jumped = false;
                playerAlive = false;
            }
    };
    var initPipe = function(){
    // creates pipe images
        background(0, 0, 0, 0);
        noStroke();
        fill(224, 18, 169);
        rect(20, 10, 80, 15);
        rect(30, 25, 60, 400);
        rect(120, 375, 80, 15);
        rect(130, 0, 60, 375);
    
        fill(16, 129, 204);
        rect(30, 10, 60, 15);
        rect(45, 25, 30, 400);
        rect(130, 375, 60, 15);
        rect(145, 0, 30, 375);
    
        fill(247, 0, 0);
        rect(45, 10, 30, 15);
        rect(55, 25, 10, 400);
        rect(145, 375, 30, 15);
        rect(155, 0, 10, 375);
        fill(0, 0, 0, 40);
        rect(30, 25, 60, 10);
    
        stroke(255);
        line(20, 11, 100, 11);
        line(120, 376, 200, 376);
        stroke(0);
        noFill();
        rect(20, 10, 80, 15);
        rect(30, 25, 60, 400);
        rect(120, 375, 80, 15);
        rect(130, 0, 60, 375);
        Pipe.B = get(20, 10, 81, 390);
        Pipe.A = get(120, 0, 81, 391);
    };
    var movePipes = function(){
        for (var p=pipes.length; p--;){
            var pipe = pipes[p];
            if (pipe.x>-90){
                // still on screen
                pipe.x -= speed;
                pipe.draw();
            }else{
                // off screen
                pipes.splice(p, 1);
                pipes.push(new Pipe(600, random(130, 360), random(90,130)));
            }
        }
    };}//PIPES/ THANKS LARRY
    {
    var button = function(config){
        this.x = config.x;
        this.y = config.y;
        this.w = config.w;
        this.h = config.h;
        this.ts = config.ts;
        this.text = config.text;
        this.onClick = config.onClick || function(){};
    };
    button.prototype.mouseInside = function(){
        return (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h);
    };
    button.prototype.draw = function() {
        noStroke();
        fill(0,0,0,150);
        rect(this.x + 8, this.y + 8, this.w, this.h,10);
        fill(217, 255, 0);
        rect(this.x-3,this.y-3,this.w+6,this.h+6,10);
        fill(212, 99, 0,200);
        rect(this.x,this.y,this.w,this.h,10);
        fill(0, 0, 0);
        textSize(17);
        textAlign(CENTER,CENTER);
        text(this.text, this.x + this.w / 2, this.y + this.h / 2);
    };
    button.prototype.handleClick = function(){
        this.onClick();
    };
    var bx = 0;
    var bspeed = 0;
    var cx = 0;
    var cspeed = 0;
    var backdrop = function(){
        background(0, 238, 255);noStroke();
        {fill(225, 255, 0);
        ellipse(525, 67, 100, 100);}//sun
        {fill(255,255,255);
        ellipse(cx + 100, 100, 50, 50);
        ellipse(cx + 130, 100, 50, 30);
        ellipse(cx + 70, 100, 50, 30);
            ellipse(cx + 310, 200, 50, 50);
            ellipse(cx + 340, 200, 50, 30);
            ellipse(cx + 280, 200, 50, 30);
                ellipse(cx + 450, 100, 50, 50);
                ellipse(cx + 480, 100, 50, 30);
                ellipse(cx + 420, 100, 50, 30);
                    ellipse(cx + 540, 40, 50, 50);
                    ellipse(cx + 570, 40, 50, 30);
                    ellipse(cx + 510, 40, 50, 30);}//clouds
        {fill(32, 171, 46);
        stroke(0);
        strokeWeight(1);
        ellipse(bx, 345, 369, 170);
        fill(111, 247, 57);
        ellipse(bx + 200, 400, 210, 150);
        fill(33, 194, 113);
        ellipse(bx + 100, 400, 100, 100);
        fill(44, 163, 58);
        ellipse(bx + 550, 341, 270, 312);
        fill(15, 112, 2);
        ellipse(bx + 422, 388, 294, 300);}//hills
        {noStroke();
        for(var i = bx+650; i < 3000; i += 878){
            stroke(0);
            strokeWeight(2);
            fill(84, 84, 84);
            rect(i,200,75,200);
            rect(i + 175, 250, 100, 150);
            rect(i + 250, 225, 25, 25);
            fill(143, 143, 143);
            rect(i+40,158,10,30);
            triangle(i,160,i+75,200,i,200);
            rect(i + 99, 300, 50, 100);
            stroke(0);
            line(i+250, 225, i + 175, 250);
        }}//City
        cx -= cspeed;
        bx -= bspeed;
    };//backdrop
    var reset = function(){
        screen=0;
        playerAlive=true;
        started=true;
        speed=2;
        score=0;
        player.x=200;
        player.y=200;
        player.alive=true;
        player.draw();
        bx = 0;
        cx = 0;
        pipes = [];
        pipes.push(
        new Pipe(600 , random(179,250), 100),
        new Pipe(950, random(176,250), 100));
    };
    var menuBtn = new button({
        x:150,
        y:325,
        w:100,
        h: 50,
        text: "Menu",
        onClick: function(){screen = 1;},
    }),//ON HOWTO
        playBtn2 = new button({
        x:400,
        y:325,
        w:100,
        h: 50,
        text: "Play",
        onClick: function(){reset();started = true; screen = 0;}
    }),//ON HOWTO
        creditBtn = new button({
        x:150,
        y:300,
        w:100,
        h:50,
        text: "Credits",
        onClick : function(){screen = 3;}
    }),//ON MENU
        howToBtn = new button({
        x:350,
        y:300,
        w:100,
        h:50,
        text:"How To",
        onClick: function(){screen = 2;},
    }),//ON MENU
        playBtn = new button({
            x: width / 2.5,
            y: height / 2.5,
            w: 100,
            h: 50,
            text: "Flap",
            onClick: function(){reset();started = true;screen = 0;}
    }),//ON MENU
        backBtn = new button({
        x:475,
        y:325,
        w: 100,
        h: 50,
        text: "Back",
        onClick: function(){screen = 1;},
    }),//ON CREDITS
        replayBtn = new button({
            x: 175,
            y: 225,
            w: 100,
            h: 35,
            text: "Flap Again",
            onClick: function(){reset();reset();}
    }),//ON RESET
        diedMenuBtn = new button({
            x: 325,
            y: 225,
            w: 100,
            h: 35,
            text: "Menu",
            onClick: function(){Program.restart();},
        }),//ON RESET
        NewBtn = new button({
        x: 6,
        y: 6,
        w: 127,
        h: 29,
        text: "WHATS NEW??",
        onClick: function(){screen = 5;},
    }),//ON MENU
        highScoreBtn = new button({
            x: 460,
            y: 6,
            w: 127,
            h: 29,
            text: "HIGH SCORES",
            onClick: function(){screen = 6;},
    });}//BUTTONS, RESET, AND BACKDROP DRAWING
    {
    var menu = function(){
        screen = 1;
        flappySize=8;
        player.x = 100;
        player.y = 150;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
        backdrop();
        {
        noStroke();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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
        fill(0, 255, 0);
        rect(-1, 390, 601, 5);
        fill(74, 48, 4);
        rect(-1, 395, 601, 5);}//GROUND
        player.draw();
        textSize(60);
        fill(0,0,0,180);
        textAlign(CENTER,CENTER);
        text("FLAPPY RE-BIRD 2.1",303,78);
        fill(255,213,0);
        text("FLAPPY RE-BIRD 2.1",300,75);
        textSize(40);
        fill(0,0,0,180);
        text("Created By: Aj Pfeil",303,119);
        fill(255, 213, 0);
        text("Created By: Aj Pfeil",300,116);
        howToBtn.draw();
        creditBtn.draw();
        playBtn.draw();
        NewBtn.draw();
        highScoreBtn.draw();
    };
    var howTo = function(){
        screen = 2;
        backdrop();
        fill(0, 0, 0);
        textSize(30);textAlign(CENTER,CENTER);
        text("How To Play Flappy Re-Bird",300,30);
        textSize(20);
        text("The object of Flappy \nRe-Bird is to Flap \n between the top \npipe and bottom pipe. \n If you hit a pipe, \nor the ground, \n its game OVER. \nClick anywhere on \n the screen to Flap up",300,180);
        {
        //noStroke();
        stroke(0);
        fill(0, 255, 0);
        rect(-1, 390, 601, 5);
        fill(74, 48, 4);
        rect(-1, 395, 601, 5);}//GROUND
        playBtn2.draw();menuBtn.draw();
    };
        var cy = 750;
    var credits = function(){
        screen = 3;
        backdrop();
        noFill();
        stroke(0);
        fill(0);
        textAlign(CENTER,CENTER);
        textSize(20);
        text("Scroll Credits",80,240);
        text("Get links to testers Pages \n HERE",110,350);
        fill(255, 204, 0,190);
        //rect(80,350,65,25);
        triangle(80,200,60,230,100,230);
        triangle(80,280,60,250,100,250);
        textSize(25);
        fill(0);
        text("Flappy Re-Bird \n\n Created and Designed by: \n Aj Pfeil \n\n\n\nBased off of Flappy Bird \n Created by Dong Nguyen \n\n\n\n\nHuge thanks to Larry Serflaten \n for redesigning and \n programming the pipes. \n Huge thanks also to Houston \n for helping me understand \n tunnel collision, and the buttons.\n As well as a thank you to ScusX for his \ninspiration on the animated background.\n\n\n\n***TESTERS & De-buggers*** \n Houston \n  GameChief999 \n Eddie \n Christina Olson \n 1001programmers1001 \n Larry Serflaten \n ScusX",300,cy+100);
        {
        if(mouseIsPressed&&mouseX>60&&mouseX<100&&mouseY>200&&mouseY<230){
        fill(255, 140, 0);
        triangle(80,200,60,230,100,230);            
        cy-=4;
        }
        
        if(mouseIsPressed&&mouseX>60&&mouseX<100&&mouseY>250&&mouseY<280){
            fill(255,140,0);
            triangle(80,280,60,250,100,250);
            cy+=4;
        }
        if(cy <=-800){
            cy=900;
        }
        if(cy>=901){
            cy=-799;
        }}//IF'S
        {
        //noStroke();
        stroke(0);
        fill(0, 255, 0);
        rect(-1, 390, 601, 5);
        fill(74, 48, 4);
        rect(-1, 395, 601, 5);}//GROUND
        backBtn.draw();
    };
    var gameOver = function(){
        screen = 4;
        noStroke();
        fill(255, 238, 0,160);triangle(100,100,100,300,500,300);
        fill(255, 183, 0,160);triangle(500,100,99,100,500,300);
        noFill();stroke(255,170,0);strokeWeight(3);
        rect(137,120,314,155);fill(0);textSize(18);
        textAlign(CENTER,CENTER);
        text("YOU ARE DEAD", 300,130);
        text("YOU FLAPPED OVER " + score, 300,160);
        text("TUNNELS!!", 300,178);
        replayBtn.draw();diedMenuBtn.draw();
    };
    var whatsNew = function(){
        screen = 5;
        backdrop();
        {
        noStroke();
        fill(0, 255, 0);
        rect(-1, 390, 601, 5);
        fill(74, 48, 4);
        rect(-1, 395, 601, 5);}//GROUND
        textAlign(CENTER,CENTER);
        fill(0, 0, 0);
        textSize(30);
        text("Whats new in version 2.1",300,41);
        textSize(17);
        text("Thanks to Larry Serflaten \nwe have a brand new pipe design, and code. \n This has allowed us to cut our code down by over 20 lines! \n Which we added back in new scenes and Buttons. \nThanks so much Larry. \n We have also improved some of the lag as well, \nand minor big fixes.\n Added sound effects..\n BRAND NEW HIGH SCORES PAGE!!\n(post scores in Tips & Thanks to be added) \n \n \n KEEP FLAPPING",300,230);
        backBtn.draw();
    };
    var highScore = function(){
        screen = 6;
        backdrop();
        {
        noStroke();
        fill(0,0,0,150);
        rect(376, 8, 200, 300,10);
        fill(217, 255, 0);
        rect(371, 3, 200, 300,10);
        fill(212, 99, 0,200);
        rect(376, 8, 190, 290,10);
        }//Score Board
        fill(0);
        textSize(20);
        text("HIGH SCORES",471,20);
        textAlign(CORNER,CENTER);
        text("In order to get your scores posted, please \nplace your high score inside the \nTips & Thanks section. \nScores higher than 100 must \nhave proof in a spin off please. \nOnly requirement is to be honest!", 10, 80);
        var x = 380;
            textSize(14);
            text("GameChief999 - 126,",x,60);
            text("bc19taylor - 60,",x,75);
            text("Ranch - 57",x, 90);
            text("Aj Pfeil - 48,",x,105);
            text("Nicholas Campbell - 35,",x,120);
            text("Houston - 28,",x,135);
            text("Sharuman - 5,",x,150);
        menuBtn.draw();
        playBtn2.draw();
    };
    }//SCENES
    {
    // game initialization
    initPipe();     // images
    pipes.push(
        new Pipe(600 , random(179,250), random(90,130)),
        new Pipe(950, random(176,250), random(90,130))
    );}//PIPE DRAW
    {
    mouseClicked = function(){
        switch(screen){
            case 0: // playing
                break;
            case 1: // menu screen
                if(playBtn.mouseInside()){
                    playBtn.handleClick();
                }
                else if(howToBtn.mouseInside()){
                    howToBtn.handleClick();
                    howTo();
                }
                else if(creditBtn.mouseInside()){
                    creditBtn.handleClick();
                    credits();
                }
                else if(NewBtn.mouseInside()){
                    NewBtn.handleClick();
                    whatsNew();
                }
                else if(highScoreBtn.mouseInside()){
                    highScoreBtn.handleClick();
                    highScore();
                }
                break;
            case 2: // how to screen
                if(menuBtn.mouseInside()){
                    menuBtn.handleClick();
                    menu();
                }
                else if(playBtn2.mouseInside()){
                    playBtn2.handleClick();
                }
                break;
            case 3: // credits screen
                if(backBtn.mouseInside()){
                    backBtn.handleClick();
                    Program.restart();
                }
                break;
            case 4: // game over screen
                if(replayBtn.mouseInside()){
                    replayBtn.handleClick();
                }
                else if(diedMenuBtn.mouseInside()){
                    diedMenuBtn.handleClick();
                    Program.restart();
                }
                break;
            case 5: // whats new screen
                if(backBtn.mouseInside()){
                    backBtn.handleClick();
                    Program.restart();
                }
                break;
            case 6: // high scores screen
                if(menuBtn.mouseInside()){
                    menuBtn.handleClick();
                    Program.restart();
                }
                else if(playBtn2.mouseInside()){
                    playBtn2.handleClick();
                }
                break;
            default:
                break;
        }
        if(screen===3&&mouseX>80&&mouseX<145&&mouseY>350&&mouseY<375){
            println("     Houston @ \n https://www.khanacademy.org/profile/Qnypbxv/ \n\n     GameChief999 @ \n https://www.khanacademy.org/profile/GameChief999/ \n\n     Eddie @ \n https://www.khanacademy.org/profile/EddieKrystowski/ \n\n     Christina Olson @ \n https://www.khanacademy.org/profile/TTrina/ \n\n     1001programmer1001 @ \n https://www.khanacademy.org/profile/programmer1001/ \n\n     Larry Serflaten @ \n https://www.khanacademy.org/profile/LarrySerflaten/ \n\n     ScusX @ \n https://www.khanacademy.org/profile/GiantScus/");
        }
    };
    menu();
    draw = function() {
        
        if(screen === 1){menu();}
        if(screen === 2){howTo();}
        if(screen === 3){credits();}
        if(screen === 4){gameOver();}
        if(screen === 5){whatsNew();}
        if(screen === 6){highScore();}
        if(started === true){
            backdrop();
            flappySize = 2;
            movePipes();
            {
        noStroke();
        fill(0, 255, 0);
        rect(-1, 390, 601, 5);
        fill(74, 48, 4);
        rect(-1, 395, 601, 5);}//GROUND
            player.draw();
            {
        stroke(247, 255, 0,120);
        strokeWeight(3);
        fill(255, 209, 59,100);
        rect(0,10,120,50);
        noStroke();
        fill(0, 0, 0,90);
        textAlign(CENTER, CENTER);
        textSize(24);
        text("Your Score", 60, 23);
        fill(21, 0, 255);
        text("Your Score",58,21);
        fill(0);
        text(score,60,45);}//Score box
            cspeed = 0.8;
            bspeed = 0.3;
        }
        if(player.y >= 380){
            playSound(getSound("rpg/hit-clop"));
            playerAlive = false;
            player.jumped = false;
            player.y = 366;
            player.x = 219;
            player.UP = -91;
            speed = 0;
        }
        if(playerAlive === false){
            gameOver();
            cspeed = 0;
            bspeed = 0;
        }
        if(cx <= - 584){
            cx = 700;
        }
    };}//CLICKITY CLICK DRAW
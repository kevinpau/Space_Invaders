/* This file defines variables and user controls 
NOTE: some of the variables used other js files are dependent, thats why they
are pre-defined and then re-defined in the start functions
*/ 

/* 
This game is based on a youtube tutorial https://www.youtube.com/watch?v=biN3v3ef-Y0
and the p5.js library https://p5js.org/
*/

/*      GLOBAL VARIABLES
Global Variables to be replaced by database table
Variable values change based on users game preferance

param definitions
@param shipSpeed - speed the ship moves, based on left/right arrows  
@param alienSpeed - speed the aliens move, database value
@param bulletSpeed - speed the bullets move, database value
@param alienBulletSpeed - speed the bullets move, database value (maybe)
*/
var shipSpeed, alienSpeed, bulletSpeed, alienBulletSpeed;

// temp values
shipSpeed = 5;
bulletSpeed = 5;
alienSpeed = 1;
alienBulletSpeed = 5

/*      OTHER VARIABLES
@param points - track users score
@param start - bool value to track start/stop of game
@param edge - bool value to alien position
@param level - change some game play as it cycles
@param bulletSize - size of bullets
@param alienBulletSize - size of bullets
@param alienBulletFreq - frequency bullets are created
 */
var points = 0;
var started = false;
var edge = false;
var level = 1;
var bulletSize = 5;
var alienBulletSize = 5;
var shipLives = 5;
var alienBulletFreq = 100;
var shiftDownRate = 10;

/*     MAIN OBJECTS
@param ship - user playable
@param aliensRowx - alien array
@param bullets - bullet array (user controled)
@param alienBullets - alien bullet array (user controled)
@param city - city
*/
var ship;                                   
var aliensRow1 = [];
var aliensRow2 = [];
var aliensRow3 = [];                        
var bullets = [];
var alienBullets = [];
var cityArray = [];

/*     IMAGES
Require a local server to load
*/ 
var alienImg;
var shipImg;  

/*      SHIP MOVEMENT & Bullets
Keys registered are based on the p5.js library
See https://p5js.org/reference/#/p5/keyPressed for examples
*/

function keyPressed() {
/*        SHIP MOVEMENT         */
/*      move left or right      */  
    if (keyCode === RIGHT_ARROW) {
        ship.setDir(1);
    } else if (keyCode === LEFT_ARROW) {
        ship.setDir(-1);
    }
/*       Bullets        */
/* creates a new bullet object */
    if (key === ' ') {
        var bullet = new Bullet(ship.x, height-60);
        bullets.push(bullet);
    }
}

/*stop the ship when key is released*/  
function keyReleased() {  
    if (key != ' ') {
        ship.setDir(0);
    }
}

/********************* START STOP BUTTONS *********************/
window.onload = function() {
    document.getElementById("startGameEasy").onclick = startGameEasy;
    document.getElementById("startGameHard").onclick = startGameHard;
    document.getElementById("stopGame").onclick = stopGame;    
}

function startGameEasy() {
    document.getElementById("startGameEasy").blur();
    // new alien objects
    moreAliens();

    //set parameters
    shipSpeed = 5;
    alienSpeed = 2;
    bulletSpeed = 5;
    alienBulletSpeed = 3;

    points = 0;
    level = 1;
    bulletSize = 5;
    alienBulletSize = 5;
    shipLives = 5;
    alienBulletFreq = 100;
    shiftDownRate = 10;

    edge = false;

    //delete stray bullets
    bullets = [];
    alienBullets = [];

    // new city objects
    createCity();
    // activate draw        
    loop();
}

function startGameHard() {
    document.getElementById("startGameHard").blur();
    // new alien objects
    moreAliens();

    //set parameters
    shipSpeed = 5;
    alienSpeed = 2.5;
    bulletSpeed = 5;
    alienBulletSpeed = 3;

    points = 0;
    level = 1;
    bulletSize = 5;
    alienBulletSize = 5;
    shipLives = 4;
    alienBulletFreq = 80;
    shiftDownRate = 20;

    edge = false;

    //delete stray bullets
    bullets = [];
    alienBullets = [];

    // new city objects
    createCity();
    // activate draw        
    loop();
}

function stopGame() {
    document.getElementById("stopGame").blur();
    // end game
    noLoop();
    finalScore();
}
/********************* END START STOP BUTTONS *********************/

/********************* TEXT @ TOP *********************/
    /* text() function is based on the p5.js library 
    See https://p5js.org/reference/#/p5/text for examples
    */ 
    function updateScore() {
        fill(255);
        textSize(30);
        textAlign(CENTER);
        text("Level: " + level + " Lives: " + shipLives + "  Score: " + points, 10, 5, 600, 100);       
    }

    function finalScore() {
        background(51);
        fill(255);
        textSize(30);
        textAlign(CENTER);
        text("Aliens have successfully invaded...", 10, 5, 600, 100);
        text("Final Score: " + points, 10, 40, 600, 100);         
    }

/********************* TEXT @ TOP *********************/
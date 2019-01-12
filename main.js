/* This file sets up some initial parameters and calls most functions
    from the other js files
 */                          

/* preload() function is based on the p5.js library
recommended function to load images - requires local server 
See https://p5js.org/reference/#/p5/preload for examples
*/ 
function preload() {
    alienImg = loadImage('images/alien.png');
    shipImg = loadImage('images/ship1.png');
}

/* setup() function is based on the p5.js library
setup is only called once - used to set initial parameters 
See https://p5js.org/reference/#/p5/setup for examples
*/ 
/********************* SETUP *********************/
function setup() {
    var canvas = createCanvas(600, 800);
    /* .parent is used to position the canvas
    See https://github.com/processing/p5.js/wiki/Positioning-your-canvas
    */
    canvas.parent('canvas');

    // new ship object
    ship = new Ship();

    // default to not loop
    noLoop();                          
}
/********************* END SETUP *********************/

/* draw() function is based on the p5.js library
draw continuously executes, thats why no update loop is required  
See https://p5js.org/reference/#/p5/draw for examples
*/ 

/********************* DRAW *********************/
function draw() {
    background(51); //canvas color

    //score - see user_inputs.js
    updateScore();

    //show cities
    for (var i = 0; i < cityArray.length; i++) {
        cityArray[i].show();
    }

    // draw/move bullets
    for (var i = 0; i < bullets.length; i++) {
     bullets[i].show();
     bullets[i].move();
                    

     /********************* CHECK BULLET TO ALIEN Collision *********************/
     for (var j = 0; j < aliensRow1.length; j++) {
         checkHit(aliensRow1, j);
     }
     for (var j = 0; j < aliensRow2.length; j++) {
         checkHit(aliensRow2, j);
     }
     for (var j = 0; j < aliensRow3.length; j++) {
         checkHit(aliensRow3, j);
     }

     // see bullets.js & aliens.js
     function checkHit(aliens, num) {
         if (bullets[i].hits(aliens[num])) {
             aliens[num].shrink();
             bullets[i].directHit();
         }
     }
     /********************* END CHECK BULLET TO ALIEN Collision *********************/
        // delete bullets out of bounds - see bullets.js
        if (bullets[i].y < 0) {
            bullets[i].out();
        }
    }

    //draw/move ship - see ship.js
    ship.show();                                    
    ship.move();

    /********************* CHECK EDGE *********************/

    // check aliens - edge needs to be reset everytime
    edge = false;
    for (var i = 0; i < aliensRow1.length; i++) {
        moveAlien(aliensRow1, i);
    }
    for (var i = 0; i < aliensRow2.length; i++) {
        moveAlien(aliensRow2, i);
    }
    for (var i = 0; i < aliensRow3.length; i++) {
        moveAlien(aliensRow3, i);
    }

    // draw/move aliens - see aliens.js
    function moveAlien(aliens, num) {
        aliens[num].show();
        aliens[num].move();
        if (aliens[num].x + aliens[num].w > width || aliens[num].x < 0) {
                edge = true;
        }

        //check if game over by alien conquest
        alienPos(aliens, num);
    }

    // shift aliens down when edge hit
    if(edge) {
        for (var i = 0; i < aliensRow1.length; i++) {
            aliensRow1[i].shiftDown();
        }
        for (var i = 0; i < aliensRow2.length; i++) {
            aliensRow2[i].shiftDown();
        } 
        for (var i = 0; i < aliensRow3.length; i++) {
            aliensRow3[i].shiftDown();
        }    
    }

    // check ship - see ship.js
    if (ship.x + 15 > width || ship.x - 15 < 0) {
        ship.stop();
    }
    /********************* END CHECK EDGE *********************/

    /********************* DELETE ARRAY ITEMS *********************/
    // functions to delete bullets array item
    for (var i = bullets.length - 1; i >= 0; i--) {
        if (bullets[i].toDelete) {
            bullets.splice(i, 1);
        }
    }

    for (var i = 0; i < aliensRow1.length; i++) {
        delAlien(aliensRow1, i);
    }
    for (var i = 0; i < aliensRow2.length; i++) {
        delAlien(aliensRow2, i);
    }
    for (var i = 0; i < aliensRow3.length; i++) {
        delAlien(aliensRow3, i);
    }

    function delAlien(aliens, num) {
        if (aliens[num].toDelete) {
            aliens.splice(num, 1);
        }
    }
    /********************* END DELETE ARRAY ITEMS *********************/

    /********************* CREATE ALIEN BULLETS *********************/
    var alienShoot =  false;
    // determines if alien shoots - see alien_bullets.js
    alienShoot = alienShootBullet();

    // creates alien bullets - see alien_bullets.js
    if (alienShoot) {
        alienShootsBullet(); 
    }
    /********************* END CREATE ALIEN BULLETS *********************/

    // draw/move alien bullets
    for (var i = 0; i < alienBullets.length; i++) {
        // prevent crash
        if (alienBullets[i]) {
            alienBullets[i].show();
            alienBullets[i].move();
        }

    /********************* CHECK ALIEN BULLET TO CITY/SHIP/bullet Collision *********************/
        //check if city is hit
        for (var j = 0; j < cityArray.length; j++) {
            if (alienBullets[i].hitsCity(cityArray[j])) {
                cityArray[j].shrink();
                alienBullets[i].directHit(); // add delete 
            }
        }

        // check if ship is hit
        if (alienBullets[i].hitsShip(ship)) {
            ship.stop();
            alienBullets[i].directHit();
        }
        
        // check if bullets are out of bounces
        if (alienBullets[i].y > height) {
            alienBullets[i].out();
        }

        for (var j = 0; j < bullets.length; j++) {
            if (alienBullets[i].hitsBullet(bullets[j])) {
                bullets[j].directHit();
                alienBullets[i].directHit();
            }
        }

    /********************* END ALIEN BULLET TO CITY/SHIP/bullet Collision *********************/   
    } // end show/move alien bullets

    /********************* DELETE ALIEN BULLET *********************/
    for (var i = alienBullets.length - 1; i >= 0; i--) {
        if (alienBullets[i].toDelete) {
            alienBullets.splice(i, 1);
        }
    }
    /********************* DELETE ALIEN BULLET *********************/

    /********************* DELETE CITY *********************/
    for (var i = cityArray.length - 1; i >= 0; i--) {
        if (cityArray[i].toDelete) {
            cityArray.splice(i, 1);
        }
    }
    /********************* DELETE CITY *********************/


    /********************* CALL REINFORCEMENTS *********************/
    if (aliensRow3.length < 1 && aliensRow2.length < 1 && aliensRow1.length < 1) {
        // increase level
        level++;
        // more aliens
        moreAliens();

        if (level <= 3) {
            // they're angry now 
            alienSpeed *= 1.4;
            // give the user a fighting chance
            shipSpeed *= 1.1;
            bulletSpeed *= 1.1;
            //point bonus
            points += 100;

            //increase alien firerate
            if (alienBulletFreq > 10) {
                alienBulletFreq -= 5;    
            }
        }
        // Humanity will prevail 
        else if (level <= 6) {
            alienSpeed *= 1.1; // if the speed is too high you can't hit them
            shipSpeed *= 1.2;
            bulletSpeed *= 1.2;
            bulletSize = 6;
            points += 400;

            if (alienBulletFreq > 10) {
                alienBulletFreq -= 5;    
            }
        }
        // or not ..
        else if (level > 6) {
            alienSpeed *= 1.05;
            shipSpeed *= 1.1;
            bulletSpeed *= 1.1;
            bulletSize = 6;
            points += 800;

            if (alienBulletFreq > 10) {
                alienBulletFreq -= 5;    
            }            
        }        
    }
    /********************* END CALL REINFORCEMENTS *********************/

    /********************* CHECK IF GAME IS OVER *********************/

    // Check if aliens are too low on the canvas
    function alienPos(aliens, num) {
        // first check if city exist
        if (cityArray.length > 0) {
            if (aliens[num].y + aliens[num].h + 70 > height) {
                gameOver();
            }
        }
        if (aliens[num].y + aliens[num].h > height - ship.shipH/2) {
            gameOver();
        }
    }

    // if out of lives
    if (shipLives < 1) {
        gameOver();
    }

    // ch aliens - see aliens.js
    function gameOver(aliens, num) {
        stopGame();
        finalScore();
    }
    /********************* CHECK IF GAME IS OVER *********************/

}
/********************* END DRAW *********************/
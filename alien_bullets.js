/* This file defines the alien bullets object and bullet related functions - almost identical to bullets.js */ 

/********************* ALIENBULLET OBJECT *********************/
function AliensBullet(x, y) {
    // x, y coordinate values
    this.x = x;           
    this.y = y;
    this.r = alienBulletSize;   // radius 
    this.toDelete = false; // hold to remove bullet when they make a hit

    /*function to show bullets
    shaped based on p5.js library
    See https://p5js.org/reference/#/p5/ellipse for examples
    */
    this.show = function() {
        noStroke();
        fill(150, 0, 255);           
        ellipse(this.x, this.y, this.r*2, this.r*2);
    }

    // reaction to hit - boolean flag
    this.directHit = function() {
        this.toDelete = true;
    }

    /* dist() function is based on the p5.js library     
    See https://p5js.org/reference/#/p5/dist for examples
    */

    // check for collision   
    this.hitsShip = function(ship) {
        // check the distance
        //var distance = dist(this.x, this.y, ship.x + ship.shipW/2, ship.y + ship.shipH/2);
        var distance = dist(this.x, this.y, ship.x, ship.y + ship.shipH/2);
        if (distance < this.r + ship.shipW/2) {
            shipLives -= 1;
            return true;
        } else {
            return false;
        }
    }
    

    this.hitsCity = function(city) {
        // check the distance
        var distance = dist(this.x, this.y, city.x + city.w/2, city.y + city.h);
        if (distance < this.r + city.w/2) {
            return true;
        } else {
            return false;
        }
    }

    this.hitsBullet = function(bullet) {
        // check the distance
        var distance = dist(this.x, this.y, bullet.x, bullet.y);
        if (distance < this.r + bullet.r) {
            return true;
        } else {
            return false;
        }
    }         

    // secondary flag to delete the bullet if off screen
    this.out = function() {
        this.toDelete = true;
    }

    // function to move the bullets
    this.move = function() {
        this.y = this.y + alienBulletSpeed;
    }
}
/********************* END ALIENBULLET OBJECT *********************/

/********************* CHECK IF ALIENSHOOT *********************/
function alienShootBullet() {
    // create a random number 1- 100 - this should be a variable to control frequency
    var rand = Math.floor((Math.random() * alienBulletFreq) + 1); 

    if (rand == 10) {
        return true;
    } else {
        return false;
    }
}
/********************* END CHECK IF ALIENSHOOT *********************/

/********************* CHECK WHICH ALIEN SHOOTS *********************/
function alienShootsBullet() {
    // create a random number 1, 2, 3 (for alien row)
    var randAlienRow = Math.floor((Math.random() * 3) + 1);

    var randAlien; // random alien in array
    var alienBullet; // bullet 

    if (randAlienRow == 1) {
        randAlien = Math.floor(Math.random() * aliensRow1.length);
        addAlienBullets(aliensRow1, randAlien);
    }
    if (randAlienRow == 2) {
        randAlien = Math.floor(Math.random() * aliensRow2.length);
        addAlienBullets(aliensRow2, randAlien);
    }
    if (randAlienRow == 3) {
        randAlien = Math.floor(Math.random() * aliensRow3.length);
        addAlienBullets(aliensRow3, randAlien);
    }

    function addAlienBullets(aliens, num) {
        // prevent crash
        if (aliens[num]) {
            alienBullet = new AliensBullet(aliens[num].x + aliens[num].w/2, aliens[num].y + aliens[num].h);
            alienBullets.push(alienBullet);
        }
    }
}
/********************* CHECK WHICH ALIEN SHOOTS *********************/
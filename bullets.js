/* This file defines the bullets object and bullet related functions */ 

/********************* BULLET OBJECT *********************/
function Bullet(x, y){
    // x, y coordinate values
    this.x = x;           
    this.y = y;
    this.r = bulletSize;   // radius 
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
    this.hits = function(alien) {
        // check the distance
        var distance = dist(this.x, this.y, alien.x + alien.w/2, alien.y);
        if (distance < this.r + alien.w/2) {
            points += 10;
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
        this.y = this.y - bulletSpeed;
    }
}
/********************* END BULLET OBJECT *********************/

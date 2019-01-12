/* This file defines the alien object and alien related functions */ 

/********************* ALIEN OBJECT *********************/
function Alien(x, y){
    // x, y coordinate values
    this.x = x;           
    this.y = y;
    this.w = 81;    // (648/8) orig width
    this.h = 43.5;  //( 348/8) orig height
    this.s = shiftDownRate;    // shift down rate

    this.toDelete = false; // hold to remove when destroyed
    this.xdir = 1;

    // reduce size after being hit - boolean flag
    this.shrink = function() {
        // destroyed after 3 hits unless level high enough
        if (this.w <= 50 && level <= 3){
            this.toDelete = true;
        } else if (this.w <= 61 && level >= 4) {
            this.toDelete = true;
        }

        this.w = this.w * (3/4);
        this.h = this.h * (3/4);
    }

    // moves the aliens down
    this.shiftDown = function() {
        this.xdir *= -1;
        this.y += this.s;
    }

    // moves the aliens along the x-axis
    this.move = function() {
        this.x = this.x + this.xdir * alienSpeed;
    }

    /* function to show aliens
    alien image - based on p5.js library
    See https://p5js.org/reference/#/p5/image for examples
    */
    this.show = function() {
        image(alienImg, this.x, this.y, this.w, this.h);
    }
}
/********************* END ALIEN OBJECT *********************/

/********************* CREATE ALIEN OBJECT *********************/
/* 
Create alien objects when none exist - endless alien invation muhahah
x coordinate calculated by trial and error
y coordinate based on height of images
3 seperatre arrays are used to avoid issues w/ 2d arrays, specifically array.splice()
*/
function moreAliens() {
    for (var i = 0; i < 6; i++) {  
        aliensRow1[i] = new Alien(i*80+40, 45);
        aliensRow2[i] = new Alien(i*80+40, 90);
        aliensRow3[i] = new Alien(i*80+40, 135);
    }
}
/********************* END CREATE ALIEN OBJECT *********************/

/* This file defines the ship object and ship related functions */ 

/********************* SHIP OBJECT *********************/
function Ship() {
    //initial position
    this.x = width/2;
    this.y = height;
    this.xdir = 0;

    this.shipW = 103;
    this.shipH = 68;

    /* ship image - based on p5.js library
    See https://p5js.org/reference/#/p5/image for examples
    */
    this.show = function() {
        image(shipImg, this.x - this.shipW/2, this.y - 50, this.shipW, this.shipH);
    }

    /*set the direction of the ship
    values come from arrow key inputs
    1 = right, -1 = left
    see user_inputs.js 
    */
    this.setDir = function(dir) {
        this.xdir = dir;
    }

    // move the ship & rate of movement (shipSpeed)
    this.move = function(dir) {
        this.x += this.xdir * shipSpeed;
    }

    this.stop = function() {
        this.xdir = 0;
    }
}
/********************* END SHIP OBJECT *********************/
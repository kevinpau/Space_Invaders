/* This file defines the city objects and city related functions */ 

/********************* CITY OBJECT *********************/
function City(x, y) {
    // x, y coordinate values
    this.x = x;           
    this.y = y;
    this.w = 60;
    this.h = 20;

    this.toDelete = false; // hold to remove when destroyed

    // reduce size after being hit - boolean flag
    this.shrink = function() {
        // destroyed after 6 hits unless level high enough
        if (this.w <= 21 ){
            this.toDelete = true;
        } 

        this.w = this.w * (5/6);
        this.h = this.h * (5/6);
    }

    /* function to show aliens
    alien image - based on p5.js library
    See https://p5js.org/reference/#/p5/image for examples
    */
    this.show = function() {
        fill('rgb(0,255,0)');
        noStroke();
        rect(this.x, this.y, this.w, this.h);
    }
}
/********************* END CITY OBJECT *********************/

/********************* CREATE CITY *********************/
function createCity() {
    var x = 40;
    var y = 720;
    // 4 cities
    for (var i = 0; i < 4; i++) {
        var city = new City(x, y);
        cityArray.push(city);
        x += 150;
    }
}
/********************* CREATE CITY *********************/

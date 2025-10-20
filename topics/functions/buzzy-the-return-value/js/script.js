/**
 * Buzzy the return value
 * Pippin Barr
 * 
 * Two flies that buzz around on the canvas
 */

"use strict";

// Our flies that will buzz around
let buzzyTheFly = undefined;
let jazzyTheFly = undefined;
let jacuzziTheFly = undefined;


/**
 * Create a canvas and setup our flies
 */
function setup() {
    createCanvas(400, 400);

    // A pretty calm fly
    buzzyTheFly = createFly(2);
    // A not calm fly
    jazzyTheFly = createFly(10);
    // A bubbly fly
    jacuzziTheFly = createFly(30);
}

/**
 * Creates a fly object with randomized position, default size, 
 * and provided buzziness
 */
function createFly(buzziness) {
    const fly = {
        // Position (random)
        x: random(0, width),
        y: random(0, height),
        // Size (default)
        size: 30,
        // How much to move per frame (parameter)
        buzziness: buzziness
    };
    return fly;
}

/**
 * Background, move and draw buzzy
 */
function draw() {
    background("#87ceeb");

    moveFly(buzzyTheFly);
    moveFly(jazzyTheFly);
    moveFly(jacuzziTheFly);

    drawFly(buzzyTheFly);
    drawFly(jazzyTheFly);
    drawFly(jacuzziTheFly);
}

/**
 * Move the fly passed in by updating its position
 */
function moveFly(fly) {
    fly.x += random(-fly.buzziness, fly.buzziness);
    fly.y += random(-fly.buzziness, fly.buzziness);
}

/**
 * Draw the fly passed in using its properties
 */
function drawFly(fly) {
    push();
    noStroke();
    fill(0);
    ellipse(fly.x, fly.y, fly.size);
    pop();
}
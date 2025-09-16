/**
 * Introducing Variables
 * Philippe Beauchemin
 * 
 * Simple experimentation to try out variables.
 */

"use strict";

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    // Create the canvas
    createCanvas(480, 480);
}

function draw() {
    background(0);
    
    // Draw a circle in the centre of the canvas
    push();
    noStroke();
    // the circle changes colour when we move the mouse
    fill(mouseX, mouseY, 0);
    ellipse(width/2, height/2, 100, 100);
    pop();
}
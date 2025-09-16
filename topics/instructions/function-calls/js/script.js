/**
 * Sailboat
 * Philippe Beauchemin
 * 
 * A view from above of a boat out at sea on the Atlantic, 
 * meant to emulate in very little detail the Romantic depiction 
 * of nature as an overpowering force to be reckoned with. 
 * The striking visual contrast between the size of the boat 
 * and its surroundings is meant to provoke a feeling of the Sublime.
 * 
 * * Uses:
 * p5.js
 * https://p5js.org/
 */

"use strict";

/**
 * Create a 900x500 horizontal canvas to draw our landscape
*/
function setup() {
    createCanvas(900, 500);
}


/**
 * Draws the sea and the boat
*/
function draw() {
    // The Atlantic
    background(50, 50, 255);
    // The sailboat
    rect(100, 100, 30, 70);
}
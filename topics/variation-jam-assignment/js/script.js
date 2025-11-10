/**
 * Variation Jam
 * Philippe Beauchemin
 * 
 * Variation menu example:
 * A relatively simple example of a set of variations within a single
 * project. (When we learn Object-Oriented Programming this will be a
 * LOT easier.)
 */

"use strict";

let state = "menu";

/**
 * Create the canvas
*/
function setup() {
    createCanvas(640, 480);
}


/**
 * Display the menu or the current variation
*/
function draw() {
    switch (state) {
        case "menu":
            menuDraw();
            break;
        case "eden-variation":
            edenDraw();
            break
        case "paradise-variation":
            paradiseDraw();
            break;
        case "hell-variation":
            hellDraw();
            break;
    }
}

/**
 * Listen for mouse pressed and call the function for it in the
 * current state
 */
function mousePressed() {
    switch (state) {
        case "menu":
            menuMousePressed();
            break;
        case "eden-variation":
            edenMousePressed();
            break
        case "paradise-variation":
            paradiseMousePressed();
            break;
        case "hell-variation":
            hellMousePressed();
            break;
    }
}
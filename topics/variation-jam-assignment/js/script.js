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

// A variable for our frog models
let frogData;
// A variable for our frog
let frog;
// A variable for our fly models
let flyData;
// A variable for our button models
let buttonData;

function preload() {
    frogData = loadJSON("assets/data/frog.json");
    flyData = loadJSON("assets/data/fly.json");
    buttonData = loadJSON("assets/data/button.json");

    menuPreload();
}

/**
 * Create the canvas
*/
function setup() {
    createCanvas(640, 480);
    menuSetup();
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
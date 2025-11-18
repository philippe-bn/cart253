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
// A variable for a fly
let fly;
// A variable for our button models
let buttonData;
// A variable for our names array
let namesData;
// A variable for our names
let names;

/**
 * Our array containing our future flies
 */
let flies = [];

function preload() {
    frogData = loadJSON("assets/data/frog.json");
    flyData = loadJSON("assets/data/fly.json");
    buttonData = loadJSON("assets/data/button.json");
    namesData = loadJSON("assets/data/names.json");

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

/**
 * Create a fly based on a fly model with a specific speed and name and returns it
 */
function createFly(speed, name) {
    const newFly = structuredClone(flyData.fly);
    newFly.y = random(0, height);
    newFly.b = random(150, 400);
    newFly.size = random(5, 10);
    newFly.speed = speed;
    newFly.name = name;
    return newFly;
}

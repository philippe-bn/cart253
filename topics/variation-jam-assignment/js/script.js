/**
 * Variation Jam
 * Philippe Beauchemin
 * 
 * A game with different variations
 * 
 * Made with p5
 * https://p5js.org/
 * Keyboard pictures by Julia Bellone : https://juliabellone.github.io/Arkanoid/ 
 * Timer help by user T.J. Crowder on Stack Overflow: https://stackoverflow.com/questions/5978519/how-can-i-use-setinterval-and-clearinterval
 * Overlap code taken from Pippin Barr's CART253 repository: https://pippinbarr.com/cart253/assignments/challenges/functions/
 * Variation menu example taken from Pippin Barr's examples.
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

/**
 * Create a button based on a button model with a specific y position, width and text and returns it
 */
function createPersonalizedButton(y, w, text) {
    const newButton = structuredClone(buttonData);
    newButton.y = y;
    newButton.w = w;
    newButton.text = text;
    return newButton;
}

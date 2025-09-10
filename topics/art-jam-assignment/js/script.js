/**
 * Self Portrait
 * Philippe Beauchemin
 * 
 * A creative self portrait.
 * 
 * Uses:
 * p5.js
 * https://p5js.org/
 */

"use strict";

/**
 * Creates the canvas
 */
function setup() {
    // A rectangular canvas to work with
    createCanvas(640, 700);
}

/**
 * Draws the portrait
 */
function draw() {
    // A background
    background('#C2F858');

    drawBody();

function drawBody() {
    drawHead();
    drawChest();

function drawHead() {
    drawHeadOutline();
    drawFace();
    drawHair();

function drawHeadOutline() {
    push();
    fill('#FFD6C5');
    noStroke();
    ellipse(400, 350, 200, 250);
    pop();
}
function drawFace() {
    drawSmile();
    //drawEyes();



function drawSmile() {
    push();
    fill(255);
    noStroke();
    bezier(350, 400, 400, 440, 420, 420, 450, 400);
    pop();
}
}

function drawHair() {
    push();
    fill('#B3654C');
    noStroke();
    ellipse(400, 225, 75);
    ellipse(375, 230, 75);
}
}

function drawChest() {
    push();
    fill(0);
    noStroke();
    ellipse(400, 685, 300, 400);
}
}
}

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
    drawChest();
    drawNeck();
    drawHead();
    drawArm();
    
function drawChest() {
    // Black T-shirt
    push();
    fill(40);
    noStroke();
    ellipse(400, 685, 290, 400);
}

function drawNeck() {
    push();
    fill('#FFD6C5');
    noStroke();
    ellipse(400, 490, 80, 100);
    pop();
}

function drawHead() {
    drawHeadOutline();
    drawFace();
    drawHair();

function drawHeadOutline() {
    push();
    fill('#feded1ff');
    noStroke();
    ellipse(400, 350, 200, 250);
    pop();
}
function drawFace() {
    drawSmile();
    drawEyes();
    drawNose();
    //drawEyebrows();

function drawSmile() {
    push();
    fill(255);
    noStroke();
    bezier(350, 400, 400, 440, 420, 420, 450, 400);
    pop();
}

function drawEyes() {
    push();
    fill(255);
    //Whites
    ellipse(370, 340, 30);
    ellipse(425, 340, 30);
    pop();
    //Pupils
    push();
    fill(0);
    ellipse(370, 340, 12);
    ellipse(425, 340, 12);
    pop();
}

function drawNose() {
    push();
    noFill();
    stroke(0);
    line(395, 350, 390, 370);
    bezier(390, 370, 390, 380, 400, 380, 400, 380)
    pop();
}

// function drawEyebrows() {
//     push();
//     fill(0);
//     //arc?
//     pop();
// }
}

function drawHair() {
    push();
    fill('#B3654C');
    noStroke();
    //Big curls
    ellipse(400, 235, 75);
    ellipse(375, 240, 75);
    ellipse(370, 260, 75);
    ellipse(425, 245, 75);
    ellipse(445, 255, 55);
    //Small curls
    ellipse(305, 290, 40);
    ellipse(335, 250, 45);
    ellipse(325, 270, 45);
    ellipse(330, 290, 45);
    ellipse(300, 300, 35);
    ellipse(470, 280, 45);
    ellipse(455, 275, 45);
    pop();
}
}
}

function drawArm() {
    // T-shirt sleeve
    push();
    fill(40);
    rect(230, 500, 120, 70)
    pop();
}
}

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

// Create an elbow object
let elbow= {
    x: 130,
    y: 560
}

// Create a forearm object
let forearm= {
    x: 0,
    y: -160
} 

// Angle for the forearm
let angle = 0;

/**
 * Creates the canvas
 */
function setup() {
    // A rectangular canvas to work with
    createCanvas(640, 700);
    angle = mouseX * -1;
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
    rect(290, 490, 220, 300, 35);
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
    drawEyebrows();

function drawSmile() {
    push();
    fill(255);
    noStroke();
    bezier(350, 400, 400, 440, 420, 420, 450, 400);
    pop();
}

function drawEyes() {
    //Whites
    push();
    fill(255);
    ellipse(370, 340, 27);
    ellipse(425, 340, 27);
    pop();
    //Irises
    push();
    fill(0, 0, 255);
    ellipse(370, 340, 14);
    ellipse(425, 340, 14);
    pop();
    //Pupils
    push();
    fill(0);
    ellipse(370, 340, 6);
    ellipse(425, 340, 6);
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

function drawEyebrows() {
    push();
    noFill();
    strokeWeight(5);
    stroke('#704030ff');
    bezier(350, 320, 360, 315, 360, 310, 380, 315)
    bezier(445, 320, 435, 315, 435, 310, 415, 315)
    pop();
}
}

function drawHair() {
    push();
    fill('#B3654C');
    noStroke();
    //Big curls
    ellipse(400, 240, 75);
    ellipse(375, 245, 75);
    ellipse(370, 265, 75);
    ellipse(425, 250, 75);
    ellipse(445, 260, 55);
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
    // Arm
    push();
    fill('#FFD6C5');
    noStroke();
    quad(elbow.x, elbow.y, elbow.x+100, elbow.y, elbow.x+100, elbow.y-60, elbow.x+20, elbow.y-60);
    pop();
    // Forearm, hand and fingers
    push();
    fill('#FFD6C5');
    noStroke();
        // Trying out a new function (I've used this last year but I did not remember how to use it) - this makes the center become the elbow
        translate(elbow.x, elbow.y);
        // Same goes for rotate - this allows me to rotate around the elbow
        rotate(angle);
        // Trying to debug by mapping the mouseX position to fit the values I want for the angle - I have never used this function before but I have used this similar map/scale in Max MSP
        angle = map(mouseX, 0, 640, -19.5, -18.6);
        angle = constrain(angle, -19.5, -18.6);
        // 0 is elbow.x, I draw the forearm from the side of the wrist above it (forearm.x = 0, so forearm.x is actually 130 at first, forearm.y = -160, so forearm.y is actually 400 at first)
        // Forearm
        quad(forearm.x, forearm.y, forearm.x+60, forearm.y, forearm.x+60, forearm.y+140, forearm.x, forearm.y+160);
        // Hand
        ellipse(forearm.x + 30, forearm.y - 30, 80);
        // Fingers
        ellipse(forearm.x, forearm.y - 50, 20, 100);
        ellipse(forearm.x + 20, forearm.y - 60, 20, 100);
        ellipse(forearm.x + 40, forearm.y - 65, 20, 100);
        ellipse(forearm.x + 60, forearm.y - 60, 20, 100);
        ellipse(forearm.x + 70, forearm.y - 30, 50, 20);
    pop();
}
}

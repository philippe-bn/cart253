/**
 * Frogfrogfrog (MODDED)
 * Pippin Barr, modded by Philippe Beauchemin
 * 
 * A modded game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    },
    // The frog's eyes have globes and pupils of a colour and size and each their own position
    eyes: {
        globes: {
            fill: "#FFFFFF",
            size: undefined
        },
        pupils: {
            fill: "#000000",
            size: undefined
        }
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
};

// Checks if the game is started
let gameStarted = "false";

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    // Give the fly its first random position
    resetFly();
}

function draw() {
    background("#87ceeb");

    drawMenu();
    launchGame();
}

/**
 * Draws a game menu
 */
function drawMenu() {
    if (gameStarted === "false") {
        // Start menu
        // Big frog body covering the screen
        drawFrog();
    }
}

function launchGame() {
    if (gameStarted === "true") {
        drawFly();
        moveFly();

        drawFrog();
        moveFrog();
        moveTongue();

        checkTongueFlyOverlap();
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue
    if (gameStarted === "true") {
        // Draw the tongue tip
        push();
        fill("#ff0000");
        noStroke();
        ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
        pop();

        // Draw the rest of the tongue
        push();
        stroke("#ff0000");
        strokeWeight(frog.tongue.size);
        line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
        pop();
    }

    // Draw the frog's body
    // In the start menu, the frog's body takes up the whole screen
    if (gameStarted === "false") {
        background("#00ff00");
    }
    // In the game, the frog's body is smaller
    else if (gameStarted === "true") {
        push();
        fill("#00ff00");
        noStroke();
        ellipse(frog.body.x, frog.body.y, frog.body.size);
        pop();
    }

    // Draw the frog's eyes
    if (gameStarted === "false") {
        // Eye whites
        push();
        noStroke();
        fill(frog.eyes.globes.fill);
        ellipse(width / 4, height - height / 2.5, 80);
        ellipse(width - width / 4, height - height / 2.5, 80);
        pop();
        // Pupils
        push();
        fill(frog.eyes.pupils.fill);
        ellipse(width / 4, height - height / 2.5, 65);
        ellipse(width - width / 4, height - height / 2.5, 65);
        pop();
    }


}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

/**
* Start the game (if it isn't started yet) and launch the tongue on click (if it's not launched yet)
*/
function mousePressed() {
    if (gameStarted === "false") {
        gameStarted = "true";
    }
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}
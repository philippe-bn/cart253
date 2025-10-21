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

// The background's fill
let bg = {
    fill: {
        r: 135,
        g: 206,
        b: 235
    }
}

// The fly population tracker
let population = 1;

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
        y: undefined,
        size: 80,
        globes: {
            fill: "#FFFFFF",
        },
        pupils: {
            fill: "#000000",
        },
        left: {
            x: undefined,
        },
        right: {
            x: undefined,
        }
    }
};

// The first fly
let eveTheFly = undefined;
// The other flies
let babyFly = undefined;
let evolvedFly = undefined;

// Checks if the game is started
let gameStarted = "false";

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    eveTheFly = createFly(2);
    babyFly = createFly(3);
    evolvedFly = createFly(4);

    // Give the flies their first random position
    resetFly(eveTheFly);
    resetFly(babyFly);
    resetFly(evolvedFly);
}

function draw() {
    drawMenu();
    launchGame();
    endGame();
}

/**
 * Draws a game menu
 */
function drawMenu() {
    if (gameStarted === "false" && population > 0) {
        // Start menu
        // Big frog body covering the screen
        drawFrog();
    }
}

/**
 * Launches the game if the mouse is pressed
 */
function launchGame() {
    if (gameStarted === "true") {
        background(bg.fill.r, bg.fill.g, bg.fill.b);

        drawFly(eveTheFly);
        moveFly(eveTheFly);

        if (population > 1) {
            drawFly(babyFly);
            moveFly(babyFly);
        }

        if (population > 2) {
            drawFly(evolvedFly);
            moveFly(evolvedFly);
        }

        drawFrog();
        moveFrog();
        moveTongue();

        checkTongueFlyOverlap(eveTheFly);
        checkTongueFlyOverlap(babyFly);
        checkTongueFlyOverlap(evolvedFly);

        // End the game when there are no flies left
        if (population < 1) {
            // wait 3 seconds and end the game
            // make a 3 seconds countdown here-
            gameStarted = "false";
        }
    }
}

function createFly(speed) {
    // Our flies
    // Have a position, size, speed of horizontal movement, and a distance from the parent fly when new flies are created
    const fly = {
        x: 0,
        y: random(0, 300),
        size: random(5, 10),
        speed: speed, // Will vary every iteration to be quicker and quicker
        spawn: 0
    };
    return fly;
}
/**
 * Draws the fly as a black circle
 */
function drawFly(fly) {
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
function moveFly(fly) {
    // Move the fly in a sinusoidal pattern across the screen
    fly.x += fly.speed;
    fly.y += 5 * sin(frameCount * 0.05);
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly(fly);
        population = population + 1;
    }
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly(fly) {
    fly.x = 0;
    fly.y = random(0, 300);
    fly.spawn = random(-100, 100);
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    drawFrogTongue();
    drawFrogBody();
    drawFrogEyes();
}

function drawFrogTongue() {
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
}

function drawFrogBody() {
    // Draw the frog's body
    // In the start menu, the frog's body takes up the whole screen
    if (gameStarted === "false" && population > 0) {
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
    // At the end of the game, the frog remains in its position as it starves
    else if (gameStarted === "false" && population === 0) {
        push();
        fill("#00ff00");
        noStroke();
        ellipse(frog.body.x, frog.body.y, frog.body.size);
        pop();
    }
}

function drawFrogEyes() {
    // Draw the frog's eyes
    // In the start menu, the frog's eyes are bigger to be proportional to the body
    if (gameStarted === "false") {
        // Eye whites
        push();
        noStroke();
        fill(frog.eyes.globes.fill);
        frog.eyes.y = height - height / 2.5;
        frog.eyes.left.x = width / 4;
        frog.eyes.right.x = width - width / 4;
        ellipse(frog.eyes.left.x, frog.eyes.y, frog.eyes.size);
        ellipse(frog.eyes.right.x, frog.eyes.y, frog.eyes.size);
        pop();
        // Pupils
        push();
        fill(frog.eyes.pupils.fill);
        ellipse(frog.eyes.left.x, frog.eyes.y, frog.eyes.size - 15);
        ellipse(frog.eyes.right.x, frog.eyes.y, frog.eyes.size - 15);
        pop();
    }
    if (gameStarted === "true") {
        // Eye whites
        push();
        noStroke();
        fill(frog.eyes.globes.fill);
        frog.eyes.y = frog.body.y - 60;
        frog.eyes.left.x = frog.body.x - 35;
        frog.eyes.right.x = frog.body.x + 35;
        ellipse(frog.eyes.left.x, frog.eyes.y, frog.eyes.size - 50);
        ellipse(frog.eyes.right.x, frog.eyes.y, frog.eyes.size - 50);
        pop();
        // Pupils
        push();
        fill(frog.eyes.pupils.fill);
        ellipse(frog.eyes.left.x, frog.eyes.y, frog.eyes.size - 60);
        ellipse(frog.eyes.right.x, frog.eyes.y, frog.eyes.size - 60);
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
 * Handles the tongue overlapping any fly
 */
function checkTongueFlyOverlap(fly) {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        // Reset the fly and take one off population
        resetFly(fly);
        population = population - 1;
        constrain(population, 0, 10);
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

/**
* Start the game (if it isn't started yet) and launch the tongue on click (if it's not launched yet)
*/
function mousePressed() {
    if (gameStarted === "false" && population > 0) {
        gameStarted = "true";
    }
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}

/**
 * Sets out the sequence to play at the end of the game
 */
function endGame() {
    if (gameStarted === "false" && population < 1) {
        background(bg.fill.r, bg.fill.g, bg.fill.b);
        bg.fill.r = constrain(bg.fill.r, 0, 255);
        bg.fill.r -= 1;
        console.log(bg.fill.r);
        drawFrogBody();
    }
}


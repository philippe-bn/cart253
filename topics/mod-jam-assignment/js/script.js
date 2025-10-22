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
        b: 235,

        h: 197,
        s: 71,
        l: 73,
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
            y: undefined,
            fill: "#000000",
            left: {
                x: undefined,
            },
            right: {
                x: undefined,
            }
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
let travellerFly = undefined;

// Starts the game on the start menu
let gameState = "menu";

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    eveTheFly = createFly(2, "Eve");
    babyFly = createFly(3, "Baby Fly");
    evolvedFly = createFly(4, "Evolved Fly");
    travellerFly = createFly(3.5, "Traveller Fly");

    // Give the flies their first random position
    resetFly(eveTheFly);
    resetFly(babyFly);
    resetFly(evolvedFly);
    resetFly(travellerFly);
}

function draw() {
    if (gameState === "menu") {
        drawMenu();
    }
    else if (gameState === "game") {
        runGame();
    }
}

/**
 * Draws a game menu
 */
function drawMenu() {
    // Start menu is a big frog body covering the screen
    drawFrog();
}

/**
 * Launches the game if the mouse is pressed
 */
function runGame() {
    colorMode(RGB);
    background(bg.fill.r, bg.fill.g, bg.fill.b);

    if (population > 0) {
        drawFly(eveTheFly);
        moveFly(eveTheFly);
    }

    if (population > 1) {
        drawFly(babyFly);
        moveFly(babyFly);
    }

    if (population > 2) {
        drawFly(evolvedFly);
        moveFly(evolvedFly);
    }

    if (population > 3) {
        drawFly(travellerFly);
        moveFly(travellerFly);
    }

    drawFrog();
    checkInput();
    moveTongue();

    checkTongueFlyOverlap(eveTheFly);
    checkTongueFlyOverlap(babyFly);
    checkTongueFlyOverlap(evolvedFly);
    checkTongueFlyOverlap(travellerFly);


    // End the game when there are no flies left
    if (population < 1) {
        // End the game and wait 2 seconds before playing the end game animation
        setTimeout(endGame, 2000);
    }
}

function createFly(speed, name) {
    // Our flies
    // Have a position, size, speed of horizontal movement, and a distance from the parent fly when new flies are created
    const fly = {
        x: 0,
        y: random(0, 300),
        size: random(5, 10),
        speed: speed, // Will vary every iteration to be quicker and quicker
        name: name
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
    // Displays the fly's name under it
    text(fly.name, fly.x, fly.y + 15);
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
        birthAnnouncement();
    }
}

/**
 * Announces the birth of a new fly - this is too quick and I can't figure out how to put fly.name in the text as well
 */
function birthAnnouncement(fly) {
    text("had a baby", width / 2, height / 2);
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
    if (gameState === "game") {
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
    if (gameState === "menu") {
        background("#00ff00");
    }
    // In the game, the frog's body is smaller
    else if (gameState === "game" || gameState === "end") {
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
    if (gameState === "menu") {
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
        // Make left pupil follow mouse X and mouse Y inside globe
        frog.eyes.pupils.left.x = map(mouseX, 0, width, frog.eyes.left.x - 5, frog.eyes.left.x + 5);
        frog.eyes.pupils.left.y = map(mouseY, 0, height, frog.eyes.y - 5, frog.eyes.y + 5);
        ellipse(frog.eyes.pupils.left.x, frog.eyes.pupils.left.y, frog.eyes.size - 15);
        // Make right pupil follow mouse X and mouse Y inside globe
        frog.eyes.pupils.right.x = map(mouseX, 0, width, frog.eyes.right.x - 5, frog.eyes.right.x + 5);
        frog.eyes.pupils.right.y = map(mouseY, 0, height, frog.eyes.y - 5, frog.eyes.y + 5);
        ellipse(frog.eyes.pupils.right.x, frog.eyes.pupils.right.y, frog.eyes.size - 15);
        pop();
    }

    if (gameState === "game") {
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
        // Make left pupil follow mouse X and mouse Y inside globe
        frog.eyes.pupils.left.x = map(mouseX, 0, width, frog.eyes.left.x - 5, frog.eyes.left.x + 5);
        frog.eyes.pupils.left.y = map(mouseY, 0, height, frog.eyes.y - 5, frog.eyes.y + 5);
        ellipse(frog.eyes.pupils.left.x, frog.eyes.pupils.left.y, frog.eyes.size - 60);
        // Make right pupil follow mouse X and mouse Y inside globe
        frog.eyes.pupils.right.x = map(mouseX, 0, width, frog.eyes.right.x - 5, frog.eyes.right.x + 5);
        frog.eyes.pupils.right.y = map(mouseY, 0, height, frog.eyes.y - 5, frog.eyes.y + 5);
        ellipse(frog.eyes.pupils.right.x, frog.eyes.pupils.right.y, frog.eyes.size - 60);
        pop();
    }

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
        population = population - 1;
        constrain(population, 0, 10);
        resetFly(fly);
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

/**
* Start the game (if it isn't started yet)
*/
function mousePressed() {
    if (gameState === "menu") {
        gameState = "game";
    }
}

/**
 * Checks the different keyboard inputs
 */
function checkInput() {
    // Launch the tongue on spacebar click (if it's not launched yet)
    if (keyIsDown(32) && frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
    // Move the frog towards the left when the left arrow key is pressed
    if (keyIsDown(LEFT_ARROW)) {
        frog.body.x -= 5;
    }
    // Move the frog towards the right when the right arrow key is pressed
    if (keyIsDown(RIGHT_ARROW)) {
        frog.body.x += 5;
    }
}

/**
 * Sets out the sequence to play at the end of the game
 */
function endGame() {
    gameState = "end";
    colorMode(HSL);
    background(bg.fill.h, bg.fill.s, bg.fill.l);
    bg.fill.l = constrain(bg.fill.l, 0, 73);
    bg.fill.l -= 0.3;
    drawFrogBody();
}


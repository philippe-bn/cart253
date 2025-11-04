/**
 * The Swamp of Eden
 * Pippin Barr, modded by Philippe Beauchemin
 * 
 * A modded game of catching flies with your frog-tongue.
 * 
 * Instructions:
 * - Move the frog with the keyboard arrows
 * - Click spacebar to launch the tongue
 * - Catch flies and keep the fly population balanced for as long as possible
 * 
 * Made with p5
 * https://p5js.org/
 * Keyboard pictures by Julia Bellone : https://juliabellone.github.io/Arkanoid/ 
 * Timer help by user T.J. Crowder on Stack Overflow: https://stackoverflow.com/questions/5978519/how-can-i-use-setinterval-and-clearinterval
 * Overlap code taken from Pippin Barr's CART253 repository: https://pippinbarr.com/cart253/assignments/challenges/functions/
 */

"use strict";

// The images of the keys used in the game
let spacebar;
let arrowKeys;

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

// The fly population tracker - this will become useless and will be replaced by the index of the flies array (flies.index?)
let population = 1;

// Our frog
const frog = {
    // The frog's body has a position, a size and a fill
    body: {
        x: 320,
        y: 520,
        size: 150,
        fill: "#00ff00"
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle", // State can be: idle, outbound, inbound
        stroke: "#ff0000"
    },
    tympanum: {
        size: 120
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

let retryButton = {
    x: 320,
    y: 400,
    w: 70,
    h: 30,
    fill: "#00ff00"
};

// Make an array of flies
let flies = []; // will be pushed in after?
let fly = undefined;
// Make an array of possible names for them
let names = [
    "Baby Fly",
    "Evolved Fly",
    "Traveller Fly",
    "Voracious Fly"
];

// // The first fly
// let eveTheFly = undefined;
// // The other flies
// let babyFly = undefined;
// let evolvedFly = undefined;
// let travellerFly = undefined;
// let voraciousFly = undefined;

// The distance between the frog's body and each fly - this will contain the distance between the frog and each fly
let frogFlyDistance = [];

// The timer's time
let timeElapsed = 0;
// The timer's interval
let timeFlow = setInterval(gameTimer, 1000);

// Starts the game on the start menu
let gameState = "menu";

/**
 * Preloads the images
 */
function preload() {
    spacebar = loadImage('assets/images/spacebar.png');
    arrowKeys = loadImage('assets/images/arrowKeys.png');
}

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    // Set the font for the game
    textFont('Courier New');

    // Create the first fly and set up its speed and name
    fly = createFly(2, "Eve");
    flies.push(fly);
    // evolvedFly = createFly(3.5, "Evolved Fly");
    // travellerFly = createFly(3.5, "Traveller Fly");
    // voraciousFly = createFly(3, "Voracious Fly");


    // Give the flies their first random position
    for (let fly of flies) {
        resetFly(fly);
    }

    // As the game is running, this will add 1 to the timer every second
    setInterval(timeFlow);
}

function createFly(speed, name) {
    // Our flies - will be pushed into array
    // Have a position, size, colour, flight pattern, speed of horizontal movement, name
    const fly = {
        x: -30,
        y: random(0, height),
        b: random(150, 400), // Will become the vertical shift of the sin function
        size: random(5, 10),
        fill: "#000000",
        speed: speed, // Will vary every iteration to be quicker and quicker
        name: name
    };
    return fly;
}

/**
 * Run the program, draw either the menu or the game
 */
function draw() {
    if (gameState === "menu") {
        drawMenu();
    }
    else if (gameState === "game") {
        runGame();
    }
    else if (gameState === "end") {
        endGame();
    }
    else if (gameState === "alt end") {
        altEndGame();
    }
}

/**
 * Draws a game menu
 */
function drawMenu() {
    cursor(ARROW);

    // Start menu is a big frog body covering the screen
    drawFrog();

    push();
    textSize(50);
    text("THE SWAMP OF EDEN", width / 2 - 260, 80);
    pop();

    push();
    rectMode(CENTER);
    textSize(14);
    text("*Croak* sorry, I mean click anywhere to play.", width / 2, 150, 300, 50);
    textSize(12);
    text("*Use the spacebar and arrows to catch the flies!*", width / 2 - 120, 440, 250, 50);
    image(spacebar, width / 2 + 50, 410, 120, 40);
    image(arrowKeys, width / 2 + 200, 400, 70, 50);
    pop();
}

/**
 * Launch the game if the mouse is pressed
 */
function runGame() {
    // No cursor in-game so the player uses spacebar and arrows
    noCursor();
    // Draw the sky
    colorMode(RGB);
    background(bg.fill.r, bg.fill.g, bg.fill.b);

    // Draw the flies according to the population index - this will become the index of the flies array
    for (let fly of flies) {
        drawFly(fly);
        moveFly(fly);
    }

    drawFrog();
    // Move the frog and its tongue based on the player's input
    checkInput();
    moveTongue();

    // Check if the tongue overlaps any fly
    for (let fly of flies) {
        checkTongueFlyOverlap(fly);
    }

    drawTimer();

    // End the game when there are no flies left
    if (flies.length < 1) {
        // End the game and wait 2 seconds before playing the end game animation
        gameState = "end";
    }

    // End the game when there are too many flies - the user is incapable of regulating the population
    if (flies.length > 200) {
        // End the game and wait 2 seconds before playing the end game animation
        gameState = "alt end";
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly(fly) {
    push();
    noStroke();
    fill(fly.fill);
    ellipse(fly.x, fly.y, fly.size);
    // Displays the fly's name under it
    textSize(10);
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
    fly.y = 5 * sin(frameCount * 0.25) + fly.b;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly(fly);
        fly = createFly(random(3, 4), random(names));
        flies.push(fly);
    }
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly(fly) {
    fly.x = -30;
    fly.y = random(0, height);
    fly.b = random(150, 400);
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
        fill(frog.tongue.stroke);
        noStroke();
        ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
        pop();

        // Draw the rest of the tongue
        push();
        stroke(frog.tongue.stroke);
        strokeWeight(frog.tongue.size);
        line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
        pop();
    }
}

function drawFrogBody() {
    // Draw the frog's body
    // In the start menu, the frog's body takes up the whole screen
    if (gameState === "menu") {
        background(frog.body.fill);
    }
    // In the game, the frog's body is smaller
    else if (gameState === "game" || gameState === "end") {
        push();
        fill(frog.body.fill);
        noStroke();
        ellipse(frog.body.x, frog.body.y, frog.body.size);
        pop();
    }
}

function drawFrogEyes() {
    // Draw the frog's eyes
    // In the start menu, the frog's eyes are bigger to be proportional to the body
    if (gameState === "menu") {
        // Tympanums
        push()
        noFill();
        stroke(0);
        arc(frog.eyes.left.x, frog.eyes.y - 10, frog.tympanum.size, frog.tympanum.size, PI, TWO_PI);
        arc(frog.eyes.right.x, frog.eyes.y - 10, frog.tympanum.size, frog.tympanum.size, PI, TWO_PI);
        pop();
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
        // Tympanums
        push();
        noStroke();
        fill(frog.body.fill); // Green
        frog.eyes.y = frog.body.y - 60; // A little higher on the body
        frog.eyes.left.x = frog.body.x - 35; // One offset to the left
        frog.eyes.right.x = frog.body.x + 35; // One offset to the right
        ellipse(frog.eyes.left.x, frog.eyes.y, frog.eyes.size - 40);
        ellipse(frog.eyes.right.x, frog.eyes.y, frog.eyes.size - 40);
        pop();
        // Eye whites
        push();
        noStroke();
        fill(frog.eyes.globes.fill); // White
        ellipse(frog.eyes.left.x, frog.eyes.y, frog.eyes.size - 50);
        ellipse(frog.eyes.right.x, frog.eyes.y, frog.eyes.size - 50);
        pop();
        // Pupils
        push();
        fill(frog.eyes.pupils.fill); // Black
        // Check how close to the frog every fly on the screen is
        const closestFly = flyWatch();
        // Make left pupil follow the position of the closest fly
        frog.eyes.pupils.left.x = map(closestFly.x, 0, width, frog.eyes.left.x - 5, frog.eyes.left.x + 5);
        frog.eyes.pupils.left.y = map(closestFly.y, 0, height, frog.eyes.y - 15, frog.eyes.y + 5);
        ellipse(frog.eyes.pupils.left.x, frog.eyes.pupils.left.y, frog.eyes.size - 60);
        // Make right pupil follow the position of the closest fly
        frog.eyes.pupils.right.x = map(closestFly.x, 0, width, frog.eyes.right.x - 5, frog.eyes.right.x + 5);
        frog.eyes.pupils.right.y = map(closestFly.y, 0, height, frog.eyes.y - 15, frog.eyes.y + 5);
        ellipse(frog.eyes.pupils.right.x, frog.eyes.pupils.right.y, frog.eyes.size - 60);
        pop();
    }
}

/**
 * Calculate which fly is the closest to the frog
 */
function flyWatch() {
    let closest = 100000;
    let closestFly = undefined;
    for (let fly of flies) {
        // Get the distance from the frog to each fly
        const frogFlyDistance = dist(frog.body.x, frog.body.y, fly.x, fly.y);
        // Compare to the previous closest distance
        if (frogFlyDistance < closest) {
            // Update the closest fly and closest distance
            closestFly = fly;
            closest = frogFlyDistance;
        }
        return closestFly;
    }
}


/**
 * Handle moving the tongue based on its state
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
    const tongueFly = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (tongueFly < frog.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        // Determine which fly in the array got eaten
        const eatenFlyIndex = flies.indexOf(fly);
        // Take out that fly
        flies.splice(eatenFlyIndex, 1);
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

/**
 * Add one to the timer every second during the game
 */
function gameTimer() {
    // As long as the game isn't started, the time elapsed is 0
    if (gameState === "menu") {
        timeElapsed = 0;
    }
    // The time elapsed increases by 1 every second
    else if (gameState === "game") {
        timeElapsed = timeElapsed + 1;
    }
}

/**
 * Display the timer
 */
function drawTimer() {
    push();
    text(timeElapsed, width - 25, 25);
    pop();
}

/**
* Start the game (if it isn't started yet) and restart if the "retry" button is pressed at the end of the game
*/
function mousePressed() {
    if (gameState === "menu") {
        gameState = "game";
    }

    if (gameState === "end" || gameState === "alt end") {
        if (checkRetryButtonOverlap(mouseX, mouseY, retryButton)) {
            // Reset the time flow and time elapsed
            timeFlow = 0;
            timeElapsed = 0;
            // Restart
            setup();
            gameState = "menu";
        }
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

    frog.body.x = constrain(frog.body.x, frog.body.size / 2, width - frog.body.size / 2);
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
    // Bring the cursor back
    cursor(ARROW);

    // Make the background go to black
    colorMode(HSL);
    background(bg.fill.h, bg.fill.s, bg.fill.l);
    bg.fill.l = constrain(bg.fill.l, 0, 73);
    bg.fill.l -= 0.5;

    // Draw the dead frog
    drawFrogBody();

    // When the sky gets dark, write the end text
    if (bg.fill.l <= 10) {
        endGameText();
    }
}

function endGameText() {
    // Write the end of game text
    push();
    textSize(80);
    rectMode(CENTER);
    fill('red');
    text("YOU STARVED", width / 2 + 60, height - 80, width, height);
    pop();

    // Write the final score
    finalScore();

    // Retry button
    drawRetryButton();
}

/**
 * Sets out an alternative sequence to play at the end of the game
 */
function altEndGame() {

    // Bring the cursor back
    cursor(ARROW);

    // Draw the dead frog
    drawFrogBody();

    // Indicate the user lost due to a swarm
    push();
    textSize(60);
    rectMode(CENTER);
    fill('white');
    text("YOU WERE SWARMED", width / 2 + 40, height - 80, width, height);
    pop();

    // Write the final score
    finalScore();

    // Retry button
    drawRetryButton();
}

function finalScore() {
    // Write the final score as a display of the time elapsed when the game ended
    push();
    textSize(40);
    rectMode(CENTER);
    fill('white');
    text("You lasted", width / 2 + 60, height, width, height);
    text(timeElapsed, width / 2 + 320, height, width, height);
    if (timeElapsed === 1) {
        text("second...", width / 2 + 370, height, width, height);
    }
    else {
        text("seconds...", width / 2 + 370, height, width, height);
    }
    pop();
}

function drawRetryButton() {
    push();
    rectMode(CENTER);
    noStroke();
    fill(retryButton.fill);
    rect(retryButton.x, retryButton.y, retryButton.w, retryButton.h, 10);
    pop();
    push();
    fill(0);
    text("RETRY", retryButton.x - retryButton.w / 4, retryButton.y + retryButton.h / 6);
    pop();
}

function checkRetryButtonOverlap(mouseX, mouseY, retryButton) {
    return (mouseX > retryButton.x - retryButton.w / 2 &&
        mouseX < retryButton.x + retryButton.w / 2 &&
        mouseY > retryButton.y - retryButton.h / 2 &&
        mouseY < retryButton.y + retryButton.h / 2);
}
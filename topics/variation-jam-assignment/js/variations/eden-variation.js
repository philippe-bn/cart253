/**
 * Eden
 * 
 * A modded game of catching flies with your frog-tongue.
 * 
 * Instructions:
 * - Move the frog with the keyboard arrows
 * - Click spacebar to launch the tongue
 * - Catch flies and keep the fly population balanced for as long as possible
 */

/**
 * The background's fill
 */
let edenBg = {
    fill: {
        r: 135,
        g: 206,
        b: 235,

        h: 197,
        s: 71,
        l: 73,
    }
}

/**
 * The distance between the frog's body and each fly - this will contain the distance between the frog and each fly
 */
let edenFrogFlyDistance = [];

/**
 * The timer's time
 */
let timeElapsed = 0;
/**
 * The timer's interval
 */
let timeFlow = setInterval(gameTimer, 1000);

/**
 * The game's state
 */
let edenGameState = undefined;

/**
 * Creates the canvas and initializes the fly
 */
function edenSetup() {
    createCanvas(640, 480); // could maybe be deleted?

    // In the Eden Variation, we use a specific frog
    frog = frogData.frog.eden;
    // Load the possible fly names
    names = namesData.names;

    // Create the retry button
    edenRetryButton = createPersonalizedButton(400, 70, "RETRY");

    // Create the first fly and set up its speed and name
    fly = createFly(2, "Eve");
    flies.push(fly);

    // Give the flies their first random position
    for (let fly of flies) {
        resetFly(fly);
    }

    // As the game is running, this will add 1 to the timer every second
    setInterval(timeFlow);

    edenGameState = "game";
}

/**
 * Run the program, draw either the game or an ending
 */
function edenDraw() {
    if (edenGameState === "game") {
        edenRunGame();
    }
    else if (edenGameState === "end") {
        edenEndGame();
    }
    else if (edenGameState === "alt end") {
        altEdenEndGame();
    }
}

/**
 * Launch the game if the mouse is pressed
 */
function edenRunGame() {
    // No cursor in-game so the player uses spacebar and arrows
    noCursor();
    // Draw the sky
    colorMode(RGB);
    background(edenBg.fill.r, edenBg.fill.g, edenBg.fill.b);

    // Draw the flies according to the population index - this will become the index of the flies array
    for (let fly of flies) {
        drawFly(fly);
        moveFly(fly);
    }

    // Draw the frog
    drawEdenFrog();
    // Move the frog and its tongue based on the player's input
    checkInput();
    moveTongue();

    // Check if the tongue overlaps any fly
    for (let fly of flies) {
        checkTongueFlyOverlap(fly);
    }

    // Draw the timer on the screen
    drawTimer();

    // End the game when there are no flies left
    if (flies.length < 1) {
        // End the game and wait 2 seconds before playing the end game animation
        edenGameState = "end";
    }

    // End the game when there are too many flies - the user is incapable of regulating the population
    if (flies.length > 200) {
        // End the game and wait 2 seconds before playing the end game animation
        edenGameState = "alt end";
    }
}

/**
 * Draws the fly as a black circle with a name
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
function drawEdenFrog() {
    drawEdenFrogTongue();
    drawEdenFrogBody();
    drawEdenFrogEyes();
}

/**
 * Displays the tongue (tip and line connection)
 */
function drawEdenFrogTongue() {
    // Draw the tongue
    if (edenGameState === "game") {
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

/**
 * Displays the frog's body
 */
function drawEdenFrogBody() {
    push();
    fill(frog.body.fill);
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

/**
 * Displays the frog's eyes
 */
function drawEdenFrogEyes() {
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

/**
 * Calculate which fly is the closest to the frog
 */
function flyWatch() {
    let closest = 100000;
    let closestFly = undefined;
    for (let fly of flies) {
        // Get the distance from the frog to each fly
        const edenFrogFlyDistance = dist(frog.body.x, frog.body.y, fly.x, fly.y);
        // Compare to the previous closest distance
        if (edenFrogFlyDistance < closest) {
            // Update the closest fly and closest distance
            closestFly = fly;
            closest = edenFrogFlyDistance;
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
    // The time elapsed increases by 1 every second
    if (edenGameState === "game") {
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
* Go back to the menu if the "retry" button is pressed at the end of the game
*/
function edenMousePressed() {
    if (edenGameState === "end" || edenGameState === "alt end") {
        if (checkEdenRetryButtonOverlap(mouseX, mouseY, edenRetryButton)) {
            // Reset the time flow and time elapsed
            timeFlow = 0;
            timeElapsed = 0;
            // Reset the flies
            flies = [];
            // Restart
            switch (state) {
                case "eden-variation":
                    state = "menu"
                    break;
            }
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
function edenEndGame() {
    // Bring the cursor back
    cursor(ARROW);

    // Make the background go to black
    colorMode(HSL);
    background(edenBg.fill.h, edenBg.fill.s, edenBg.fill.l);
    edenBg.fill.l = constrain(edenBg.fill.l, 0, 73);
    edenBg.fill.l -= 0.5;

    // Draw the dead frog
    drawEdenFrogBody();

    // When the sky gets dark, write the end text
    if (edenBg.fill.l <= 10) {
        edenEndGameText();
    }
}

/**
 * Displays the end of game text
 */
function edenEndGameText() {
    push();
    textSize(80);
    rectMode(CENTER);
    fill('red');
    text("YOU STARVED", width / 2 + 60, height - 80, width, height);
    pop();

    // Write the final score
    finalScore();

    // Retry button
    drawEdenRetryButton(edenRetryButton);
}

/**
 * Sets out an alternative sequence to play at the end of the game
 */
function altEdenEndGame() {

    // Bring the cursor back
    cursor(ARROW);

    // Draw the dead frog
    drawEdenFrogBody();

    // Indicate the user lost due to a swarm
    push();
    textSize(60);
    rectMode(CENTER);
    fill('white');
    textAlign(CENTER);
    text("YOU WERE SWARMED", width / 2, height - 80, width, height);
    pop();

    // Write the final score
    finalScore();

    // Retry button
    drawEdenRetryButton(edenRetryButton);
}

/**
 * Displays the final score
 */
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

/**
 * Displays the "retry" button
 */
function drawEdenRetryButton(edenRetryButton) {
    push();
    rectMode(CENTER);
    noStroke();
    fill(edenRetryButton.fill);
    rect(edenRetryButton.x, edenRetryButton.y, edenRetryButton.w, edenRetryButton.h, 10);
    pop();
    push();
    textAlign(CENTER, CENTER);
    fill(0);
    text(edenRetryButton.text, edenRetryButton.x, edenRetryButton.y);
    pop();
}

/**
 * Checks if the mouse is overlapping the "retry" button
 */
function checkEdenRetryButtonOverlap(mouseX, mouseY, edenRetryButton) {
    return (mouseX > edenRetryButton.x - edenRetryButton.w / 2 &&
        mouseX < edenRetryButton.x + edenRetryButton.w / 2 &&
        mouseY > edenRetryButton.y - edenRetryButton.h / 2 &&
        mouseY < edenRetryButton.y + edenRetryButton.h / 2);
}
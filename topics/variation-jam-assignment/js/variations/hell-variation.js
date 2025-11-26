/**
 * Hell
 */

/**
 * The distance between the frog's body and each fly
 */
let hellFrogFlyDistance = [];

/**
 * No notion of time in Hell
 */
let hellTimeElapsed = 0;

/**
 * The game's state
 */
let hellGameState = undefined;

/**
 * Creates the canvas and initializes the fly
 */
function hellSetup() {
    createCanvas(640, 480);

    // In the Hell Variation, we use a specific frog
    frog = frogData.frog.hell;
    // Same for the text
    textDisplay = textData.text.hell;
    // Load the background to be displayed
    backgroundDisplay = backgroundsData.backgrounds.hell;

    // Create the retry button
    hellRetryButton = createPersonalizedButton(320, 400, 70, textDisplay.retryButton);

    // Create the first fly and set up its speed and name
    fly = createFly(2, textDisplay.firstFly);
    flies.push(fly);

    // Give the flies their first random position
    for (let fly of flies) {
        resetHellFly(fly);
    }

    // Set the state to game at the start
    hellGameState = "game";
}

/**
 * Run the program, draw either the game or an ending
 */
function hellDraw() {
    if (hellGameState === "game") {
        hellRunGame();
    }
    else if (hellGameState === "end") {
        hellEndGame();
    }
    else if (hellGameState === "alt end") {
        altHellEndGame();
    }
}

/**
 * Launch the game if the mouse is pressed
 */
function hellRunGame() {
    // No cursor in-game so the player uses spacebar and arrows
    noCursor();

    // Draw the sky
    colorMode(RGB);
    background(backgroundDisplay.fill.r, backgroundDisplay.fill.g, backgroundDisplay.fill.b);

    // Draw the flies according to the population index - this will become the index of the flies array
    for (let fly of flies) {
        drawHellFly(fly);
        moveHellFly(fly);
    }

    // Draw the frog
    drawHellFrog();

    // Move the frog and its tongue based on the player's input
    checkHellInput();
    moveHellTongue();

    // Check if the tongue overlaps any fly
    for (let fly of flies) {
        checkTongueFlyOverlap(fly);
    }

    // Draw the timer on the screen
    drawHellTimer();

    // End the game when there are no flies left
    if (flies.length < 1) {
        // End the game and wait 2 seconds before playing the end game animation
        hellGameState = "end";
    }

    // End the game when there are too many flies - the user is incapable of regulating the population
    if (flies.length > 200) {
        // End the game and wait 2 seconds before playing the end game animation
        hellGameState = "alt end";
    }
}

/**
 * Draws the fly as a black circle with a name
 */
function drawHellFly(fly) {
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
function moveHellFly(fly) {
    // Move the fly in a sinusoidal pattern across the screen
    fly.x += fly.speed * 1.5; // in the Hell variation, the flies move faster
    fly.y = 5 * sin(frameCount * 0.25) + fly.b;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetHellFly(fly);
        fly = createFly(random(3, 4), random(textDisplay.names));
        flies.push(fly);
    }
}

/**
 * Resets the fly to the left with a random y
 */
function resetHellFly(fly) {
    fly.x = -30;
    fly.y = random(0, height);
    fly.b = random(150, 400);
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawHellFrog() {
    drawHellFrogTongue();
    drawHellFrogBody();
    drawHellFrogEyes();
}

/**
 * Displays the tongue (tip and line connection)
 */
function drawHellFrogTongue() {
    // Draw the tongue
    if (hellGameState === "game") {
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
function drawHellFrogBody() {
    push();
    fill(frog.body.fill);
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

/**
 * Displays the frog's eyes
 */
function drawHellFrogEyes() {
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
    frog.eyes.pupils.left.y = map(closestFly.y, 0, height, frog.eyes.y - 13, frog.eyes.y);
    ellipse(frog.eyes.pupils.left.x, frog.eyes.pupils.left.y, frog.eyes.size - 60);
    // Make right pupil follow the position of the closest fly
    frog.eyes.pupils.right.x = map(closestFly.x, 0, width, frog.eyes.right.x - 5, frog.eyes.right.x + 5);
    frog.eyes.pupils.right.y = map(closestFly.y, 0, height, frog.eyes.y - 13, frog.eyes.y);
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
        const hellFrogFlyDistance = dist(frog.body.x, frog.body.y, fly.x, fly.y);
        // Compare to the previous closest distance
        if (hellFrogFlyDistance < closest) {
            // Update the closest fly and closest distance
            closestFly = fly;
            closest = hellFrogFlyDistance;
        }
        return closestFly;
    }
}


/**
 * Handle moving the tongue based on its state
 */
function moveHellTongue() {
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
 * Display the timer
 */
function drawHellTimer() {
    push();
    text(hellTimeElapsed, width - 25, 25);
    pop();
}

/**
* Go back to the menu if the "retry" button is pressed at the end of the game
*/
function hellMousePressed() {
    if (hellGameState === "end" || hellGameState === "alt end") {
        if (checkHellRetryButtonOverlap(mouseX, mouseY, hellRetryButton)) {
            // Reset the flies
            flies = [];
            // Restart
            switch (state) {
                case "hell-variation":
                    state = "menu"
                    menuSetup();
                    menuState = 2;
                    menuDraw();
                    break;
            }
        }
    }
}

/**
 * Checks the different keyboard inputs
 */
function checkHellInput() {
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
function hellEndGame() {
    // Bring the cursor back
    cursor(ARROW);

    // Make the background go to black
    colorMode(HSL);
    background(backgroundDisplay.fill.h, backgroundDisplay.fill.s, backgroundDisplay.fill.l);
    backgroundDisplay.fill.l = constrain(backgroundDisplay.fill.l, 0, 73);
    backgroundDisplay.fill.l -= 0.5;

    // Draw the dead frog
    drawHellFrogBody();

    // When the sky gets dark, write the end text
    if (backgroundDisplay.fill.l <= 10) {
        hellEndGameText();
    }
}

/**
 * Displays the end of game text
 */
function hellEndGameText() {
    push();
    textSize(60);
    rectMode(CENTER);
    fill('red');
    textAlign(CENTER, CENTER)
    text(textDisplay.end, width / 2, height / 2 - 10);
    pop();

    // Write the final score
    finalHellScore();

    // Retry button
    drawHellRetryButton(hellRetryButton);
}

/**
 * Sets out an alternative sequence to play at the end of the game
 */
function altHellEndGame() {

    // Bring the cursor back
    cursor(ARROW);

    // Draw the dead frog
    drawHellFrogBody();

    // Indicate the user lost due to a swarm
    push();
    textSize(50);
    rectMode(CENTER);
    fill('black');
    textAlign(CENTER, CENTER);
    text(textDisplay.altEnd, width / 2, height / 2);
    pop();

    // Write the final score
    finalHellScore();

    // Retry button
    drawHellRetryButton(hellRetryButton);
}

/**
 * Displays the final score
 */
function finalHellScore() {
    // Write the final score
    push();
    textSize(25);
    rectMode(CENTER);
    fill('white');
    textAlign(CENTER, CENTER);
    text(textDisplay.scoreAnnouncement, width / 2, height / 2 + 30, width - 30);
    pop();
}

/**
 * Displays the "retry" button
 */
function drawHellRetryButton(hellRetryButton) {
    push();
    rectMode(CENTER);
    noStroke();
    fill(hellRetryButton.fill);
    rect(hellRetryButton.x, hellRetryButton.y, hellRetryButton.w, hellRetryButton.h, 10);
    pop();
    push();
    textAlign(CENTER, CENTER);
    fill(0);
    text(hellRetryButton.text, hellRetryButton.x, hellRetryButton.y);
    pop();
}

/**
 * Checks if the mouse is overlapping the "retry" button
 */
function checkHellRetryButtonOverlap(mouseX, mouseY, hellRetryButton) {
    return (mouseX > hellRetryButton.x - hellRetryButton.w / 2 &&
        mouseX < hellRetryButton.x + hellRetryButton.w / 2 &&
        mouseY > hellRetryButton.y - hellRetryButton.h / 2 &&
        mouseY < hellRetryButton.y + hellRetryButton.h / 2);
}
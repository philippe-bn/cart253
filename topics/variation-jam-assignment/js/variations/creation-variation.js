/**
 * Creation
 * 
 * A modded game of catching flies with your frog-tongue.
 * 
 * Instructions:
 * - Move the frog with the keyboard arrows
 * - Click spacebar to launch the tongue
 * - Catch flies and keep the fly population balanced for as long as possible
 */

/**
 * The distance between the frog's body and each fly - this will contain the distance between the frog and each fly
 */
let creationFrogFlyDistance = [];

/**
 * The timer's time
 */
let creationTimeElapsed = 0;
/**
 * The timer's interval
 */
let creationTimeFlow = setInterval(creationGameTimer, 1000);

/**
 * The game's state
 */
let creationGameState = undefined;

/**
 * Creates the canvas and initializes the fly
 */
function creationSetup() {
    createCanvas(640, 480); // could maybe be deleted?

    // In the Creation Variation, we use a specific frog
    frog = frogData.frog.creation;
    // Load the text to be displayed
    textDisplay = textData.text.creation;
    // Load the background to be displayed
    backgroundDisplay = backgroundsData.backgrounds.creation;

    // Create the retry button
    creationRetryButton = createPersonalizedButton(320, 400, 70, textDisplay.retryButton);

    // Create the first fly and set up its speed and name
    fly = createFly(2, textDisplay.firstFly);
    flies.push(fly);

    // Give the flies their first random position
    for (let fly of flies) {
        resetCreationFly(fly);
    }

    // As the game is running, this will add 1 to the timer every second
    setInterval(creationTimeFlow);

    creationGameState = "game";
}

/**
 * Run the program, draw either the game or an ending
 */
function creationDraw() {
    if (creationGameState === "game") {
        creationRunGame();
    }
    else if (creationGameState === "end") {
        creationEndGame();
    }
    else if (creationGameState === "alt end") {
        altCreationEndGame();
    }
}

/**
 * Launch the game if the mouse is pressed
 */
function creationRunGame() {
    // No cursor in-game so the player uses spacebar and arrows
    noCursor();

    // Draw the sky
    colorMode(RGB);
    background(backgroundDisplay.fill.r, backgroundDisplay.fill.g, backgroundDisplay.fill.b);

    // Draw the flies according to the population index - this will become the index of the flies array
    for (let fly of flies) {
        drawCreationFly(fly);
        moveCreationFly(fly);
    }

    // Draw the frog
    drawCreationFrog();
    // Move the frog and its tongue based on the player's input
    checkCreationInput();
    moveCreationTongue();

    // Check if the tongue overlaps any fly
    for (let fly of flies) {
        checkTongueFlyOverlap(fly);
    }

    // Draw the timer on the screen
    drawCreationTimer();

    // End the game when there are no flies left
    if (flies.length < 1) {
        // End the game and wait 2 seconds before playing the end game animation
        creationGameState = "end";
    }

    // End the game when there are too many flies - the user is incapable of regulating the population
    if (flies.length > 400) {
        // End the game and wait 2 seconds before playing the end game animation
        creationGameState = "alt end";
    }
}

/**
 * Draws the fly as a black circle with a name
 */
function drawCreationFly(fly) {
    push();
    noStroke();
    fill('white');
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
function moveCreationFly(fly) {
    // Move the fly in a sinusoidal pattern across the screen
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetCreationFly(fly);
        fly = createFly(random(3, 4), random(textDisplay.names));
        flies.push(fly);
    }
}

/**
 * Resets the fly to the left with a random y
 */
function resetCreationFly(fly) {
    fly.x = -30;
    fly.y = random(0, height);
    fly.b = random(150, 400);
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawCreationFrog() {
    drawCreationFrogTongue();
    drawCreationFrogBody();
    drawCreationFrogEyes();
}

/**
 * Displays the tongue (tip and line connection)
 */
function drawCreationFrogTongue() {
    // Draw the tongue
    if (creationGameState === "game") {
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
function drawCreationFrogBody() {
    push();
    fill(frog.body.fill);
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

/**
 * Displays the frog's eyes
 */
function drawCreationFrogEyes() {
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
        const creationFrogFlyDistance = dist(frog.body.x, frog.body.y, fly.x, fly.y);
        // Compare to the previous closest distance
        if (creationFrogFlyDistance < closest) {
            // Update the closest fly and closest distance
            closestFly = fly;
            closest = creationFrogFlyDistance;
        }
        return closestFly;
    }
}


/**
 * Handle moving the tongue based on its state
 */
function moveCreationTongue() {
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
function creationGameTimer() {
    // The time elapsed increases by 1 every second
    if (creationGameState === "game") {
        creationTimeElapsed = creationTimeElapsed + 1;
    }
}

/**
 * Display the timer
 */
function drawCreationTimer() {
    push();
    text(creationTimeElapsed, width - 25, 25);
    pop();
}

/**
* Go back to the menu if the "retry" button is pressed at the end of the game
*/
function creationMousePressed() {
    if (creationGameState === "end" || creationGameState === "alt end") {
        if (checkCreationRetryButtonOverlap(mouseX, mouseY, creationRetryButton)) {
            // Reset the time flow and time elapsed
            creationTimeFlow = 0;
            creationTimeElapsed = 0;
            // Reset the flies
            flies = [];
            // Restart
            switch (state) {
                case "creation-variation":
                    state = "menu"
                    menuState = 2;
                    break;
            }
        }
    }
}

/**
 * Checks the different keyboard inputs
 */
function checkCreationInput() {
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
function creationEndGame() {
    // Bring the cursor back
    cursor(ARROW);

    // Make the background go to black
    colorMode(HSL);
    background(backgroundDisplay.fill.h, backgroundDisplay.fill.s, backgroundDisplay.fill.l);

    // Draw the dead frog
    drawCreationFrogBody();

    // When the sky gets dark, write the end text
    if (backgroundDisplay.fill.l <= 10) {
        creationEndGameText();
    }
}

/**
 * Displays the end of game text
 */
function creationEndGameText() {
    push();
    textSize(80);
    rectMode(CENTER);
    fill(frog.body.fill);
    textAlign(CENTER, CENTER);
    text(textDisplay.end, width / 2, height / 2 - 60);
    pop();

    // Write the final score
    finalCreationScore();

    // Retry button
    drawCreationRetryButton(creationRetryButton);
}

/**
 * Sets out an alternative sequence to play at the end of the game
 */
function altCreationEndGame() {

    // Bring the cursor back
    cursor(ARROW);

    // Draw the dead frog
    drawCreationFrogBody();

    // Indicate the user lost due to a swarm
    push();
    textSize(60);
    rectMode(CENTER);
    fill(frog.body.fill);
    textAlign(CENTER, CENTER);
    text(textDisplay.altEnd, width / 2, height / 2 - 60);
    pop();

    // Write the final score
    altFinalCreationScore();

    // Retry button
    drawCreationRetryButton(creationRetryButton);
}

/**
 * Displays the final score
 */
function finalCreationScore() {
    // Write the final score as a display of the time elapsed when the game ended
    push();
    textSize(25);
    rectMode(CENTER);
    fill(frog.body.fill);
    textAlign(CENTER, CENTER);
    text(textDisplay.scoreAnnouncement, width / 2, height / 2, width);
    text(creationTimeElapsed, width / 2 - 150, height / 2 + 40, width);
    if (creationTimeElapsed === 1) {
        text(textDisplay.score1, width / 2 + 10, height / 2 + 40, width / 2);
    }
    else {
        text(textDisplay.score, width / 2 + 15, height / 2 + 40, width / 2);
    }
    pop();
}

/**
 * Displays the final score in the alternative ending
 */
function altFinalCreationScore() {
    // Write the final score as a display of the time elapsed when the game ended
    push();
    textSize(25);
    rectMode(CENTER);
    fill(frog.body.fill);
    textAlign(CENTER, CENTER);
    text(textDisplay.scoreAnnouncement2, width / 2, height / 2, width);
    text(creationTimeElapsed, width / 2 - 165, height / 2 + 40, width);
    text(textDisplay.scoreAlt, width / 2, height / 2 + 40, width / 2);
    pop();
}

/**
 * Displays the "retry" button
 */
function drawCreationRetryButton(creationRetryButton) {
    push();
    rectMode(CENTER);
    noStroke();
    fill(creationRetryButton.fill);
    rect(creationRetryButton.x, creationRetryButton.y, creationRetryButton.w, creationRetryButton.h, 10);
    pop();
    push();
    textAlign(CENTER, CENTER);
    fill(0);
    text(creationRetryButton.text, creationRetryButton.x, creationRetryButton.y);
    pop();
}

/**
 * Checks if the mouse is overlapping the "retry" button
 */
function checkCreationRetryButtonOverlap(mouseX, mouseY, creationRetryButton) {
    return (mouseX > creationRetryButton.x - creationRetryButton.w / 2 &&
        mouseX < creationRetryButton.x + creationRetryButton.w / 2 &&
        mouseY > creationRetryButton.y - creationRetryButton.h / 2 &&
        mouseY < creationRetryButton.y + creationRetryButton.h / 2);
}
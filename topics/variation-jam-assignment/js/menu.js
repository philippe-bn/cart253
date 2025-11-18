/**
 * This menu file contains the code to run *only* the menu part of the program.
 * Note how it has its own draw, menuDraw(), and its own keyPressed, menuKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

// The images of the keys used in the menu
let spacebar;
let arrowKeys;

// An array for our buttons
let buttons = [];

/**
 * Preloads the images
 */
function menuPreload() {
    spacebar = loadImage('assets/images/spacebar.png');
    arrowKeys = loadImage('assets/images/arrowKeys.png');
}

function menuSetup() {
    // In the menu, we use a specific frog which we will retrieve from the frog JSON file
    frog = frogData.frog.menu;

    // Set the font for the game
    textFont('Courier New');
    // Make each button object a recognizable "button"
    edenButton = createVariationButton(100, 140, "The Swamp of Eden");
    buttons.push(edenButton);
    paradiseButton = createVariationButton(250, 70, "Paradise");
    buttons.push(paradiseButton);
    hellButton = createVariationButton(400, 60, "Hell");
    buttons.push(hellButton);
}

/**
 * Draws a game menu
 */
function menuDraw() {
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

    for (let button of buttons) {
        drawVariationButtons(button);
    }

    for (let button of buttons) {
        checkButtonOverlap(mouseX, mouseY, button);
    }
}

/**
 * This will be called whenever the mouse is pressed while the menu is active
 */
function menuMousePressed() {
    switch (state) {
        case "menu":
            if (checkButtonOverlap(mouseX, mouseY, edenButton)) {
                state = "eden-variation";
                edenSetup();
            }
            if (checkButtonOverlap(mouseX, mouseY, paradiseButton)) {
                state = "paradise-variation";
                paradiseSetup();
            }
            if (checkButtonOverlap(mouseX, mouseY, hellButton)) {
                state = "hell-variation";
                hellSetup();
            }
            break;
    }
}

/**
 * Displays the frog (body)
 */
function drawFrog() {
    drawFrogBody();
    drawFrogEyes();
}

function drawFrogBody() {
    background(frog.body.fill);
}

function drawFrogEyes() {
    // Draw the frog's eyes
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

function createVariationButton(y, w, text) {
    const newButton = structuredClone(buttonData);
    newButton.y = y;
    newButton.w = w;
    newButton.text = text;
    return newButton;
}

// Draw the buttons for each variation
function drawVariationButtons(button) {
    push();
    rectMode(CENTER);
    noStroke();
    fill(button.fill);
    rect(button.x, button.y, button.w, button.h, 10);
    pop();
    push();
    textAlign(CENTER, CENTER);
    fill(0);
    text(button.text, button.x, button.y);
    pop();
}

function checkButtonOverlap(mouseX, mouseY, button) {
    return (mouseX > button.x - button.w / 2 &&
        mouseX < button.x + button.w / 2 &&
        mouseY > button.y - button.h / 2 &&
        mouseY < button.y + button.h / 2);
}
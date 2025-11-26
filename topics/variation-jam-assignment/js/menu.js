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

// The state of the menu
let menuState = undefined;

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
    // Same for the text
    textDisplay = textData.text.menu;

    // Make each button object a recognizable "button"
    returnButton = createPersonalizedButton(27, 30, 70, textDisplay.returnButton);
    buttons.push(returnButton);
    creationButton = createPersonalizedButton(200, 100, 70, textDisplay.creationButton);
    buttons.push(creationButton);
    edenButton = createPersonalizedButton(440, 100, 70, textDisplay.edenButton);
    buttons.push(edenButton);
    paradiseButton = createPersonalizedButton(200, 400, 70, textDisplay.paradiseButton);
    buttons.push(paradiseButton);
    hellButton = createPersonalizedButton(440, 400, 70, textDisplay.hellButton);
    buttons.push(hellButton);

    // Start the menu state at 1
    menuState = 1;
}

/**
 * Draws a game menu
 */
function menuDraw() {
    // The start menu
    if (menuState === 1) {
        cursor(HAND);

        // Start menu is a big frog body covering the screen
        drawFrog();

        // Write the title
        push();
        textSize(70);
        textAlign(CENTER);
        text(textDisplay.title, width / 2, 100);
        pop();

        // Write the instructions
        push();
        rectMode(CENTER);
        textSize(16);
        textAlign(CENTER);
        text(textDisplay.instruction1, width / 2, 150, width / 2);
        pop();
        push();
        textSize(12);
        textAlign(LEFT);
        text(textDisplay.instruction2, width / 9, 8 * height / 9 - 10, 250, 50);
        image(spacebar, width / 2 + 50, 410, 120, 40);
        image(arrowKeys, width / 2 + 200, 400, 70, 50);
        pop();
    }

    // The menu with the buttons
    if (menuState === 2 || menuState === 3) {
        cursor(HAND);

        drawFrog();

        // Write the instructions
        push();
        textSize(16);
        textAlign(CENTER);
        text(textDisplay.instruction3, width / 2, 50);
        pop();

        for (let button of buttons) {
            drawVariationButtons(button);
        }

        for (let button of buttons) {
            checkButtonOverlap(mouseX, mouseY, button);
        }
    }
}

/**
 * This will be called whenever the mouse is pressed while the menu is active
 */
function menuMousePressed() {
    // Switch the menu to the one with the buttons
    menuState += 1;
    menuState = constrain(menuState, 1, 3);

    // Switch the game state to a variation by checking which button was clicked
    if (menuState === 3) {
        if (checkButtonOverlap(mouseX, mouseY, returnButton)) {
            menuState -= 2;
        }
        switch (state) {
            case "menu":
                if (checkButtonOverlap(mouseX, mouseY, creationButton)) {
                    state = "creation-variation";
                    creationSetup();
                }
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

/**
 * Draw the buttons for each variation and the return button
 */
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

/**
 * Checks for any button overlap
 */
function checkButtonOverlap(mouseX, mouseY, button) {
    return (mouseX > button.x - button.w / 2 &&
        mouseX < button.x + button.w / 2 &&
        mouseY > button.y - button.h / 2 &&
        mouseY < button.y + button.h / 2);
}

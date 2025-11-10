/**
 * This menu file contains the code to run *only* the menu part of the program.
 * Note how it has its own draw, menuDraw(), and its own keyPressed, menuKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

// The images of the keys used in the game
let spacebar;
let arrowKeys;

// Our frog
const frog = {
    // The frog's body has a position, a size and a fill
    body: {
        x: 320,
        y: 520,
        size: 150,
        fill: "#00ff00"
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

/**
 * Preloads the images
 */
function preload() {
    spacebar = loadImage('assets/images/spacebar.png');
    arrowKeys = loadImage('assets/images/arrowKeys.png');
}

function menuSetup() {
    // Set the font for the game
    textFont('Courier New');
    // Make each button object a recognizable "button"
    button = createVariationButton(100, "The Swamp of Eden");
    button = createVariationButton(250, "Paradise");
    button = createVariationButton(400, "Hell");
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

    drawVariationButtons();
}

/**
 * This will be called whenever the mouse is pressed while the menu is active
 */
function menuMousePressed() {
    switch (state) {
        case eden:
            state = "eden-variation";
            edenSetup();
            break;

        case paradise:
            state = "paradise-variation";
            paradiseSetup();
            break;

        case hell:
            state = "hell-variation";
            hellSetup();
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

function createVariationButton(y, text) {
    // Our buttons
    // Have a position, size, colour and text
    const button = {
        x: 320,
        y: y,
        w: 70,
        h: 30,
        fill: "#00ff00",
        text: text
    };
    return button;
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
    fill(0);
    text(button.text, button.x - button.w / 4, button.y + button.h / 6);
    pop();
}

function checkButtonOverlap(mouseX, mouseY, button) {
    return (mouseX > button.x - button.w / 2 &&
        mouseX < button.x + button.w / 2 &&
        mouseY > button.y - button.h / 2 &&
        mouseY < button.y + button.h / 2);
}
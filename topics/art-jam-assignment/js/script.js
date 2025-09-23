/**
 * Self Portrait
 * Philippe Beauchemin
 * 
 * A creative self portrait.
 * 
 * Uses:
 * p5.js
 * https://p5js.org/
 * Conditionals module
 */

"use strict";

// Create background objects
    // Create a rainbow object
    let rainbow= {
        y: 0
    }

    // Create a music object
    let music= {
        y: 0
    }

// Create body parts objects
    // Create an elbow object
    let elbow= {
        x: 130,
        y: 560
    }

    // Create a forearm object
    let forearm= {
        x: 0,
        y: -160
    } 

    // Angle for the forearm
    let angle = 0;

    // Create the corners of my mouth as an object
    let mouth= {
        y1: 400,
        bezier1: 440,
        bezier2: 420,
        y2: 400
    }

    // Create my left eye as an object
    let leftEye= {
        x: 370,
        y: 340,
        size: 25
    }

    // Create my right eye as an object
    let rightEye= {
        x: 425,
        y: 340,
        size: 25
    }

/**
 * Creates the canvas
 */
function setup() {
    // A rectangular canvas to work with
    createCanvas(640, 700);
    angle = mouseX * -1;
}

/**
 * Draws the portrait
 */
function draw() {
    // A background
    background('#ebff55ff');

    drawBackgroundElements();
    drawBody();
    checkInput();

function drawBackgroundElements() {
    // Draw emojis
    push();
    textSize(150);
    // I mention later in my code that it is my first time using this function, I added this after
    // Rainbow
    rainbow.y = map(mouseY, 0, 700, 40, 700);
    text('🌈', 200, rainbow.y + 150);
    pop();
    push();
    textSize(150);
    // Music
    music.y = map(mouseY, 0, 700, 200, 700);
    text('🎵', 0, music.y + 150);
    pop();
    push();
    textSize(150);
    // Invader
    text('👾', 200, rainbow.y + 400);
    pop();

}
function drawBody() {
    drawChest();
    drawNeck();
    drawHead();
    drawArm();

    function drawChest() {
        // Black T-shirt
        push();
        fill(40);
        noStroke();
        rect(290, 490, 220, 300, 35);
    }

    function drawNeck() {
        push();
        fill('#FFD6C5');
        noStroke();
        ellipse(400, 490, 80, 100);
        pop();
    }

    function drawHead() {
        drawHeadOutline();
        drawFace();
        drawHair();

        function drawHeadOutline() {
            push();
            fill('#feded1ff');
            noStroke();
            ellipse(400, 350, 175, 250);
            pop();
        }

        function drawFace() {
            drawSmile();
            drawEyes();
            drawGlasses();
            drawNose();
            drawEyebrows();

            function drawSmile() {
                push();
                fill(255);
                noStroke();
                bezier(370, mouth.y1, 400, mouth.bezier1, 420, mouth.bezier2, 430, mouth.y2);
                pop();
            }

            function drawEyes() {
                //Whites
                push();
                fill(255);
                ellipse(leftEye.x, leftEye.y, leftEye.size);
                ellipse(rightEye.x, rightEye.y, rightEye.size);
                pop();
                //Irises
                push();
                fill(0, 0, 255);
                ellipse(leftEye.x, leftEye.y, leftEye.size - 13);
                ellipse(rightEye.x, rightEye.y, rightEye.size - 13);
                pop();
                //Pupils
                push();
                fill(0);
                ellipse(leftEye.x, leftEye.y, leftEye.size - 21);
                ellipse(rightEye.x, rightEye.y, rightEye.size - 21);
                pop();
            }

            function drawGlasses() {
                push()
                noFill();
                stroke(0);
                strokeWeight(2);
                // Lenses
                ellipse(leftEye.x, leftEye.y - 1, leftEye.size + 15, leftEye.size + 10);
                ellipse(rightEye.x, rightEye.y - 1, rightEye.size + 15, rightEye.size + 10);
                // Bridge - I had never used this function before
                arc((leftEye.x + rightEye.x)/2, rightEye.y, 50, 15, PI + QUARTER_PI, TWO_PI - QUARTER_PI);
                // Branches
                line(leftEye.x - 16, leftEye.y - 10, leftEye.x - 58, leftEye.y - 15);
                line(rightEye.x + 16, rightEye.y - 10, rightEye.x + 58, rightEye.y - 15);
                pop();
            }

            function drawNose() {
                push();
                noFill();
                stroke(0);
                line(395, 350, 390, 370);
                bezier(390, 370, 390, 380, 400, 380, 400, 380)
                pop();
            }

            function drawEyebrows() {
                push();
                noFill();
                strokeWeight(5);
                stroke('#3f231aff');
                bezier(350, 320, 360, 315, 360, 310, 380, 315)
                bezier(445, 320, 435, 315, 435, 310, 415, 315)
                pop();
            }
        }

        function drawHair() {
            push();
            fill('#542819ff');
            noStroke();
            //Big curls
            ellipse(400, 240, 75);
            ellipse(375, 245, 75);
            ellipse(370, 265, 75);
            ellipse(425, 250, 75);
            ellipse(445, 260, 55);
            //Small curls
            ellipse(312, 300, 40);
            ellipse(312, 310, 40);
            ellipse(315, 290, 40);
            ellipse(325, 270, 45);
            ellipse(330, 290, 45);
            ellipse(335, 250, 45);
            ellipse(455, 275, 45);
            ellipse(470, 285, 45);
            ellipse(470, 290, 45);
            pop();
        }
    }

    function drawArm() {
        drawSleeve();
        drawBicep();
        drawForearm();

        function drawSleeve() {
            // T-shirt sleeve
            push();
            fill(40);
            rect(230, 500, 120, 70)
            pop();
        }

        function drawBicep() {
            // Bicep
            push();
            fill('#FFD6C5');
            noStroke();
            quad(elbow.x, elbow.y, elbow.x + 100, elbow.y, elbow.x + 100, elbow.y - 60, elbow.x + 20, elbow.y - 60);
            pop();
        }

        function drawForearm() {
            // Forearm, hand and fingers
            push();
            fill('#FFD6C5');
            noStroke();
            // Trying out a new function (I've used this last year but I did not remember how to use it) - this makes the center become the elbow
            translate(elbow.x, elbow.y);
            // Same goes for rotate - this allows me to rotate around the elbow
            rotate(angle);
            // Trying to debug by mapping the mouseX position to fit the values I want for the angle - I have never used this function before but I have used this similar map/scale in Max MSP
            angle = map(mouseX, 0, 640, -19.5, -18.6);
            angle = constrain(angle, -19.5, -18.6);
            // 0 is elbow.x, I draw the forearm from the side of the wrist above it (forearm.x = 0, so forearm.x is actually 130 at first, forearm.y = -160, so forearm.y is actually 400 at first)
            // Forearm
            quad(forearm.x, forearm.y, forearm.x + 60, forearm.y, forearm.x + 60, forearm.y + 140, forearm.x, forearm.y + 160);
            // Hand
            ellipse(forearm.x + 30, forearm.y - 25, 80);
            // Fingers
            ellipse(forearm.x, forearm.y - 50, 20, 100);
            ellipse(forearm.x + 20, forearm.y - 60, 20, 100);
            ellipse(forearm.x + 40, forearm.y - 65, 20, 100);
            ellipse(forearm.x + 60, forearm.y - 60, 20, 100);
            ellipse(forearm.x + 70, forearm.y - 30, 50, 20);
            pop();
        }
    }
}
}

function mousePressed() {
    // Make the smile go up
    mouth.y1 = mouth.y1 - 5;
    mouth.bezier1 = mouth.bezier1 - 5;
    mouth.bezier2 = mouth.bezier2 - 5;
    mouth.y2 = mouth.y2 - 5;
}

function mouseReleased() {
    // Make the smile go back to normal
    mouth.y1 = mouth.y1 + 5;
    mouth.bezier1 = mouth.bezier1 + 5;
    mouth.bezier2 = mouth.bezier2 + 5;
    mouth.y2 = mouth.y2 + 5;
}


function checkInput() { // Credit to Conditionals pt. 2 module
    // Calculate the distance between the cursor and each eye
    // and put it into two "distance" variables (using const again since
    // we won't change this again later!)
    const distanceLeftEye = dist(mouseX, mouseY, leftEye.x, leftEye.y);
    const distanceRightEye = dist(mouseX, mouseY, rightEye.x, rightEye.y);
    // Calculate whether the mouse overlaps the eyes by checking whether
    // the distance is less than their radius! (Half their diameter)
    const mouseIsOverlappingLeftEye = (distanceLeftEye < leftEye.size/2);
    const mouseIsOverlappingRightEye = (distanceRightEye < rightEye.size/2);
    if (mouseIsOverlappingLeftEye) {
        // The cursor is overlapping the left eye
        // The eyelid is closed
        push();
        fill('#FFD6C5');
        noStroke();
        ellipse(leftEye.x, leftEye.y, leftEye.size);
        pop();
    }
    if (mouseIsOverlappingRightEye) {
        // The cursor is overlapping the right eye
        // The eyelid is closed
        push();
        fill('#FFD6C5');
        noStroke();
        ellipse(rightEye.x, rightEye.y, rightEye.size);
        pop();
    }
}

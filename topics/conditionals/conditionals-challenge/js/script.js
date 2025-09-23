/**
 * Ball game
 * Philippe Beauchemin and Dyna Benaziza
 *
 * This is a program in which the user can push a ball
 * on the canvas into a goal.
 */

const puck = {
  x: 200,
  y: 200,
  diameter: 100,
  fill: "#ff0000"
};

const user = {
  x: undefined, // will be mouseX
  y: undefined, // will be mouseY
  diameter: 75,
  fill: "#000000"
};

const target = {
    x: 300,
    y: 100,
    diameter: 100,
    fill: "#87ff07ff"
};

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Move the user circle, check for overlap, draw the two circles
 */
function draw() {
  background("#aaaaaa");
  
  // Move user circle
  moveUser();
  
  // Draw the user and ball (or puck) and target
  drawUser();
  drawPuck();
  drawTarget();

  // Move the ball/puck and check if it is inside goal
  movePuck();
  checkTarget();
}

/**
 * Sets the user position to the mouse position
 */
function moveUser() {
  user.x = mouseX;
  user.y = mouseY;
}

/**
 * Displays the user circle
 */
function drawUser() {
  push();
  noStroke();
  fill(user.fill);
  ellipse(user.x, user.y, user.diameter);
  pop();
}

/**
 * Displays the puck circle
 */
function drawPuck() {
  push();
  noStroke();
  fill(puck.fill);
  ellipse(puck.x, puck.y, puck.diameter);
  pop();
}

/**
 * Displays the target
 */
function drawTarget() {
    push();
    noStroke();
    fill(target.fill);
    ellipse(target.x, target.y, target.diameter);
    pop();
}

// Moves the puck according to the user's position
function movePuck() {
    const distanceUserPuck = dist(puck.x, puck.y, user.x, user.y);
    const userPuckOverlap = ((distanceUserPuck) < (user.diameter / 2 + puck.diameter / 2)); // there is an overlap when the distance between the user and the puck is smaller than their two radiuses added
    if (userPuckOverlap) {
        if (user.x < puck.x) {
            puck.x = puck.x + 5;
        }
        else if (user.x > puck.x) {
            puck.x = puck.x - 5;
        }
        if (user.y < puck.y) {
            puck.y = puck.y + 5;
        }
        else if (user.y > puck.y) {
            puck.y = puck.y - 5;
        }
    }
    puck.x = constrain(puck.x, puck.diameter/2, width - puck.diameter/2);
    puck.y = constrain(puck.y, puck.diameter/2, height - puck.diameter/2);
}

// Checks if the puck is inside the target
function checkTarget() {
    const distancePuckTarget = dist(puck.x, puck.y, target.x, target.y);
    const targetPuckOverlap = ((distancePuckTarget) < (target.diameter / 2 + puck.diameter / 2)); // there is an overlap when the distance between the user and the puck is smaller than their two radiuses added
    if (targetPuckOverlap) {
        target.fill = "#333333";
    }
    else
        target.fill = "#87ff07ff";
}
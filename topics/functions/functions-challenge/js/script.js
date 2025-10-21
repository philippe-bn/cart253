/**
 * Balls Balls Balls And Paddle
 * Philippe Beauchemin and Kerven-Laurent Casimir
 * 
 * The starting point for a ball-bouncing experience of
 * epic proportions!
 */

"use strict";

// Our balls
let ball1 = undefined;
let ball2 = undefined;
let ball3 = undefined;

// Our paddle
const paddle = {
    x: 300,
    y: 280,
    width: 80,
    height: 10
};

/**
 * Create the canvas
*/
function setup() {
    createCanvas(600, 300);

    ball1 = createBall(300, 2);
    ball2 = createBall(100, 3);
    ball3 = createBall(500, 1)
}


/**
 * Move and display the ball and paddle
*/
function draw() {
    background("#87ceeb");

    drawPaddle(paddle);
    drawBall(ball1);
    drawBall(ball2);
    drawBall(ball3);

    movePaddle(paddle);
    moveBall(ball1);
    moveBall(ball2);
    moveBall(ball3);

    handleBounce(ball1, paddle);
    handleBounce(ball2, paddle);
    handleBounce(ball3, paddle);
}

/**
 * Creates a ball with properties
 */
function createBall(x, velocity) {
    const ball = {
        x: x,
        y: 20,
        width: 10,
        height: 10,
        velocity: {
            x: 0,
            y: velocity
        }
    };
    return ball;
}

/**
 * Draws the specified paddle on the canvas
 */
function drawPaddle(paddle) {
    push();
    rectMode(CENTER);
    noStroke();
    fill("yellow");
    rect(paddle.x, paddle.y, paddle.width, paddle.height);
    pop();
}

/**
 * Draws a ball on the canvas
 */
function drawBall(ball) {
    push();
    rectMode(CENTER);
    noStroke();
    fill("yellow");
    rect(ball.x, ball.y, ball.width, ball.height);
    pop();
}

/**
 * Moves the paddle
*/
function movePaddle(paddle) {
    paddle.x = mouseX;
    paddle.x = constrain(paddle.x, paddle.width / 2, width - paddle.width / 2);
}

/**
 * Moves the ball passed in as a parameter
 */
function moveBall(ball) {
    ball.y += ball.velocity.y;
}

/**
 * Bounces the provided ball off the provided paddle
 */
function handleBounce(ball, paddle) {
    if (checkOverlap(ball, paddle)) {
        ball.velocity.y *= -1;
    }
}


/**
 * Returns true if ball and paddle overlap, and false otherwise
 * Assumes ball and paddle have properties x, y, width and height to describe
 * their rectangles, and that ball and paddle are displayed CENTERED on their
 * x,y coordinates.
 */
function checkOverlap(ball, paddle) {
    return (ball.x + ball.width / 2 > paddle.x - paddle.width / 2 &&
        ball.x - ball.width / 2 < paddle.x + paddle.width / 2 &&
        ball.y + ball.height / 2 > paddle.y - paddle.height / 2 &&
        ball.y - ball.height / 2 < paddle.y + paddle.height / 2);
}
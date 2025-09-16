/**
 * Mr. Furious
 * Philippe Beauchemin and Dyna Benaziza
 *
 * A guy who becomes visibly furious!
 */

"use strict";

// Our friend Mr. Furious
let mrFurious = {
    // Position and size
    x: 200,
    y: 200,
    size: 100,
    // Colour
    fill: {
        r: 255,
        g: 225,
        b: 225
  }
};

// The blue sky in the day
let sky = {
    fill: {
        r: 160,
        g: 180,
        b: 200
    }
}

// An annoying bird
let bird = {
    x: 0,
    y: undefined,
    size: 50,
    velocity: 0,
    fill: {
        r: 200,
        g: 200,
        b: 200
    }
}

// The rage contained in Mr. Furious
let rage = {
    rightShaking: 0,
    leftShaking: 0,
    emotion: 1
}

/**
 * Create the canvas
 */
function setup() {
    createCanvas(400, 400);
    bird.y = height/2;
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {
    background(sky.fill.r, sky.fill.g, sky.fill.b);
  
    // Draw Mr. Furious as a coloured circle
    push();
    noStroke();
    fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
    ellipse(mrFurious.x, mrFurious.y, mrFurious.size);
    pop();

    // Mr. Furious gets more red
    mrFurious.fill.g -= rage.emotion;
    constrain(mrFurious.fill.g, 0, 225);
    mrFurious.fill.b -= rage.emotion;
    constrain(mrFurious.fill.b, 0, 225);

    // Day turns into night
    sky.fill.r -= 0.5;
    sky.fill.g -= 0.5;
    sky.fill.b -= 0.5;

    // Draw the bird
    push();
    noStroke();
    fill(bird.fill.r, bird.fill.g, bird.fill.b);
    ellipse(bird.x, bird.y, bird.size);
    pop();

    // Animate the bird
    bird.velocity += 0.015;
    bird.x += bird.velocity;
    bird.y = 45 * sin(frameCount * 0.05) + 200;

    // Mr. Furious starts shaking
    rage.leftShaking -= 0.1;
    rage.rightShaking += 0.1;
    rage.leftShaking = constrain(rage.leftShaking, -10, 0);
    rage.rightShaking = constrain(rage.rightShaking, 0, 10);
    mrFurious.x += random(rage.leftShaking, rage.rightShaking);
    mrFurious.x = constrain(mrFurious.x, 0, 400);
}
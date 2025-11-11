/**
 * Machines
 * Pippin Barr
 * 
 * A starting point for a project that displays different machines
 * on the canvas. Eventually I'd like to be able to drag and drop
 * items onto the machines and have them act in different ways.
 * For now I'm happy to just show that they're distinct.
 */

"use strict";

const machineWidth = 100;
const machineHeight = 100;

// An array of machines data
let machines = [
    {
        type: "incinerator",
        x: 0,
        y: 100,
        width: machineWidth,
        height: machineHeight,
        fill: "#ff4400",
    },
    {
        type: "freezer",
        x: 150,
        y: 100,
        width: machineWidth,
        height: machineHeight,
        fill: "#bbbbff",
    },
    {
        type: "crusher",
        x: 300,
        y: 100,
        width: machineWidth,
        height: machineHeight,
        fill: "#777777"
    }
];

/**
 * Create the canvas
 */
function setup() {
    createCanvas(400, 200);
}

/**
 * Display the three machines
 */
function draw() {
    background(0);

    // Go through the machine in the array and draw them
    for (let machine of machines) {
        drawMachine(machine);
    }

}

function drawMachine(machine) {
    push();
    noStroke();
    fill(machine.fill);
    rect(machine.x, machine.y, machine.width, machine.height);
    pop();
}
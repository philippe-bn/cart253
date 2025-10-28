let speech = ["Veni.", "Vidi.", "Vici.", "Sensi malum."];
let speechIndex = 0;

function setup() {
    createCanvas(600, 100);
}

function draw() {
    background(0);

    // Get the current line of our speech
    let currentLine = speech[speechIndex];

    // Display it
    push();
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER); // Centered horizontally and vertically
    text(currentLine, width / 2, height / 2); // Centered on the canvas
    pop();
}

function mousePressed() {
    speechIndex = speechIndex + 1;
    // Or: speechIndex += 1;
    // Or: speechIndex++;
    if (speechIndex >= speech.length) {
        // If so, reset it to 0 (go back to the beginning)
        speechIndex = 0;
    }
}
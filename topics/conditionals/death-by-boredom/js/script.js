// Our creature
const creature = {
  // Position
  x: 200,
  y: 200,
  // Size
  size: 200,
  // Fill
  fill: "#000000", // Starts out bored
  // Possible fills for the creature that show its mood
  // We'll need these when we start changing its colour
  // and its nice to keep them along with all the other info
  // about the creature
  fills: {
    bored: "#000000", // Black
    happy: "#33cc33", // Green
    angry: "#cc3333", // Red
    dead: "#777777" // Grey
  },
  // Is the creature alive?
  alive: true,
  // How bored is the creature right now?
  boredomLevel: 0,
  // How bored can the creature get before dying (in frames)
  deathByBoredomThresshold: 500
};

/**
 * Creates the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Fills the background, displays the creature 
 */
function draw() {
  background(255, 200, 127);
  
  checkInput();
  drawCreature();
}
/**
 * Creature is happy if being massaged and otherwise bored... sometimes to death
 */
function checkInput() {
    // Check if the creature is dead
    // Which is to say if it is NOT alive
    if (!creature.alive) {
        // If it's dead, just stop this function here
        // so that we don't check out massaging and so on
        return;
    }
    
    // If we get to here it means the creature IS alive (because the
    // if-statement above didn't trigger)
    
    // Calculate the distance between the cursor and the creature
    // and put it into a "distance" variable (using const again since
    // we won't change this again later!)
    const distance = dist(mouseX, mouseY, creature.x, creature.y);
    // Calculate whether the mouse overlaps the creature by checking whether
    // the distance is less than its radius! (Half its diameter)
    const mouseIsOverlapping = (distance < creature.size/2);
    // Check if EITHER movedX OR movedY are NOT equal to zero
    // and store the result in our mouseIsMoving variable (another
    // const because we don't want to change it later)
    const mouseIsMoving = (movedX !== 0 || movedY !== 0);
    // Check if the mouse if over the creature and moving
    if (mouseIsOverlapping && mouseIsMoving) {
        // The cursor is overlapping the creature AND it's moving
        // So the creature is happy! Massage!
        creature.fill = creature.fills.happy;
    }
    else {
        // Otherwise the creature is bored
        creature.fill = creature.fills.bored;
        // Increase its boredom level by one
        creature.boredomLevel += 1;
        // Check if the creature has died of boredom
        if (creature.boredomLevel > creature.deathByBoredomThresshold) {
            // Creature dies of boredom!
            creature.alive = false;
            // Creature turns dead coloured!
            creature.fill = creature.fills.dead;
        }
    }
}

/**
 * Handles the creature becoming happy
 */
function creatureHappy() {
    creature.fill = creature.fills.happy;
}

/**
 * Handles the creature becoming bored
 */
function creatureBored() {
    creature.fill = creature.fills.bored;
    // Increase its boredom level by one
    creature.boredomLevel += 1;
    // Check if the creature has died of boredom
    if (creature.boredomLevel > creature.deathByBoredomThresshold) {
        // Creature dies of boredom!
        creature.alive = false;
        // Creature turns dead coloured!
        creature.fill = creature.fills.dead;
    }
}

/**
 * Draws the creature
 */
function drawCreature() {
  push();
  noStroke();
  // Use the creature's fill
  fill(creature.fill);
  // Display the creature at its position and size
  ellipse(creature.x, creature.y, creature.size);
  pop();
}
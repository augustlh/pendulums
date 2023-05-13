

//erklæring af globale variabler
let world;

let simView;
let uiView;

/**
 * @description p5.js setup function
 * @returns {void}
 */
function setup() {
  createCanvas(800, 550);
  frameRate(60)
  simView = new Vector(0, width/1.55)
  uiView = new Vector(simView.y, width-simView.y)
  
  world = new World([new Pendulum(1, 1, 1, Math.PI/4, new Vector(simView.y/2,height/2)), new DoublePendulum(1, 1, 1, 0, new Vector(simView.y/2,height/2), 1, 1, 1, Math.PI/4)], simView, uiView);
  
  
}

/**
 * @description p5.js draw function (called every frame) and is used to simulate the model (world)
 * @returns {void}
 */
function draw() {
  background(255);
  world.simulate(deltaTime/1.2 * world.PHYSICS.dt)
}

/**
 * @description p5.js function that is called when the mouse is pressed
 * @returns {void}
 */
function mousePressed(){
  if(mouseX < simView.y){
    world.controller.mousePressed();
  }
}

/**
 * @description p5.js function that is called when the mouse is released
 * @returns {void}
 */
function mouseReleased(){
  if(mouseX < simView.y){
    world.controller.mouseReleased();
  }
}

/**
 * @description Checks if a vector is contained in an array of vectors
 * @param {Vector} value 
 * @param {Array} array 
 * @returns {Boolean}
 */
function contains(value, array){
  for(let i = 0; i < array.length; i++){
    if(abs(array[i].x - value.x) < 0.06 && abs(array[i].y - value.y) < 0.06){
      return true;
    }
    return false;
  }
}
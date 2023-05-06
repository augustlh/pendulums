
let world;

let simView;
let uiView;

function setup() {
  createCanvas(780, 550);
  frameRate(60)
  simView = new Vector(0, width/1.55)
  uiView = new Vector(simView.y, width-simView.y)
  
  world = new World([new SimplePendulum(1, 1, 1, Math.PI/4, new Vector(simView.y/2,height/2)), new DoublePendulum(1, 1, 1, 0, new Vector(simView.y/2,height/2), 1, 1, 1, Math.PI/4)], simView, uiView);
  //world = new World([new Pendulum(1, 1, 1, Math.PI/4, new Vector(simView.y/2,height/2)), new DoublePendulum(1, 1, 1, 0, new Vector(simView.y/2,height/2), 1, 1, 1, Math.PI/4)], simView, uiView);
  //world = new Pendulum(1, 1, 1, Math.PI/4, new Vector(simView.y/2,height/2))
}

function draw() {
  background(255);
  world.simulate(deltaTime/1.2 * world.PHYSICS.dt)
}

//MAYBE DELETE THIS
function contains(array, target) {
  return array.some(function(value) {
    return Math.abs(value - target) <= 0.5;
  });
}

function mousePressed(){
  if(mouseX < simView.y){
    world.controller.mousePressed();
  }
}

function mouseReleased(){
  if(mouseX < simView.y){
    world.pendulumState = world.pendulumStates.idle;
    world.pendulums[1].dragging = 0;
  }
}
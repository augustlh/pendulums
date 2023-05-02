let pendulum;
//let doublePendulum;
let world;

let simView;
let uiView;

function setup() {
  createCanvas(780, 550);
  simView = new Vector(0, width/1.55)
  uiView = new Vector(simView.y, width-simView.y)
  world = new World([new SimplePendulum(1, 1, 1, Math.PI/4, new Vector(simView.y/2,height/2)), new DoublePendulum(1, 1, 1, Math.PI/4, new Vector(simView.y/2,height/2), 1, 1, 1, Math.PI/4)], simView, uiView);
}

function draw() {
  background(255);
  world.simulate(deltaTime * world.PHYSICS.dt)
}


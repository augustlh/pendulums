//Modellen i MVC-pattern
class World{
    constructor(pendulums, simView, uiView){
      this.stateMachine = new StateMachine('simple-pendulum');
      this.pendulums = pendulums;
      this.pendulumStates = {idle: 0, running: 1,dragging: 2}
      this.PHYSICS = {g: 9.82, h: 0.01, dt: 0.00065}
      this.time = 0.0;
      this.pendulumState = this.pendulumStates.idle;
      this.viewer = new Viewer()
      this.controller = new Controller()
      this.ui = new Ui(new Vector(uiView.x, 0), new Vector(uiView.y,height), this.controller);
  
    }
    
    /**
     * @description Method that simulates the model (world)
     * @param {Number} dt 
     * @returns {void}
     */
    simulate(dt){
      this.controller.update(this.stateMachine.getState())
      this.update(dt)
      this.viewer.display(this.stateMachine.getState())
    }

    /**
     * @description Method that updates the pendulum part of the model (world)
     * @param {Number} dt 
     */
    update(dt){
      if(this.stateMachine.getState() == 'simple-pendulum' && this.pendulumState == this.pendulumStates.running || this.stateMachine.getState() == 'simple-pendulum-graph' && this.pendulumState == this.pendulumStates.running){
        this.pendulums[0].update(dt)
        this.time += dt;
      } else if(this.stateMachine.getState() == 'double-pendulum' && this.pendulumState == this.pendulumStates.running|| this.stateMachine.getState() == 'double-pendulum-graph' && this.pendulumState == this.pendulumStates.running){
        this.pendulums[1].update(dt)
        this.time += dt;
      } else if(this.stateMachine.getState() == 'simple-pendulum' && this.pendulumState == this.pendulumStates.dragging){
        this.pendulums[0].drag()
      } else if(this.stateMachine.getState() == 'double-pendulum' && this.pendulumState == this.pendulumStates.dragging){
        this.pendulums[1].drag()
      }
    }

  
  }
  
  
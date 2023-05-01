//Modellen i MVC-pattern
class World{
    constructor(pendulums, simView, uiView){
      //instatiering af state machine, samt erkæring pendulums samt tildeling af værdi
      this.stateMachine = new StateMachine('simple-pendulum');
      this.pendulums = pendulums;
      this.pendulumStates = {
        idle: 0,
        running: 1,
        dragging: 2
      }

      this.time = 0.0;
  
      this.pendulumState = this.pendulumStates.idle;
      //definerer viewer
      this.viewer = new Viewer()
      //definerer controller
      this.controller = new Controller()
      this.simView = simView;
      this.uiView = uiView;

      this.ui = new Ui(new Vector(this.uiView.x, 0), new Vector(this.uiView.y,height), [57,57,57], 'visible', 0, this.controller);
  
    }
  
    simulate(dt){
      this.controller.updateModel(this.pendulumState, dt)
      this.viewer.display(this.stateMachine.getState())
      //this.ui.draw(this.stateMachine.getState())
    }

  
  }
  
  
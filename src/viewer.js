//Vieweren i MVC-pattern
/**
 * Class that displays the model based on its state. 
 * @class Viewer
 * @see World 
 */
class Viewer{
    constructor(){
    }
    
    /**
     * @description Method that displays the model (world) based on its state
     * @param {String} state 
     * @returns {void}
     */
    display(state){
      if(state == 'simple-pendulum'){
        world.pendulums[0].display()
      } else if(state == 'double-pendulum'){
        world.pendulums[1].display()
      } else if(state == 'simple-pendulum-graph'){
        world.pendulums[0].displayGraph()
      } else if(state == 'double-pendulum-graph'){
        world.pendulums[1].displayGraph()
      }


      world.ui.draw(state)

      push()
      stroke(230)
      line(0, height/2, simView.y, height/2)
      line(simView.y/2, 0, simView.y/2, height)
      pop()

      push()
      noStroke()
      fill(0)
      text("Tid: " + world.time.toFixed(2) + " sekunder", 10, 40)
      pop()

    }
  }
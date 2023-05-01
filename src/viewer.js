//Vieweren i MVC-pattern
class Viewer{
    constructor(){
    }
  
    display(state){


      if(state == 'simple-pendulum'){
        world.pendulums[0].display()
      } else if(state == 'double-pendulum'){
        world.pendulums[1].display()
      } else if(state == 'simple-pendulum-graph'){
        print("world.pendulums[0].displayGraphs()")
      } else if(state == 'double-pendulum-graph'){
        print("world.pendulums[1].displayGraphs()")
      }

      world.ui.draw(state)

      push()
      noStroke()
      fill(0)
      text("FPS: " + frameRate().toFixed(2), 10, 20)
      text("Tid: " + world.time.toFixed(2) + " sekunder", 10, 40)
      pop()

    }
  }
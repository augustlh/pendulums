//Controlleren i MVC-pattern
class Controller{
    constructor(){ 
      //length, length2, mass, mass2, gravity, damping
      this.sliders = [createSlider(0.1, 10, 1, 0.1), createSlider(0.1, 10, 1, 0.1),createSlider(0.1, 10, 1, 0.1),createSlider(0.1, 10, 1, 0.1), createSlider(0, 20, 9.82, 0.01),createSlider(0.1, 0.99, 0, 0.01)];
      this.defaultSliders = []
      for(let i = 0; i < this.sliders.length; i++){
        this.defaultSliders.push(this.sliders[i].value())
      }
      this.sceneDropdown = createSelect();

      this.sceneDropdown.option("simple-pendulum");
      this.sceneDropdown.option("double-pendulum");
      this.sceneDropdown.option("simple-pendulum-graph");
      this.sceneDropdown.option("double-pendulum-graph");
      //alle sliders skjules, så vieweren kan vise dem, når de skal bruges
      for(let i = 0; i < this.sliders.length; i++){
        this.sliders[i].hide()

      }

      this.playbutton = createButton('Play/Pause');
      this.playbutton.mousePressed(this.playButton);
    }

  
    updateModel(index, dt){ 
      if(this.sceneDropdown.value() != world.stateMachine.getState()){ this.transition()}
      this.updateModelParameters()


      if(index == 1){
        //sliders for simple pendulum
        if(world.stateMachine.getState() == 'simple-pendulum' || world.stateMachine.getState() == 'simple-pendulum-graph'){
          world.pendulums[0].update(dt)
        }
        else if (world.stateMachine.getState() == 'double-pendulum' || world.stateMachine.getState() == 'double-pendulum-graph'){world.pendulums[1].update(dt)}

        world.time += dt;
      } 
  
      if(world.stateMachine.getState() == 2){ world.pendulums[index].drag(); }
      
    }

    setPendulumState(state){
      world.pendulumState = state;
    }
  
    playButton(){
      if(world.pendulumState == 0  || world.pendulumState == 2){
        world.pendulumState = 1;
      } else if(world.pendulumState == 1){
        world.pendulumState = 0;
      }
      //console.log(world.pendulmState)
      //else if(world.pendulumState == 1){ world.pendulumState = 0; }
    }

    updateModelParameters(){
      if(world.stateMachine.getState() == 'simple-pendulum' || world.stateMachine.getState() == 'simple-pendulum-graph'){
        world.pendulums[0].l = this.sliders[0].value()
        world.pendulums[0].m = this.sliders[2].value()
        //world.pendulums[0].g = this.sliders[4].value()
      } else if(world.stateMachine.getState() == 'double-pendulum' || world.stateMachine.getState() == 'double-pendulum-graph'){
        world.pendulums[1].l = this.sliders[0].value()
        world.pendulums[1].l2 = this.sliders[1].value()
        world.pendulums[1].m = this.sliders[2].value()
        world.pendulums[1].m2 = this.sliders[3].value()
        //world.pendulums[0].g = this.sliders[4].value()
      }
    }

    transition(){
      world.stateMachine.transition(this.sceneDropdown.value());
        for(let i = 0; i < this.sliders.length; i++){
          this.sliders[i].value(this.defaultSliders[i])
        }
        world.ui.sliderChange(this.sceneDropdown.value())
        world.time = 0.0;
        this.setPendulumState(0)
        //world.pendulums[].reset()
        //reset pendulums
    }

    
  }
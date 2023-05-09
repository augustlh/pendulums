class StateMachine {
    constructor(state) {
      this.state = state;
      this.states = ['simple-pendulum', 'double-pendulum', 'simple-pendulum-graph', 'double-pendulum-graph']
    }
    
    //metode som opdaterer this.state ud fra en event
    transition(event) {
      switch (this.state) {
        case 'simple-pendulum':
          if(event == 'double-pendulum'){
            this.state = 'double-pendulum'
          } else if(event == 'simple-pendulum-graph'){
            this.state = 'simple-pendulum-graph'
          }
          break;
        case 'double-pendulum':
          if(event == 'simple-pendulum'){
            this.state = 'simple-pendulum'
          } else if(event == 'double-pendulum-graph'){
            this.state = 'double-pendulum-graph'
          }
          break;
        case 'simple-pendulum-graph':
          if(event == 'simple-pendulum'){
            this.state = 'simple-pendulum'
          }
          break;
        case 'double-pendulum-graph':
          if(event == 'double-pendulum'){
            this.state = 'double-pendulum'
          }
          break;
      }
    }
    
    //metode som returnerer this.state
    getState(){
      return this.state;
    }
  }
  
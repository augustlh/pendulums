class StateMachine {
    constructor(state) {
      this.state = state;
    }
  
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
  
    getState(){
      return this.state;
    }
  }
  
class Controller{
    constructor(){
        this.sliders = {
            l: createSlider(0.1, 2, 1, 0.05), 
            m: createSlider(0.1, 10, 1, 0.1), 
            l2: createSlider(0.1, 2, 1, 0.05),  
            m2: createSlider(0.1, 10, 1, 0.1), 
            gravity: createSlider(0, 20, 9.82, 0.01), 
            damping: createSlider(0, 0.995, 0, 0.005),
            timestep: createSlider(0.0001, 0.01, 0.00065, 0.00001)
        };
        this.initialValues = {l: 1, m: 1, l2: 1, m2: 1, gravity: 9.82, damping: 0, timestep: 0.00065};
        this.SLIDER_VALUES = {
            'simple-pendulum':  ['l' , 'm'],
            'double-pendulum':  ['l', 'm', 'l2', 'm2'],
            'simple-pendulum-graph': ['l', 'm'],
            'double-pendulum-graph': ['l', 'm', 'l2', 'm2']
        }

        this.sceneDropdown = createSelect();
        this.option = {
            'simple-pendulum': ['simple-pendulum', 'double-pendulum', 'simple-pendulum-graph'],
            'double-pendulum': ['double-pendulum', 'simple-pendulum', 'double-pendulum-graph'],
            'simple-pendulum-graph': ['simple-pendulum-graph', 'simple-pendulum'],
            'double-pendulum-graph': ['double-pendulum-graph', 'double-pendulum']
        }

        this.sceneDropdown.value(this.option['simple-pendulum'][0])
        for(let i = 0; i < this.option['simple-pendulum'].length; i++){
            this.sceneDropdown.option(this.option['simple-pendulum'][i])
        }

        this.buttons = {
            play: createButton('Play/Pause'),
            reset: createButton('Reset'),
            resetgraph: createButton('Reset Graph')
        }

        this.buttons.play.mousePressed(this.playButton);
        this.buttons.reset.mousePressed(this.resetButton);
        this.buttons.resetgraph.mousePressed(this.resetGraphButton);

    }

    /**
     * @description Method that updates the model (world) based on the sliders
     * @param {String} state 
     * @returns {void}
     */
    update(state){
        //kalder metoden transition
        this.transition(state)
        let index = 1;
        if(state == 'simple-pendulum' || state == 'simple-pendulum-graph'){
            index = 0;
        }
        //opdaterer værdierne i pendulet baseret på værdierne i sliders
        if(this.SLIDER_VALUES[state]){
            let name;
            for(let i = 0; i < Object.keys(this.sliders).length; i++){
                name = Object.keys(this.sliders)[i];
                world.pendulums[index][name] = this.sliders[name].value();
            }
            
            world.PHYSICS.g = this.sliders.gravity.value();
            world.PHYSICS.h = this.sliders.damping.value();
            world.PHYSICS.dt = this.sliders.timestep.value();
        }
    }

    /**
     * @description Method that resets the sliders to their initial values and resets the time
     * @param {String} state 
     * @returns {void}
     */
    reset(state){
        let name;
        for(let i = 0; i < this.SLIDER_VALUES[state].length; i++){
            name = Object.keys(this.sliders)[i];
            this.sliders[name].value(this.initialValues[name]);
        }
        this.sliders['gravity'].value(this.initialValues.gravity);
        this.sliders['damping'].value(this.initialValues.damping);
        this.sliders['timestep'].value(this.initialValues.timestep);
        world.time = 0.0;
    }

    //metoden til at håndtere reset knappen
    /**
     * @description Method that resets the model (world) and the sliders when the reset button is pressed
     * @returns {void}
     */
    resetButton(){
        world.pendulumState = world.pendulumStates.idle;
        world.pendulums[0].reset()
        world.pendulums[1].reset()
        world.controller.reset(world.stateMachine.getState())
    }

    /**
     * @description Method that checks if state-machine needs to transition and transitions it if needed
     * @param {String} state 
     * @returns {void}
     */
    transition(state){
        //tjekker om værdien af scenedropdown ikke er den samme som state-machinen 
        if(this.sceneDropdown.value() != world.stateMachine.getState()){ 
            //state machine transition, reset alle sliders og ændre lokation af genstande i UI
            world.stateMachine.transition(this.sceneDropdown.value())
            
            //dropdown logic reset
            //fjerner alle options fra dropdown og sætter dem til de rigtige på baggrund af state
            this.sceneDropdown.remove()
            this.sceneDropdown = createSelect();
            for(let i = 0; i < this.option[world.stateMachine.getState()].length; i++){
                this.sceneDropdown.option(this.option[world.stateMachine.getState()][i])
            }
            world.pendulumState = world.pendulumStates.idle;
            this.sceneDropdown.value(this.option[world.stateMachine.getState()][0])
            world.ui.transition(world.stateMachine.getState())

            if(world.stateMachine.getState() == 'simple-pendulum' && state == 'double-pendulum' || world.stateMachine.getState() == 'double-pendulum' && state == 'simple-pendulum'){
                this.reset(world.stateMachine.getState())
            }
        }
    }

    /**
     * @description Method that changes the state of the pendulum (world) when the play/pause button is pressed
     * @returns {void}
     */
    playButton(){
        if(world.pendulumState == world.pendulumStates.idle || world.pendulumState == world.pendulumStates.dragging){
            world.pendulumState = world.pendulumStates.running;
        } else if(world.pendulumState == world.pendulumStates.running){
            world.pendulumState = world.pendulumStates.idle;
        }
    }

    /**
     * @description Method that resets the graph of the pendulum (world) when the reset graph button is pressed
     * @returns {void}
     */
    resetGraphButton(){
        world.pendulums[0].points = []
        world.pendulums[1].points = []
    }

    /**
     * @description Method that handles the mouseDown event
     * @returns {void}
     */
    mousePressed(){
        if(world.stateMachine.getState() == 'simple-pendulum'){
            //pendulet sættes i draggin state
            world.pendulumState = world.pendulumStates.dragging;
        } else if(world.stateMachine.getState() == 'double-pendulum'){
            //pendulet sættes i dragging state og metoden clicker kaldes
            world.pendulumState = world.pendulumStates.dragging;
            world.pendulums[1].clicked(mouseX, mouseY);
        }
    }

    /**
     * @description Method that handles when the mouse is released
     * @returns {void}
     */
    mouseReleased(){
        if(world.pendulumState == world.pendulumStates.dragging){
            world.pendulumState = world.pendulumStates.idle;
            world.pendulums[1].dragging = 0;
        }
    }

}
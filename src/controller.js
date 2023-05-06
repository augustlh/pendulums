class Controller{
    constructor(){
        this.sliders = {
            l: createSlider(0.1, 2, 1, 0.05), 
            m: createSlider(0.1, 10, 1, 0.1), 
            l2: createSlider(0.1, 2, 1, 0.05),  
            m2: createSlider(0.1, 10, 1, 0.1), 
            gravity: createSlider(0, 20, 9.82, 0.01), 
            damping: createSlider(0, 0.995, 0, 0.005)
        };
        this.initialValues = {l: 1, m: 1, l2: 1, m2: 1, gravity: 9.82, damping: 0};
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

    update(state){
        this.transition(state)
        let index = 1;
        if(state == 'simple-pendulum' || state == 'simple-pendulum-graph'){
            index = 0;
        }
        if(this.SLIDER_VALUES[state]){
            let name;
            for(let i = 0; i < Object.keys(this.sliders).length; i++){
                name = Object.keys(this.sliders)[i];
                world.pendulums[index][name] = this.sliders[name].value();
            }
            
            world.PHYSICS.g = this.sliders.gravity.value();
            world.PHYSICS.h = this.sliders.damping.value();
        }
    }


    reset(state){
        let name;
        for(let i = 0; i < this.SLIDER_VALUES[state].length; i++){
            name = Object.keys(this.sliders)[i];
            this.sliders[name].value(this.initialValues[name]);
        }

        this.sliders['gravity'].value(this.initialValues.gravity);
        this.sliders['damping'].value(this.initialValues.damping);
        world.time = 0.0;
    }

    resetButton(){
        world.pendulumState = world.pendulumStates.idle;
        world.pendulums[0].reset()
        world.pendulums[1].reset()
        world.controller.reset(world.stateMachine.getState())


    }

    //ui elements that need to be updated when the scene changes
    transition(state){
        if(this.sceneDropdown.value() != world.stateMachine.getState()){ 
            //state machine transition, reset alle sliders og ændre lokation af genstande i UI
            world.stateMachine.transition(this.sceneDropdown.value())
            world.pendulumState = world.pendulumStates.idle

            //should only happen if you change between simple-pendulum and double-pendulum
            //dropdown logic reset
            this.sceneDropdown.remove()
            this.sceneDropdown = createSelect();
            for(let i = 0; i < this.option[world.stateMachine.getState()].length; i++){
                this.sceneDropdown.option(this.option[world.stateMachine.getState()][i])
            }
            this.sceneDropdown.value(this.option[world.stateMachine.getState()][0])
            world.ui.transition(world.stateMachine.getState())

            if(world.stateMachine.getState() == 'simple-pendulum' && state == 'double-pendulum' || world.stateMachine.getState() == 'double-pendulum' && state == 'simple-pendulum'){
                this.reset(world.stateMachine.getState())
            }


        }
    }

    playButton(){
        if(world.pendulumState == world.pendulumStates.idle || world.pendulumState == world.pendulumStates.dragging){
            world.pendulumState = world.pendulumStates.running;
        } else if(world.pendulumState == world.pendulumStates.running){
            world.pendulumState = world.pendulumStates.idle;
        }
    }

    resetGraphButton(){
        world.pendulums[0].points = []
        world.pendulums[1].points = []
    }

    mousePressed(){
        if(world.stateMachine.getState() == 'simple-pendulum'){
            world.pendulumState = world.pendulumStates.dragging;
        } else if(world.stateMachine.getState() == 'double-pendulum'){
            world.pendulumState = world.pendulumStates.dragging;
            world.pendulums[1].clicked(mouseX, mouseY);
        }
    }

}
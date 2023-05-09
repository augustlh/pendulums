class Ui{
    constructor(pos, size, controller){
        this.controller = controller;
        this.size = size; //størrelsen af UICanvas
        this.pos = pos; //positionen af UICanvas
        this.model = world;
        this.sliders = this.controller.sliders;
        this.SLIDER_VALUES = this.controller.SLIDER_VALUES;

        this.hide()

        //show all simple pendulum sliders
        for(let i = 0; i < this.SLIDER_VALUES['simple-pendulum'].length; i++){ this.sliders[this.SLIDER_VALUES['simple-pendulum'][i]].show()}
        this.sliders.gravity.show()
        this.sliders.damping.show()
        this.transition('simple-pendulum')
        //eklæring af header text som objekter
        this.hText =[
            {text:'Simulation', pos: new Vector(this.pos.x + 10, this.pos.y + 20)}, 
            {text: 'Controls', pos: new Vector(this.pos.x + 10, this.pos.y + 120)}, 
            {text: 'Constants', pos: new Vector(this.pos.x + 10, this.pos.y + 250)}
        ]
        //erklæring af body text som arrays
        this.btextS = ['Length', 'Mass', 'Gravity', 'Damping', 'Timestep']
        this.btextD = ['Length', 'Mass', 'Length 2', 'Mass 2', 'Gravity', 'Timestep']
    }

    //metode til at tegne UICanvas
    draw(state){
        push()
        noStroke()
        fill(57,57,57);
        rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
        pop()

        push()
        fill(255)
        noStroke()
        text("Scene: ", this.hText[0].pos.x, this.hText[0].pos.y + 25)
        text("Status: " + world.pendulumState, this.hText[0].pos.x, this.hText[1].pos.y - 40)

        this.text(state)
    }
    //metode der ændrer positionen af ui-elementerne baseret på transition state
    transition(state){
        this.hide()
        if(state == 'simple-pendulum' || state == 'simple-pendulum-graph'){
            for(let i = 0; i < this.SLIDER_VALUES[state].length; i++){
                this.sliders[this.SLIDER_VALUES[state][i]].position(this.pos.x + 65, this.pos.y + 250 + 10 + i * 30)
                this.sliders[this.SLIDER_VALUES[state][i]].show()
            }
            this.sliders.gravity.position(this.pos.x + 65, this.pos.y + 10 + 250 + this.SLIDER_VALUES[state].length * 30)
            this.sliders.gravity.show()
            this.sliders.damping.position(this.pos.x + 65, this.pos.y + 10 + 250 + (this.SLIDER_VALUES[state].length + 1) * 30)
            this.sliders.damping.show()
            this.sliders.timestep.position(this.pos.x + 65, this.pos.y + 10 + 250 + (this.SLIDER_VALUES[state].length + 2) * 30)
            this.sliders.timestep.show()
        } 
        else if(state == 'double-pendulum' || state == 'double-pendulum-graph'){
            for(let i = 0; i < this.SLIDER_VALUES[state].length; i++){
                this.sliders[this.SLIDER_VALUES[state][i]].position(this.pos.x + 65, this.pos.y + 10 + 250 + i * 30)
                this.sliders[this.SLIDER_VALUES[state][i]].show()
            }
            this.sliders.gravity.position(this.pos.x + 65, this.pos.y + 10  + 250+ this.SLIDER_VALUES[state].length * 30)
            this.sliders.gravity.show()
            this.sliders.timestep.position(this.pos.x + 65, this.pos.y + 10 + 250 + (this.SLIDER_VALUES[state].length + 1) * 30)
            this.sliders.timestep.show()
        }

        this.sceneDropdown()
    }
    //metode der skjuler alle sliders
    hide(){
        for(let i = 0; i < Object.keys(this.sliders).length; i++){
            this.sliders[Object.keys(this.sliders)[i]].hide()
        }
    }

    //sætter positionen af enkelte ui-elementer
    sceneDropdown(){
        this.controller.sceneDropdown.position(this.pos.x + 50, this.pos.y + 30)

        this.controller.buttons.play.position(this.pos.x + 10, this.pos.y +  120 + 15)
        this.controller.buttons.reset.position(this.pos.x + 10, this.pos.y + 120 + 45)
        this.controller.buttons.resetgraph.position(this.pos.x + 10, this.pos.y + 120 + 75)
    }

    //metode der tegner teksten i ui på baggrund af state
    text(state){
        //text for header
        push()
        fill(255)
        noStroke()
        textStyle(BOLD)
        for(let i = 0; i < this.hText.length; i++){
            text(this.hText[i].text, this.hText[i].pos.x, this.hText[i].pos.y)
        }
        pop()

        push()
        fill(255)
        noStroke()
        //text for body
        if(state == 'simple-pendulum' || state == 'simple-pendulum-graph'){
            for(let i = 0; i < this.btextS.length; i++){
                text(this.btextS[i], this.pos.x + 10, this.pos.y + 280 + i * 30)
                if(i < this.SLIDER_VALUES['simple-pendulum'].length){
                    text( this.sliders[this.SLIDER_VALUES['simple-pendulum'][i]].value(), this.pos.x + 230, this.pos.y + 275 + i * 30)
                }
            } 
            text(this.sliders.gravity.value(), this.pos.x + 230, this.pos.y + 275 + this.SLIDER_VALUES['simple-pendulum'].length * 30)
            text(this.sliders.damping.value(), this.pos.x + 230, this.pos.y + 275 + (this.SLIDER_VALUES['simple-pendulum'].length + 1) * 30)
            text(this.sliders.timestep.value(), this.pos.x + 230, this.pos.y + 275 + (this.SLIDER_VALUES['simple-pendulum'].length + 2) * 30)
        } else{ 
            for(let i = 0; i < this.btextD.length; i++){
                text(this.btextD[i], this.pos.x + 10, this.pos.y + 280 + i * 30)
                //value of sliders
                if(i < this.SLIDER_VALUES['double-pendulum'].length){
                    text( this.sliders[this.SLIDER_VALUES['double-pendulum'][i]].value(), this.pos.x + 230, this.pos.y + 275 + i * 30)
                }
                text(this.sliders.gravity.value(), this.pos.x + 230, this.pos.y + 275 + this.SLIDER_VALUES['double-pendulum'].length * 30)
                text(this.sliders.timestep.value(), this.pos.x + 230, this.pos.y + 275 + (this.SLIDER_VALUES['double-pendulum'].length + 1) * 30)
            }
        }
        pop()
    }

}

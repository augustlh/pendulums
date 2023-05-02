class Canvas{
    constructor(pos, size, color, state, fill){
      this.size = size; //størrelsen af canvas
      this.pos = pos; //størrelsen af canvas
      this.color = color; //farven på canvas
      this.state = state; //hidden eller ikke hidden
      this.fill = fill;
      this.states = ['hidden', 'visible'];
    }
  
    draw(){
        if(this.state == 'visible'){
            push()
            if(this.fill == 0){
                fill(this.color[0], this.color[1], this.color[2]);
                noStroke();   
            } else{
                noFill();
                stroke(this.color[0], this.color[1], this.color[2]);

            }
            rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
        }
        pop()
    }

    setColor(color){
        this.color = color;
    }

    setPos(pos){
        this.pos = pos;
    }

    setSize(size){
        this.size = size;
    }

    setState(state){
        this.state = state;
    }

    getState(){
        return this.state;
    }

    copy(){
        return new Canvas(this.pos, this.size, this.color, this.state);
    }
  }

  class Ui extends Canvas{
    constructor(pos, size, color, state, fill, controller){
        super(pos, size, color, state, fill);
        this.state = state;
        this.states =  ['hidden', 'visible'];
        this.controller = controller;
        this.sliders = []
        this.sliders = [this.controller.sliders[0],this.controller.sliders[2], this.controller.sliders[4], this.controller.sliders[5]]
        
        this.constantsText = ["Length", "Mass", "Gravity", "Damping"]

        this.rects = [
            {x: this.pos.x + 10, y: 30, w: this.pos.x/3, h: 100, text: "Simulation", textPos: new Vector(this.pos.x + 10, 30 - 10)},
            {x: this.pos.x + 15 + this.pos.x/3, y: 30, w: width - this.pos.x - this.pos.x/3 - 25, h: 100, text: "Controls", textPos: new Vector(this.pos.x + this.pos.x/3 + 15, 30 - 10)},
            {x: this.pos.x + 10, y: 155, w: width - this.pos.x - 20, h: 250, text: "Constants", textPos: new Vector(this.pos.x + 10, 155 - 10)},
            {x: this.pos.x + 10, y: 435, w: width - this.pos.x - 20, h: 100, text: "Viewer", textPos: new Vector(this.pos.x + 10, 435 - 10)}
          ];
        
        
    }

    draw(state){
        super.draw();
        
        push()
        noFill()
        for(let i = 0; i < this.rects.length; i++){
            noFill()
            stroke(144)
            rect(this.rects[i].x, this.rects[i].y, this.rects[i].w, this.rects[i].h)
            fill(255)
            noStroke()
            text(this.rects[i].text, this.rects[i].textPos.x, this.rects[i].textPos.y)
        }
        pop()
        
        this.controls()
        this.simulation()

        if(state == 'simple-pendulum'){
            this.simplePendulum()
        } else if(state == 'double-pendulum'){
            this.doublePendulum()
        } else if(state == 'simple-pendulum-graph'){
            this.simplePendulumGraph()
        } else if(state == 'double-pendulum-graph'){
            this.doublePendulumGraph()
        }
    }

    simulation(){
        //this.controller.sceneDropDown.position(this.rects[0].x + 5, this.rects[0].y + 10)
        push()
        fill(255)
        noStroke()
        text("Status: " + world.pendulumState , this.rects[0].x + 5, this.rects[0].y + 50)
        pop()
    }

    controls(){
        this.controller.playbutton.position(this.rects[1].x + 5, this.rects[1].y + 10)
        this.controller.resetButton.position(this.rects[1].x + 5, this.rects[1].y + 40)
    }


    simplePendulum(){        
        for(let i = 0; i < this.sliders.length; i++){
            this.sliders[i].position(this.pos.x + 70, this.rects[2].y + 10 + i * 30)
            this.sliders[i].show()
            push()
            fill(255)
            noStroke()
            text(this.sliders[i].value(), this.pos.x + 235, this.rects[2].y + i * 30 + 25)
            text(this.constantsText[i], this.pos.x + 20, this.rects[2].y + i * 30 + 25)    
            pop()
        }
        
    }

    simplePendulumGrap(){

    }

    doublePendulum(){
        for(let i = 0; i < this.sliders.length; i++){
            this.sliders[i].position(this.pos.x + 70, this.rects[2].y + 10 + i * 30)
            this.sliders[i].show()
            push()
            fill(255)
            noStroke()
            text(this.sliders[i].value(), this.pos.x + 235, this.rects[2].y + i * 30 + 25)
            text(this.constantsText[i], this.pos.x + 20, this.rects[2].y + i * 30 + 25)
            pop()
        }
    }

    doublePendulumGraph(){
    }

    sliderChange(state){
        for(let i = 0; i < this.sliders.length; i++){
            this.sliders[i].hide()
        }

        if(state == 'simple-pendulum'){
            this.sliders = [this.controller.sliders[0],this.controller.sliders[2], this.controller.sliders[4], this.controller.sliders[5]]
            this.constantsText = ["Length", "Mass", "Gravity", "Damping"]
        } else if(state == 'double-pendulum'){
            this.sliders = [this.controller.sliders[0],this.controller.sliders[1], this.controller.sliders[2], this.controller.sliders[3], this.controller.sliders[4], this.controller.sliders[5]]
            this.constantsText = ["Length 1", "Length 2", "Mass 1", "Mass 2", "Gravity", "Damping"]
        }

    }
  }
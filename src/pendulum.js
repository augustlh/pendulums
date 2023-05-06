class SimplePendulum {
    constructor(m, l, r, angle, origin){
      this.m = m;
      this.l = l;
      this.r = r;
      this.angle = angle;
      this.origin = origin;
      this.omega = 0;
      this.I = this.m * this.l**2;
      this.dragging = false;

      this.initialAngle = this.angle;
      this.initialOmega = this.omega;
      this.initialL = this.l;
      this.initialM = this.m;
      this.points = []
    }
  
    display(){
      this.x = this.l*100 * Math.sin(this.angle) + this.origin.x;
      this.y = this.l*100 * Math.cos(this.angle) + this.origin.y;

      stroke(0);
      strokeWeight(1);
      line(this.origin.x, this.origin.y, this.x, this.y);
      ellipse(this.x, this.y, this.r*15, this.r*15);
    }

    wrapToPi(angle) {
      while (angle < -Math.PI) {
        angle += 2*Math.PI;
      }
      while (angle > Math.PI) {
        angle -= 2*Math.PI;
      }
      return angle;
    }
  
    acceleration(theta){
      this.I = this.m * this.l**2;
      return -(this.m*world.PHYSICS.g*this.l/this.I) * Math.sin(theta) - (world.PHYSICS.h) * this.omega;
    }
  
    update(dt){
      if(!this.dragging){
        
        this.graph()
        
        let k1y = dt * this.omega;
        let k1v = dt * this.acceleration(this.angle);
  
        let k2y = dt * (this.omega + k1v/2);
        let k2v = dt * this.acceleration(this.angle + k1y/2);
  
        let k3y = dt * (this.omega + k2v/2);
        let k3v = dt * this.acceleration(this.angle + k2y/2);
  
        let k4y = dt * (this.omega + k3v);
        let k4v = dt * this.acceleration(this.angle + k3y);
  
        this.omega += ((k1v + 2*k2v + 2*k3v + k4v)/6)
        this.angle += (k1y + 2*k2y + 2*k3y + k4y)/6
      }
  
      else{
        this.drag();
      }
    }

    drag(){
        if(world.pendulumState == world.pendulumStates.dragging){
          this.omega = 0;
          this.angle = Math.atan2(mouseX - this.origin.x, mouseY - this.origin.y);
      }
    }

    reset(){
      this.angle = this.initialAngle;
      this.omega = this.initialOmega;
      this.l = this.initialL;
      this.m = this.initialM;

    }

    copy(){
      return new SimplePendulum(this.m, this.l, this.r, this.angle, this.origin);
    }

    graph(){
      this.points.push(createVector(this.wrapToPi(this.angle),this.omega))
    }

    displayGraph(){
      //axis labels, angle, angular velocity
      push()
      noStroke()
      fill(0)
      text("Angle", simView.y - 50, height/2 + 2)
      text("Angular Velocity", simView.y/2 - 45, 0 + 15)
      pop()

      push()
      stroke(128,128,255);
      strokeWeight(2);
      for(let i = 0; i < this.points.length; i++){
        if(i > 0 && this.points[i].x - this.points[i-1].x < 0.8 && this.points[i].x - this.points[i-1].x > -0.8 && this.points[i].y - this.points[i-1].y < 1.8 && this.points[i].y - this.points[i-1].y > -1.8){
          //point(this.points[i].x*60 + simView.y/2, this.points[i].y*60 + height/2);
          line(this.points[i].x*70 + simView.y/2, this.points[i].y*40 + height/2, this.points[i-1].x*70 + simView.y/2, this.points[i-1].y*40 + height/2)
        }
      }
      pop()

      //rød prik på nuværende position
      push()
      stroke(255,0,0);
      strokeWeight(5);
      point(this.angle*70 + simView.y/2, this.omega*40 + height/2);
      pop()
    }


  
  }

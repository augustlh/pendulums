class Pendulum {
    constructor(m, l, r, angle, pos){
        this.m = m; this.l = l; this.r = r; this.pos = pos; this.angle = angle; this.omega = 0;
        this.initialM = this.m; this.initialL = this.l; this.initialAngle = this.angle; this.initialOmega = this.omega;

        this.points = [];
    }
    
    //Beregner vinkelaccelerationen for pendulet ved en given vinkel theta. Ligningen er fået fra ORBIT B - HTX
    acceleration(theta){
        let I = this.m * this.l**2;
        return -(this.m*world.PHYSICS.g*this.l/I) * Math.sin(theta) - (world.PHYSICS.h) * this.omega;
      }

    update(dt){
        //Løser bevægelsesligninger med RK4. Ligninger er fået fra: https://www.myphysicslab.com/pendulum/pendulum-en.html, men implementeret på egen hånd.
        let k1y = dt * this.omega;
        let k1v = dt * this.acceleration(this.angle);
  
        let k2y = dt * (this.omega + k1v/2);
        let k2v = dt * this.acceleration(this.angle + k1y/2);
  
        let k3y = dt * (this.omega + k2v/2);
        let k3v = dt * this.acceleration(this.angle + k2y/2);
  
        let k4y = dt * (this.omega + k3v);
        let k4v = dt * this.acceleration(this.angle + k3y);
  
        this.omega += (k1v + 2*k2v + 2*k3v + k4v)/6
        this.angle += (k1y + 2*k2y + 2*k3y + k4y)/6
    }

    display(){
        //Tegner pendulet
        this.x = this.l*100 * Math.sin(this.angle) + this.pos.x;
        this.y = this.l*100 * Math.cos(this.angle) + this.pos.y;
  
        stroke(0);
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.x, this.y);
        ellipse(this.x, this.y, this.r*15, this.r*15);
    }

    //Pusher punkterne til grafen i arrayet points
    graph(){
        this.points.push(createVector(this.wrapToPi(this.angle),this.omega))
    }

    displayGraph(){
        //Axis labels
        push()
        noStroke()
        fill(0)
        text("Angle", simView.y - 50, height/2 + 2)
        text("Angular Velocity", simView.y/2 - 45, 0 + 15)
        pop()
        //Axis labels

        //Selve grafen
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
        //Selve grafen

        //rød prik på nuværende position
        push()
        stroke(255,0,0);
        strokeWeight(5);
        point(this.angle*70 + simView.y/2, this.omega*40 + height/2);
        pop()
        //rød prik på nuværende position

    }

    //Begrænser vinklen til at være mellem -pi og pi
    wrapToPi(angle) {
        while (angle < -Math.PI) {
          angle += 2*Math.PI;
        }
        while (angle > Math.PI) {
          angle -= 2*Math.PI;
        }
        return angle;
      }

    //Resetter pendulet til dens startværdier
    reset(){
        this.angle = this.initialAngle;
        this.omega = this.initialOmega;
        this.l = this.initialL;
        this.m = this.initialM;
    }

    drag(){
        //Hvis modellens pendulumState er dragging, så skal pendulets vinkel være lig med vinklen mellem musen og pendulets pos
        if(world.pendulumState == world.pendulumStates.dragging){
            this.angle = Math.atan2(mouseX - this.pos.x, mouseY - this.pos.y);
        }
    }

    //Returnerer en kopi af pendulet
    copy(){
        return new Pendulum(this.m, this.l, this.r, this.angle, this.pos);
    }


}

class DoublePendulumS extends Pendulum{
    constructor(m, l, r, angle, pos, m2, l2, r2, angle2){
        super(m, l, r, angle, pos);
        this.omega = 0;
        this.m2 = m2;
        this.l2 = l2;
        this.r2 = r2;
        this.angle2 = angle2;
        this.omega2 = 0;
    }
}
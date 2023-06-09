/**
 * @description Pendulum class
 */
class Pendulum {
    constructor(m, l, r, angle, pos){
        this.m = m; this.l = l; this.r = r; this.pos = pos; this.angle = angle; this.omega = 0;
        this.initialM = this.m; this.initialL = this.l; this.initialAngle = this.angle;
        this.points = [];
    }
    
    /**
     * @description Calculates the angular acceleration of the pendulum at a given angle theta. The equation is from ORBIT B - HTX
     * @param {Number} theta 
     * @returns {Number} Angular acceleration of the pendulum
     */
    acceleration(theta){
        let I = this.m * this.l**2;
        return -(this.m*world.PHYSICS.g*this.l/I) * Math.sin(theta) - (world.PHYSICS.h) * this.omega;
      }
    
      /**
       * @description Solves the differential equations for the pendulums motion using the RK4 method. The equations are fron @see https://www.myphysicslab.com/pendulum/pendulum-en.html, but implemented on my own.
       * @param {Number} dt 
       * @returns {void}
       */
    update(dt){
        this.graph()
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

    /**
     * @description Displays the pendulum
     * @returns {void}
     */
    display(){
        //Tegner pendulet
        this.x = this.l*100 * Math.sin(this.angle) + this.pos.x;
        this.y = this.l*100 * Math.cos(this.angle) + this.pos.y;
  
        stroke(0);
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.x, this.y);
        ellipse(this.x, this.y, this.r*20, this.r*20);
    }

    /**
     * @description Pushes a Vector of the angle wrapped between -PI and PI and the angular velocity to the points array
     * @returns {void}
     */
    graph(){
        //this.points.push(new Vector(this.limitPi(this.angle),this.omega))
        if(this.points.length > 3000){
          console.log("Resetting graph")
          this.points = []
        }
        let point = new Vector(this.limitPi(this.angle),this.omega)
        if(!contains(point, this.points)){
            this.points.push(point)
        }
      }

    /**
     * @description Displays the graph of the pendulum
     * @returns {void}
     */
    displayGraph(){
        //Axis labels
        push(); noStroke(); fill(0)
        text("Angle", simView.y - 50, height/2 + 2); text("Angular Velocity", simView.y/2 - 45, 0 + 15)
        pop()
        //Axis labels

        //Selve grafen
        push(); stroke(128,128,255); strokeWeight(2);

        for(let i = 0; i < this.points.length; i++){
          if(i > 0 && this.points[i].x - this.points[i-1].x < 0.8 && this.points[i].x - this.points[i-1].x > -0.8 && this.points[i].y - this.points[i-1].y < 1.8 && this.points[i].y - this.points[i-1].y > -1.8){
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

    /**
     * @description Wraps a given angle to PI
     * @param {Number} angle 
     * @returns {Number} Returns the angle wrapped between -PI and PI
     */
    limitPi(angle) {
        while (angle < -Math.PI) {
          angle += 2*Math.PI;
        }
        while (angle > Math.PI) {
          angle -= 2*Math.PI;
        }
        return angle;
      }

    /**
     * @description Resets the pendulum to its initial values
     * @returns {void}
     */
    reset(){
        this.angle = this.initialAngle;
        this.omega = 0;
        this.l = this.initialL;
        this.m = this.initialM;
    }


    /**
     * @description Drags the pendulum according to the mouse position
     * @returns {void}
     */
    drag(){
        //Hvis modellens pendulumState er dragging, så skal pendulets vinkel være lig med vinklen mellem musen og pendulets pos
        if(world.pendulumState == world.pendulumStates.dragging){
            this.angle = Math.atan2(mouseX - this.pos.x, mouseY - this.pos.y);
        }
    }

    /**
    * @description Returns a copy of the pendulum
    * @returns {Pendulum} Returns a copy of the pendulum
    */
    copy(){
        return new Pendulum(this.m, this.l, this.r, this.angle, this.pos);
    }


}

/**
 * @description DoublePendulumS is a class that represents a double pendulum. It is a child of Pendulum.
 * @extends Pendulum
 */

class DoublePendulum extends Pendulum{
    constructor(m, l, r, angle, pos, m2, l2, r2, angle2){
        super(m, l, r, angle, pos);
        this.omega = 0.0;
        this.m2 = m2;
        this.l2 = l2;
        this.r2 = r2;
        this.angle2 = angle2;
        this.omega2 = 0.0;

        this.dragging = 0;

        this.initialM = this.m; this.initialL = this.l; this.initialAngle = this.angle;
        this.initialM2 = this.m2; this.initialL2 = this.l2; this.initialAngle2 = this.angle2;
    }

    /**
     * @description Calculates the angular acceleration of a pendulum. The equations are from ORBIT B - HTX
     * @param {Number} theta
     * @param {Number} phi
     * @param {Integer} type
     * @returns {Number} Angular acceleration of the pendulum based on its type parameter
     */
    acceleration(theta, phi, type){
        if(type == 0){
          return (-world.PHYSICS.g*(2 * this.m + this.m2)*Math.sin(theta) - this.m2*world.PHYSICS.g*Math.sin(theta - 2 * phi) - 2*Math.sin(theta-phi)*this.m2*(this.omega2**2 * this.l2 + this.omega**2 * this.l * Math.cos(theta-phi))/(this.l*(2*this.m + this.m2 - this.m2*Math.cos(2*theta- 2*phi))));
        }else if(type == 1){
          return 2 * Math.sin(theta - phi)*(this.omega**2 * this.l * (this.m + this.m2) + world.PHYSICS.g*(this.m + this.m2) * Math.cos(theta) + this.omega2**2 * this.l2 * this.m2 * Math.cos(theta - phi))/(this.l2*(2*this.m + this.m2 - this.m2*Math.cos(2*theta - 2*phi)));
        }
    }

    //opdaterer pendulet med RK4 metoden
    /**
     * @description Updates the pendulums position by solving the differential equations with the RK4 method
     * @param {Float} dt 
     * @returns {void}
     */
    update(dt){
        this.graph()
        let k1y = dt * this.omega;
        let k1v = dt * this.acceleration(this.angle, this.angle2, 0);
      
        let k2y = dt * (this.omega + k1v/2);
        let k2v = dt * this.acceleration(this.angle + k1y/2, this.angle2 + k1y/2,0);
      
        let k3y = dt * (this.omega + k2v/2);
        let k3v = dt * this.acceleration(this.angle + k2y/2, this.angle2 + k2y/2,0);
      
        let k4y = dt * (this.omega + k3v);
        let k4v = dt * this.acceleration(this.angle + k3y, this.angle2 + k3y,0);
      
        this.angle += ((k1y + 2*k2y + 2*k3y + k4y)/6);
        this.omega += ((k1v + 2*k2v + 2*k3v + k4v)/6);
    
        let k1y2 = dt * this.omega2;
        let k1v2 = dt * this.acceleration(this.angle, this.angle2,1);
      
        let k2y2 = dt * (this.omega2 + k1v2/2);
        let k2v2 = dt * this.acceleration(this.angle + k1y2/2, this.angle2 + k1y2/2,1);
      
        let k3y2 = dt * (this.omega2 + k2v2/2);
        let k3v2 = dt * this.acceleration(this.angle + k2y2/2, this.angle2 + k2y2/2,1);
      
        let k4y2 = dt * (this.omega2 + k3v2);
        let k4v2 = dt * this.acceleration(this.angle + k3y2, this.angle2 + k3y2,1);
      
        this.angle2 += ((k1y2 + 2*k2y2 + 2*k3y2 + k4y2)/6)
        this.omega2 += ((k1v2 + 2*k2v2 + 2*k3v2 + k4v2)/6)
    }

    /**
     * @description Draws the double pendulum
     * @returns {void}
     */
    display(){
        super.display();
        this.x2 = this.x + this.l2*100 * Math.sin(this.angle2);
        this.y2 = this.y + this.l2*100 * Math.cos(this.angle2);
        line(this.x, this.y, this.x2, this.y2);
        circle(this.x2, this.y2, this.r2*20);
    }

    /**
     * @description Resets the double pendulum to its initial values
     * @returns {void}
     */
    reset(){
        super.reset();
        this.angle2 = this.initialAngle2;
        this.omega2 = 0;
        this.l2 = this.initialL2;
        this.m2 = this.initialM2;
    }

    /**
     * @description Pushes the points to the graph
     * @returns {void}
     */
    graph(){
        if(this.points.length > 3000){
          console.log("Resetting graph")
          this.points = []
        }
        let point = new Vector(this.limitPi(this.angle),this.limitPi(this.angle2))
        if(!contains(point, this.points)){
            this.points.push(point)
        }
    }
    /**
     * @description Draws the graph of the double pendulum based on the points in the array<points>
     * @returns {void}
    */
    displayGraph(){
        //Axis labels
        push(); noStroke(); fill(0)
        text("Angle", simView.y - 50, height/2 + 2)
        text("Angular Velocity", simView.y/2 - 45, 0 + 15)
        pop()
        //Axis labels

        //Selve grafen
        push(); stroke(128,128,255); strokeWeight(2);

        for(let i = 0; i < this.points.length; i++){
          if(i > 0 && this.points[i].x - this.points[i-1].x < 0.8 && this.points[i].x - this.points[i-1].x > -0.8 && this.points[i].y - this.points[i-1].y < 1.8 && this.points[i].y - this.points[i-1].y > -1.8){
            line(this.points[i].x*(simView.y/Math.PI - 20) + simView.y/2, this.points[i].y*80 + height/2, this.points[i-1].x*(simView.y/Math.PI - 20) + simView.y/2, this.points[i-1].y*80 + height/2)
          }
        }
        pop()
  
        //make a ret point at the current position
        push()
        stroke(255,0,0); strokeWeight(5)
        point(this.angle*(simView.y/Math.PI - 20) + simView.y/2, this.angle2*80 + height/2)
        pop()

    }

    /**
     * @description Checks what pendulum is clicked
     * @param {Number} x 
     * @param {Number} y 
     * @returns {void}
     */
    clicked(x, y){
      this.x1 = this.l*100 * Math.sin(this.angle) + this.pos.x;
      this.y1 = this.l*100 * Math.cos(this.angle) + this.pos.y;
      this.x2 = this.x1 + this.l2*100 * Math.sin(this.angle2);
      this.y2 = this.y1 + this.l2*100 * Math.cos(this.angle2);
      if(dist(this.x2, this.y2, x, y) < this.r2 * 80){ this.dragging = 2; this.omega = 0; this.omega2 = 0;}
      else{ this.dragging = 1; this.omega = 0; this.omega2 = 0;}
    }

    /**
     * @description Drags the affected pendulum based on the mouse position
     * @returns {void}
    */
    drag(){
        if(world.pendulumState == world.pendulumStates.dragging){
          if(this.dragging == 2){ this.angle2 = Math.atan2(mouseX - this.x1, mouseY - this.y1); } 
          else if(this.dragging == 1){
            this.angle = Math.atan2(mouseX - this.pos.x, mouseY - this.pos.y); 
          }
        }
      }

      /**
      * @description Returns a copy of the double pendulum
      * @returns {DoublePendulum} Returns a copy of the double pendulum
      */
      copy(){
        return new DoublePendulum(this.m, this.l, this.r, this.angle, this.pos, this.m2, this.l2, this.r2, this.angle2)
      }


}
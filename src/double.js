class DoublePendulum{
    constructor(m, l, r, angle, origin, m2, l2, r2, angle2){
      this.m = m;
      this.l = l;
      this.r = r;
      this.angle = angle;
      this.origin = origin;
      this.x1 = this.l*100 * Math.sin(this.angle) + this.origin.x;
      this.y1 = this.l*100 * Math.cos(this.angle) + this.origin.y;
      this.m2 = m2;
      this.l2 = l2;
      this.r2 = r2;
      this.angle2 = angle2;
      this.omega = 0;
      this.omega2 = 0;
  
      this.x2 = this.x1 + this.l2*100 * Math.sin(this.angle2);
      this.y2 = this.y1 + this.l2*100 * Math.cos(this.angle2);

      this.initialAngle = this.angle;
      this.initialOmega = this.omega;
      this.initialL = this.l;
      this.initialM = this.m;
      this.initialAngle2 = this.angle2;
      this.initialOmega2 = this.omega2;
      this.initialL2 = this.l2;
      this.initialM2 = this.m2;


      this.points = [];
    }
  
    display(){
      let x1 = this.l*100 * Math.sin(this.angle) + this.origin.x;
      let y1 = this.l*100 * Math.cos(this.angle) + this.origin.y;
    
      let x2 = x1 + this.l2*100 * Math.sin(this.angle2);
      let y2 = y1 + this.l2*100 * Math.cos(this.angle2);
      stroke(0);
      line(this.origin.x, this.origin.y, x1, y1);
      line(x1, y1, x2, y2);
  
      ellipse(x1, y1, 20, 20);
      ellipse(x2, y2, 20, 20);

      this.points.push(createVector(this.angle,this.angle2))

      for(let i = 0; i < this.points.length; i++){
        point(-this.points[i].x*200+width/2, this.points[i].y*200+width/2)
      }


    }
  
    acceleration(theta, phi, type){
      if(type == 0){
        return (-world.PHYSICS.g*(2 * this.m + this.m2)*Math.sin(theta) - this.m2*world.PHYSICS.g*Math.sin(theta - 2 * phi) - 2*Math.sin(theta-phi)*this.m2*(this.omega2**2 * this.l2 + this.omega**2 * this.l * Math.cos(theta-phi))/(this.l*(2*this.m + this.m2 - this.m2*Math.cos(2*theta- 2*phi))));
      }else if(type == 1){
        return 2 * Math.sin(theta - phi)*(this.omega**2 * this.l * (this.m + this.m2) + world.PHYSICS.g*(this.m + this.m2) * Math.cos(theta) + this.omega2**2 * this.l2 * this.m2 * Math.cos(theta - phi))/(this.l2*(2*this.m + this.m2 - this.m2*Math.cos(2*theta - 2*phi)));
      }
    }
    
  
    update(dt){
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

    reset(){
      this.angle = this.initialAngle;
      this.omega = this.initialOmega;
      this.l = this.initialL;
      this.m = this.initialM;
      this.angle2 = this.initialAngle2;
      this.omega2 = this.initialOmega2;
      this.l2 = this.initialL2;
      this.m2 = this.initialM2;
      this.points = []
    }

    copy(){
      return new DoublePendulum(this.m, this.l, this.r, this.angle, this.origin, this.m2, this.l2, this.r2, this.angle2)
    }
    
  }
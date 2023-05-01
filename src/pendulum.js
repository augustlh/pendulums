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
    }
  
    display(){
      this.x = this.l*100 * Math.sin(this.angle) + this.origin.x;
      this.y = this.l*100 * Math.cos(this.angle) + this.origin.y;
      stroke(0);
      strokeWeight(1);
      line(this.origin.x, this.origin.y, this.x, this.y);
      ellipse(this.x, this.y, this.r*15, this.r*15);
    }
  
    acceleration(theta){
      this.I = this.m * this.l**2;
      return -(this.m*g*this.l/this.I) * Math.sin(theta);
    }
  
    update(dt){
      if(!this.dragging){
        let k1y = dt * this.omega;
        let k1v = dt * this.acceleration(this.angle);
  
        let k2y = dt * (this.omega + k1v/2);
        let k2v = dt * this.acceleration(this.angle + k1y/2);
  
        let k3y = dt * (this.omega + k2v/2);
        let k3v = dt * this.acceleration(this.angle + k2y/2);
  
        let k4y = dt * (this.omega + k3v);
        let k4v = dt * this.acceleration(this.angle + k3y);
  
        this.omega += ((k1v + 2*k2v + 2*k3v + k4v)/6) // 0.5;
        this.angle += (k1y + 2*k2y + 2*k3y + k4y)/6;
      }
  
      else{
        this.drag();
      }
    }
  
  }

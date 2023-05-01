class Pendulum{
    constructor(origin, mass, length, angle){
        this.origin = origin; // pendulets origin
        this.mass = mass; // massen af pendulet
        this.length = length; // længden af pendulet
        this.angle = angle; // vinklen af pendulet
        this.omega = 0.0; // vinkelhastigheden af pendulet
    }

    update(dt){
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

}
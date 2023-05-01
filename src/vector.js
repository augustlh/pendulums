class Vector{
    constructor(x, y){
      this.x = x;
      this.y = y;
    }
      
      add(v){
        return new Vector(this.x + v.x, this.y + v.y);
      }
      
      subtract(v){
        return new Vector(this.x - v.x, this.y - v.y);
      }
      
      mult(s){
        return new Vector(this.x * s, this.y * s);
      }
      
      divide(s){
        return new Vector(this.x / s, this.y / s);
      }
      
      mag(){
        return sqrt(this.x * this.x + this.y * this.y);
      }
      
      normalize(){
        return this.div(this.mag());
      }
  
      setMag(m){
        return this.normalize.mult(m);
      }
      
      dist(v){
        return sqrt((this.x - v.x) * (this.x - v.x) + (this.y - v.y) * (this.y - v.y));
      }
      
      copy(){
        return new Vector(this.x, this.y);
      }
  }
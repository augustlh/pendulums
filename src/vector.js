class Vector{
    constructor(x, y){
      this.x = x;
      this.y = y;
    }
      //metode til at lægge to vektorer sammen
      add(v){
        return new Vector(this.x + v.x, this.y + v.y);
      }
      //metode til at trække to vektorer fra hinanden
      subtract(v){
        return new Vector(this.x - v.x, this.y - v.y);
      }
      //metode til at gange en vektor med en skalar
      mult(s){
        return new Vector(this.x * s, this.y * s);
      }
      //metode til at dividere en vektor med en skalar
      divide(s){
        return new Vector(this.x / s, this.y / s);
      }
      //metode til at finde længden af en vektor
      mag(){
        return sqrt(this.x * this.x + this.y * this.y);
      }
      //metode til at finde en vektors normalvektor
      normalize(){
        return this.div(this.mag());
      }
      setMag(m){
        return this.normalize.mult(m);
      }
      //metode til at finde afstanden mellem to vektorer
      dist(v){
        return sqrt((this.x - v.x) * (this.x - v.x) + (this.y - v.y) * (this.y - v.y));
      }
      //metode der returnerer en kopi af vektoren
      copy(){
        return new Vector(this.x, this.y);
      }
  }
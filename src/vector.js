/**
 * represents a vector in 2D
 * @class Vector
 * @property {Number} x
 * @property {Number} y
 */

class Vector{
    constructor(x, y){
      this.x = x;
      this.y = y;
    }
      /**
       * @description Method that adds a vector to this vector
       * @param {Vector} v The vector to add
       * @returns {Void}
       */
      add(v){
        this.x += v.x;
        this.y += v.y;
      }
      
      /**
       * @description Method that subtracts a vector from this vector
       * @param {Vector} v The vector to subtract 
       * @returns {Void}
       */
      subtract(v){
        this.x -= v.x;
        this.y -= v.y;
      }

      /**
       * @description Method that multiplies this vector with a scalar
       * @param {Number} s The scalar to multiply with 
       * @returns {Void}
       */
      mult(s){
        this.x *= s;
        this.y *= s;
      }
      
      /**
       * @description Method that divides this vector with a scalar
       * @param {Number} s The scalar to divide with
       * @returns {Void}
       */
      divide(s){
        this.x /= s;
        this.y /= s;
      }
      
      /**
       * @description Method that returns the magnitude of this vector (its length)
       * @returns {Number} The magnitude of this vector
       */
      mag(){
        return sqrt(this.x * this.x + this.y * this.y);
      }
      
      /**
       * @description Method that returns the normalized version of this vector
       * @returns {Number} The normalized version of this vector
       * @see Vector#mag
       * @see Vector#divide
       */
      normalize(){
        return this.divide(this.mag());
      }

      setMag(m){
        return this.normalize.mult(m);
      }
      
      /**
       * @description Method that returns the distance between this vector and another vector v
       * @param {Vector} v 
       * @returns {Number} The distance between this vector and v
       */
      dist(v){
        return sqrt((this.x - v.x) * (this.x - v.x) + (this.y - v.y) * (this.y - v.y));
      }
      
      /**
       * @returns {Vector} A copy of this vector
       */
      copy(){
        return new Vector(this.x, this.y);
      }
  }
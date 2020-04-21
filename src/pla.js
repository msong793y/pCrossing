
const Object = require('./object')
const Util = require("./util.js");

class Pla extends Object{

    constructor(options){

        super(options)

        this.radius = 40;
        this.vel = [0, 0];
        this.pos = [500,200]
        this.type = "pla";
        this.speed = 2;
        this.color = "#9400D3";
        // this.pos = options.pos;
        this.game = options.game;
        this.timeout = null;
        
    }


    power(impulse) {


        this.vel[0] = impulse[0];
        this.vel[1] = impulse[1];
        console.log(`pos ${this.pos}`)
        console.log(this.vel)
        let that = this;
        clearTimeout(this.timeout)
        // timeout = setTimeout(() => { console.log("hi")}, 500)

        this.timeout = setTimeout(() => { that.vel[0] = 0; that.vel[1] = 0 }, 500)

    };

    mouseMove(newPos){
        
        // this.vel[0] = ((newPos[0] - this.pos[0])/1000)*this.speed*4
        // this.vel[1] = ((newPos[1] - this.pos[1]) /700)*this.speed*4
        let vec = []
        vec[0] = newPos[0] - this.pos[0];
        vec[1] = newPos[1] - this.pos[1];

        clearTimeout(this.timeout)
        const newVec = Util.dir(vec)
        this.vel[0] = newVec[0]*4;
        this.vel[1] = newVec[1]*4;
        
        let that = this;

        this.timeout = setTimeout(() => { that.vel[0] = 0; that.vel[1] = 0 }, 800)

        
    }



}


module.exports = Pla;
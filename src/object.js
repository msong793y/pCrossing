const Util = require("./util");
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;



class Object {
  
  constructor(options) {
    this.id = options.id || null;
    this.type = options.type || null;
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius || 50;
    this.color = options.color || "#FFFFFF";
    this.game = options.game;
    this.speed = options.speed || 1
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
    ctx.fill();
  }

  move(timeDelta) {
    // console.log(this.pos)
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.vel[0] * velocityScale * this.speed ,
      offsetY = this.vel[1] * velocityScale * this.speed ;

    let x = this.pos[0] + offsetX;
    let y = this.pos[1] + offsetY;
    if (x > 1000 || x < 0) {
      this.vel[0] = -this.vel[0];
    }

    if (y > 700 || y < 0) {
      this.vel[1] = -this.vel[1];
    }
    this.pos[0] = x;
    this.pos[1] = y;
    // console.log(this.vel)
  }
}


module.exports = Object;
const Util = require('./util');
const Bank = require('./banks')
const Object = require('./object');

class Game {
  constructor() {
    this.DIM_X = 1000;
    this.DIM_Y = 700;
    this.entities = [];
    this.banks = [];
    this.validBanks= new Set();
    this.vendors = [];
    this.validVendors = new Set();
    this.score = 0; // total score
    this.stage = 0; // current level
    this.setStage();
  }

  //each animation step
  step(delta) {
    this.moveObjects(delta);
  }

  //moving entities
  moveObjects (delta) {
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].move(delta);
    }
  };

  //rendering frame
  draw  (ctx){

    ctx.clearRect(0,0,this.DIM_X,this.DIM_Y)

    //populating entities
    for( let i=0; i<this.entities.length; i++){
        this.entities[i].draw(ctx)
    }
  }



  // setting for each level
  setStage() {

    let bankSet = new Set;
    
     for (let i = 1; i < 4; i++) {
       let pos = [100, 100 * i];
       let that = this;

       this.entities.push(new Bank({ pos: pos, game: that, num: i }));
     }
    
    if(this.stage === 0){

        for (let i = 0; i < 10; i++) {
        let pos = this.startingPosition();
        let that = this;
        this.entities.push(
            new Object({ pos: pos, vel: Util.randomVec(3), game: that })
        );
        }
    }
  }

  // Generate random starting position
  startingPosition() {
    let x = this.DIM_X - 30;
    let y = Math.random() * this.DIM_Y;
    return [x, y];
  }
}


module.exports = Game;
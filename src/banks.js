const Object = require('./object')

class Bank extends Object{

    constructor(options){
        
        super(options)

        this.radius =35;
        this.vel = [0,0];
        this.type = "bank";
        this.speed=0;
        this.color = "#FF0000";
        // this.pos = options.pos;
        this.game = options.game;
        this.num=options.num;
        
        switch (options.num) {
          case 1:
            this.id = "Bank of America";
            this.color = "#FF0000";
            break;
          case 2:
            this.id = "Chase";
            this.color = "#008000";
            break;
          case 3:
            this.id = "Wells Frago";
            this.color = "#FFFF00";
            break;

          default:
            break;
        }


    }



}


module.exports =Bank
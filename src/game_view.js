class GameView{

    constructor(ctx, canvas, game){

        this.game = game;
        this.canvas = canvas;
        this.ctx = ctx;
        this.pla = this.game.pla;
        this.getPosition=this.getPosition.bind(this)



        this.start();

    }

    start(){

        this.bindKeyHandlers();
        this.clidkHandlers();
        this.lastTime= performance.now();

        requestAnimationFrame(this.animate.bind(this));


    }


    animate(time) {

   
    const timeDelta = time - this.lastTime;

    // // debugger
    // if(this.game.gameStatus==="continue"){
   
    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    // every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
    // } else if (this.game.gameStatus === "won"){
    //     this.ctx.fillStyle = "blue";
    //     this.ctx.font = "75px Arial";
    //     this.ctx.fillText(`You Won!`, 250, 280);
    // } else if(this.game.gameStatus === "lost"){
    //     this.ctx.fillStyle = "red";
    //     this.ctx.font = "75px Arial";
    //     this.ctx.fillText(`You Lost`, 250, 280);

    // }
    };
    //

    clidkHandlers() {

        const canvas = this.canvas

        canvas.addEventListener("mousedown", this.getPosition, false);

    };

   

    getPosition(event) {

       

        let x = event.x;
        let y = event.y;

        
        
        // x -= this.pla.pos[0];
        // y -= this.pla.pos[1];
        let vec = [x, y]

        console.log(vec)
        // this.pla.vel = [0, 0]
        this.pla.mouseMove(vec)
    }



};


GameView.MOVES = {
    w: [0, -2],
    a: [-2, 0],
    s: [0, 2],
    d: [2, 0],

};

GameView.prototype.bindKeyHandlers = function bindKeyHandlers() {
    const pla = this.pla;

    Object.keys(GameView.MOVES).forEach(function (k) {
        const move = GameView.MOVES[k];
        key(k, function () { pla.power(move); });
    });


};





module.exports = GameView
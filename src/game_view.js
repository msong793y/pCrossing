class GameView{

    constructor(ctx, canvas, game){

        this.game = game;
        this.canvas = canvas;
        this.ctx = ctx;
        this.start();

    }

    start(){
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






}


module.exports = GameView
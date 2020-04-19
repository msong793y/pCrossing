console.log("Webpack is working!");

const Game = require("./game.js");
const GameView = require("./game_view.js");
// const Modal = require("./modal");

// const MovingObject = require("./moving_object.js");

// testingg
// window.MovingObject = MovingObject;

// 

let game = new Game();

window.addEventListener("DOMContentLoaded", () => {

    console.log("DomLoaded")


  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");

  const view = new GameView(ctx, canvas, game);
 

});
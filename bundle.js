/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(/*! ./util */ "./src/util.js");
const MovingObject = __webpack_require__(/*! ./moving_object */ "./src/moving_object.js");

class Game {
  constructor() {
    this.DIM_X = 1000;
    this.DIM_Y = 700;
    this.entities = [];
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
    for (let i = 0; i < 10; i++) {
      let pos = this.startingPosition();
      let that = this;
      this.entities.push(
        new MovingObject({ pos: pos, vel: Util.randomVec(3), game: that })
      );
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

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

console.log("Webpack is working!");

const Game = __webpack_require__(/*! ./game.js */ "./src/game.js");
const GameView = __webpack_require__(/*! ./game_view.js */ "./src/game_view.js");
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

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(/*! ./util */ "./src/util.js");
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;



class MovingObject {
  constructor(options) {
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


module.exports = MovingObject;

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

const Util = {
    inherits(childClass, parentClass) {
        childClass.prototype = Object.create(parentClass.prototype);
        childClass.prototype.constructor = childClass;
    },
    randomVec(length) {
        const deg = -1 * Math.PI * Math.random();
        return Util.scale([Math.sin(deg), Math.cos(deg)], length);
    },
    // Scale the length of a vector by the given amount.
    scale(vec, m) {
        return [vec[0] * m, vec[1] * m];
    },

     // Find distance between two points.
    dist(pos1, pos2) {
        return Math.sqrt(
            Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
        );
    },
    // Normalize the length of the vector to 1, maintaining direction.
    dir(vec) {
        const norm = Util.norm(vec);
        return Util.scale(vec, 1 / norm);
    },

    // Find the length of the vector.
    norm(vec) {
        return Util.dist([0, 0], vec);
    },
};



module.exports = Util;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
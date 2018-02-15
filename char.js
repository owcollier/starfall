class Char extends createjs.Sprite {
  constructor(spriteSheet) {
    super(spriteSheet);
    this._initialize();
  }

  _initialize() {
    this.x = 100;
    this.y = 97;
    this.velocity = 10;
    this.hitArea = new createjs.Shape(new createjs.Graphics().beginFill('#FFF').rect (0, 0, 70, 70));
  }

  changeDirection() {
    this.velocity *= -1;
    this.scaleX *= -1;
  }

}

// class Char extends createjs.Shape {
//   constructor() {
//     super();
//     this._initialize();
//   }

//   _initialize() {
//     this.graphics.beginFill('#F8EFBA').drawCircle(0, 450, 50);
//     this.x = 100;
//     this.y = 97;
//     this.velocity = 10;
//     this.cache(-50, 400, 100, 100);
//   }

//   changeDirection(v) {
//     this.velocity = v;
//   }
// }
class Char extends createjs.SpriteSheet {
  constructor() {
    super();
    this._initialize();
  }

  _initialize() {
    console.log('here');
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
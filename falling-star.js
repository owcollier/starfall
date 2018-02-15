class FallingStar extends createjs.Sprite {
  constructor(spriteSheet, x, v) {
    super(spriteSheet);
    this._initialize(x, v);
  }
  _initialize(x, v) {
    this.velocity = v;
    this.speed = 0;
    this.x = x;
    this.y = -64;
    this.setBounds(this.x, this.y, 50, 50);
    this.hitArea = new createjs.Shape(new createjs.Graphics().beginFill('#FFF').rect (0, 0, 10, 10));
  }
}


// class FallingStar extends createjs.Shape {
//   constructor(x, c, v) {
//     super();
//     this.colors = ['#FC427B', '#FEA47F', '#9AECDB', '#FD7272', '#FFF' ];
//     this._initialize(x, c, v);
//   }

//   _initialize(x, c, v) {
//     this.graphics.beginFill(this.colors[c]).drawCircle(0, 0, 25);
//     this.x = x;
//     this.y = -25;
//     this.velocity = v;
//     this.speed = 0;
    // this.setBounds(this.x, this.y, 50, 50);
//     this.hitArea = new createjs.Shape(new createjs.Graphics().beginFill('#FFF').rect (0, 0, 70, 70));
//     this.cache(-25, -25, 50, 50);
//   }
// }
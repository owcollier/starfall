class Char {
  constructor() {
    this.shape = this._initialize();
    this.velocity = 10;
  }

  _initialize() {
    const shape = new createjs.Shape();
    shape.graphics.beginFill('#F8EFBA').drawCircle(0, 450, 50);
    shape.x = 100;
    shape.y = 97;
    return shape;
  }

  changeDirection(v) {
    this.velocity = v;
  }
}
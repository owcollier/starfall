class Meteor extends createjs.Shape {
  constructor(x, xV, yV) {
    super();
    this._initialize(x, v);
  }

  _initialize(x, xV, yV) {
    this.graphics.beginFill('#ff4c00').drawCircle(0, 0, 25);
    this.x = x;
    this.y = -25;
    this.xVelocity = xV;
    this.yVelocity =  yV;
    this.setBounds(this.x, this.y, 50, 50);
    this.hitArea = new createjs.Shape(new createjs.Graphics().beginFill('#FFF').rect (0, 0, 70, 70));
    this.cache(-25, -25, 50, 50);
  }
}
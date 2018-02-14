
const colors = ['#FC427B', '#FEA47F', '#9AECDB', '#FD7272', '#FFF' ]

class FallingStar {
  constructor(x, c, v) {
    this.shape = this._initialize(x, c, v);
  }

  _initialize(x, c, v) {
    const star = new createjs.Shape();
    star.graphics.beginFill(colors[c]).drawCircle(0, 0, 25);
    star.x = x;
    star.y = -25;
    star.velocity = v;
    return star;
  }
}
'use strict';

class CharSpriteSheet extends createjs.SpriteSheet {
  constructor(images) {
    super();
    this._initialize(images);
  }

  _initialize(images) {
    console.log(this);
    this.framerate = 30;
    this.images = [images];
    this.frames = {width:64, height:64, count:16, regX: 32, regY: 64, spacing:0, margin: 0};
    this.animations = {
      walk: [0, 15]
    }
  }
}
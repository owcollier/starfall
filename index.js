function randomXCoord() {
  return Math.floor(Math.random() * (450 - 25)) + 25;
}

function randomVelocity() {
  return Math.floor(Math.random() * (5 - 1) + 1);
}

function randomColorIndex() {
  return Math.floor(Math.random() * (5 - 1) + 1);
}

let loader, stage, nightSky, fallingStars, star, floor, shadow, char, charSpriteSheet, test;

function init() {
  initStage();

  loader = new createjs.LoadQueue(false);
  loader.addEventListener('complete', initGame);
  loader.addEventListener('progress', handleProgress);
  loader.loadManifest([
    {id:'char', src:'./assets/starfall_char.png'}
  ]);
}

// preload = new createjs.LoadQueue(false);
//     preload.addEventListener('complete', handleComplete);
//     preload.addEventListener('progress', handleProgress);
//     preload.loadManifest([
//         {id: 'isb', src: imgurl + 'side_back.png'}
// ]);

function handleProgress(){
  var percent = Math.round(loader.progress*100);
  console.log(percent+"%");
}

function handleComplete(){
  console.log('init assets');
  charSpriteSheet = new createjs.SpriteSheet({images: [loader.getResult('char')], frames: {width: 64, height: 64}, animations: {walk: [0, 15]}});
  char = new createjs.Sprite(charSpriteSheet);
  stage.addChild(char);
  char.play('walk');
  stage.update();
}

function initStage() {
  stage = new createjs.StageGL('dingCanvas');
}

function initSky() {
  nightSky = new createjs.Shape();
  nightSky.graphics.beginFill('#1B1464').drawRect(0, 0, stage.canvas.width, stage.canvas.height);
  nightSky.cache(0, 0, stage.canvas.width, stage.canvas.height);
}

function initStars() {
  fallingStars = new createjs.Container();
  addStar();
}

function addStar() {
  star = new FallingStar(randomXCoord(), randomColorIndex(), randomVelocity());
  fallingStars.addChild(star);
}

function initFloor() {
  floor = new createjs.Container();

  const floorTop = new createjs.Shape();
  floorTop.graphics.beginFill('#1B9CFC').drawRect(0, 590, stage.canvas.width, 15);
  floorTop.cache(0, 590, stage.canvas.width, 15);

  const floorSide = new createjs.Shape();
  floorSide.graphics.beginFill('#182C61').drawRect(0, 605, stage.canvas.width, 40);
  floorSide.cache(0, 605, stage.canvas.width, 40);

  floor.addChild(floorTop, floorSide);
}

function initShadow() {
  shadow = new createjs.Shape();
  shadow.graphics.beginFill('#1B1464').drawEllipse(-55, 448, 110, 10);
  shadow.x = 100;
  shadow.y = 145;
  shadow.cache(-55, 448, 110, 10);
}

function initChar() {

  charSpriteSheet = new createjs.SpriteSheet({images: [loader.getResult('char')], frames: {width: 64, height: 64}, animations: { walk: { frames: [0, 15], speed: 0.1}}});
  char = new Char(charSpriteSheet);
  char.framerate = 12;
  stage.addChild(char);
  char.y = 405;
  char.scaleX = -3;
  char.scaleY = 3;
  char.regX = 32;
  char.regY = 0;
  char.play('walk');
  stage.update();

  // const data = {
  //   images: ['./assets/starfall_char.png'],
  //   frames: {width: 64, height: 64},
  //   animations: {
  //     walk: [0, 15]
  //   }
  // };
  // // console.log(data);
  // charSpriteSheet = new createjs.SpriteSheet(data);
  // char = new Char(charSpriteSheet, 'walk');
}

function initTest() {
  console.log('testing, testing');
}

function populateStage() {
  stage.addChild(nightSky, fallingStars, floor, shadow, char);
  stage.update();
}

function setUp() {
  initSky();
  initStars();
  initFloor();
  initShadow();
  initChar();
  populateStage();
}

function initGame() {
  let myVelocity = 10;
  let starVelocity = 10;
  let starFallFrames = 40;
  let speedingUp = true;

  setUp();

  stage.addEventListener('click', (event) => {
    if (event.stageX >= char.x) {
      char.changeDirection();
      stage.update();
    }
    if (event.stageX < char.x) {
      char.changeDirection();
      stage.update();
    }
  })

  // createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.framerate = 20;
  createjs.Ticker.addEventListener('tick', () => {

    char.x += char.velocity;
    shadow.x += char.velocity;

    fallingStars.children.forEach( function (child) {
      child.speed += 1;
      child.y += child.velocity + child.speed;
      let pt = child.localToLocal(0, 0, char);

      if (char.hitArea.hitTest(pt.x, pt.y)) { 
        child.alpha = 0.2;
        console.log('hit!');
      } 

      if (child.y >= stage.canvas.height + 25) {
        fallingStars.removeChild(child);
      }

      stage.update();

    });

    if(createjs.Ticker.getTicks() % starFallFrames === 0) {
      addStar();
      stage.update();
    }

    if (char.x >= stage.canvas.width) {
      char.changeDirection(-10);
      stage.update();
    }

    if (char.x <= 0) {
      char.changeDirection(10);
      stage.update();
    }

    stage.update();

  });

  setInterval(function() {
    if (starFallFrames >= 40) {
      speedingUp = true;
      // console.log('<<<<<UPPER>>>>>')
    }
    if (starFallFrames <= 10) {
      speedingUp = false;
      // console.log('<<<<<BOTTOM>>>>>')
    }
    if (speedingUp) {
      starFallFrames -= 2;
    }
    else {
      starFallFrames += 2;
    }
    stage.update();
    // console.log(`frames at: ${starFallFrames}`);
    // console.log('speeding up?', speedingUp);
  }, 3000);

};

$(() => {
  init();
})
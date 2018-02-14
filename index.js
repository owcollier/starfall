function randomXCoord() {
  return Math.floor(Math.random() * (450 - 25)) + 25;
}

function randomVelocity() {
  return Math.floor(Math.random() * (15 - 5) + 5);
}

const charGraphics = new createjs.Graphics().beginFill('#F8EFBA').drawCircle(0, 450, 50);
const fallingStarGraphics = new createjs.Graphics().beginFill('#FC427B').drawCircle(0, 0, 25);

let stage;
let nightSky;
let fallingStars;
let floor;
let shadow;
let char;

function initStage() {
  stage = new createjs.Stage('dingCanvas');
}

function initSky() {
  nightSky = new createjs.Shape();
  nightSky.graphics.beginFill('#1B1464').drawRect(0, 0, stage.canvas.width, stage.canvas.height);
}

function initStars() {
  fallingStars = new createjs.Container();
  fallingStars.addChild(new createjs.Shape(fallingStarGraphics));
  fallingStars.children[0].x = randomXCoord();
  fallingStars.children[0].y = -25;
}

function addStar() {
  fallingStars.addChild(new createjs.Shape(fallingStarGraphics));
  fallingStars.children[fallingStars.children.length - 1].x = randomXCoord();
  fallingStars.children[fallingStars.children.length - 1].y = -25;
}

function initFloor() {
  floor = new createjs.Container();

  const floorTop = new createjs.Shape();
  floorTop.graphics.beginFill('#1B9CFC').drawRect(0, 590, stage.canvas.width, 15);

  const floorSide = new createjs.Shape();
  floorSide.graphics.beginFill('#182C61').drawRect(0, 605, stage.canvas.width, 40);

  floor.addChild(floorTop, floorSide);
}

function initShadow() {
  shadow = new createjs.Shape();
  shadow.graphics.beginFill('#1B1464').drawEllipse(-60, 448, 80, 10);
  shadow.x = 100;
  shadow.y = 145;
}

function initChar() {
  char = new createjs.Shape(charGraphics);
  char.x = 100;
  char.y = 97;
}

function populateStage() {
  stage.addChild(nightSky);
  stage.addChild(fallingStars);
  stage.addChild(floor);
  stage.addChild(shadow);
  stage.addChild(char);
  stage.update();
}

function initGame() {
  let myVelocity = 10;
  let starVelocity = 10;
  let starFallFrames = 40;
  let speedingUp = true;

  initStage();
  initSky();
  initStars();
  initFloor();
  initShadow();
  initChar();
  populateStage();

  stage.addEventListener('click', (event) => {
    if (event.stageX >= 240) {
      myVelocity = 10;
      stage.update();
    }
    if (event.stageX < 240) {
      myVelocity = -10;
      stage.update();
    }
  })

  createjs.Ticker.addEventListener('tick', () => {

    char.x += myVelocity;
    shadow.x += myVelocity;

    fallingStars.children.forEach( function (child) {

      child.y += starVelocity;

      if (child.y >= stage.canvas.height + 25) {
        fallingStars.removeChild(child);
      }

      stage.update();

    });

    if(createjs.Ticker.getTicks() % starFallFrames === 0) {
      addStar();
      stage.update();
    }

    if (char.x >= stage.canvas.width - 50) {
      myVelocity = -10;
      stage.update();
    }

    if (char.x <= 0 + 50) {
      myVelocity = 10;
      stage.update();
    }

    stage.update();

  });

  setInterval(function() {
    if (starFallFrames >= 40) {
      speedingUp = true;
      console.log('<<<<<UPPER>>>>>')
    }
    if (starFallFrames <= 10) {
      speedingUp = false;
      console.log('<<<<<BOTTOM>>>>>')
    }
    if (speedingUp) {
      starFallFrames -= 2;
    }
    else {
      starFallFrames += 2;
    }
    stage.update();
    console.log(`getting faster frames at: ${starFallFrames}`);
    console.log(speedingUp);
  }, 3000);

};

$(() => {
  initGame();
})
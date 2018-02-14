function randomXCoord() {
  return Math.floor(Math.random() * (450 - 25)) + 25;
}

function randomVelocity() {
  return Math.floor(Math.random() * (15 - 5) + 5);
}

function randomColorIndex() {
  return Math.floor(Math.random() * (5 - 1) + 1);
}

const charGraphics = new createjs.Graphics().beginFill('#F8EFBA').drawCircle(0, 450, 50);
const fallingStarGraphics = new createjs.Graphics().beginFill('#FC427B').drawCircle(0, 0, 25);

let stage, nightSky, fallingStars, star, floor, shadow, char, test;

function initStage() {
  stage = new createjs.Stage('dingCanvas');
}

function initSky() {
  nightSky = new createjs.Shape();
  nightSky.graphics.beginFill('#1B1464').drawRect(0, 0, stage.canvas.width, stage.canvas.height);
}

function initStars() {
  fallingStars = new createjs.Container();
  addStar();
}

function addStar() {
  star = new FallingStar(randomXCoord(), randomColorIndex(), randomVelocity());
  fallingStars.addChild(star.shape);
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
  char = new Char();
}

function initTest() {
  console.log('testing, testing');
}

function populateStage() {
  stage.addChild(nightSky);
  stage.addChild(fallingStars);
  stage.addChild(floor);
  stage.addChild(shadow);
  stage.addChild(char.shape);
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
      char.changeDirection(10);
      stage.update();
    }
    if (event.stageX < 240) {
      char.changeDirection(-10);
      stage.update();
    }
  })

  createjs.Ticker.addEventListener('tick', () => {

    char.shape.x += char.velocity;
    shadow.x += char.velocity;

    fallingStars.children.forEach( function (child) {

      child.y += child.velocity;

      if (child.y >= stage.canvas.height + 25) {
        fallingStars.removeChild(child);
      }

      stage.update();

    });

    if(createjs.Ticker.getTicks() % starFallFrames === 0) {
      addStar();
      stage.update();
    }

    if (char.shape.x >= stage.canvas.width - 50) {
      char.changeDirection(-10);
      stage.update();
    }

    if (char.shape.x <= 0 + 50) {
      char.changeDirection(10);
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
    console.log(`frames at: ${starFallFrames}`);
    console.log('speeding up?', speedingUp);
  }, 3000);

};

$(() => {
  initGame();
})
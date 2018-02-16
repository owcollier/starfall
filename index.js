function randomXCoord() {
  return Math.floor(Math.random() * ((stage.canvas.width - 25) - 25)) + 25;
}

function randomVelocity() {
  return Math.floor(Math.random() * (5 - 1) + 1);
}

function randomColorIndex() {
  return Math.floor(Math.random() * (5 - 1) + 1);
}

const rainbow = [
  '#FF0000',
  '#FF7F00',
  '#FFFF00',
  '#00FF00',
  '#0000FF',
  '#4B0082',
  '#9400D3'
]

let rainbowIndex = 0;

const PROGRESS = {
  score: 0,
  vibes: 'NO VIBES...'
}

let loader, stage, nightSky, fallingStars, star, starSprites, floor, shadow, char, charSpriteSheet, text, percent;

function init() {
  initStage();

  loader = new createjs.LoadQueue(false);
  loader.addEventListener('complete', initGame);
  loader.addEventListener('progress', handleLoading);
  loader.loadManifest([
    {id:'char', src:'./assets/starfall_char2.png'},
    {id:'star', src:'./assets/starfall_star2.png'}
  ]);
}

function handleLoading() {
  percent = Math.round(loader.progress*100);
  console.log(percent+"%");
}

function updateProgress() {
  if (PROGRESS.score >= 1 && PROGRESS.score <= 10) {
    PROGRESS.vibes = 'SOME VIBES...'
  }
  else if (PROGRESS.score <= 20) {
    PROGRESS.vibes = 'OKAY VIBES...'
  }
  else if (PROGRESS.score <= 30) {
    PROGRESS.vibes = 'PRETTY GOOD VIBES.'
  }
  else if (PROGRESS.score <= 40) {
    PROGRESS.vibes = 'GOOD VIBES!'
  }
  else if (PROGRESS.score <= 50) {
    PROGRESS.vibes = 'EXCELLENT VIBES!!'
  }
  else if (PROGRESS.score > 60) {
    PROGRESS.vibes = 'STRAIGHT VIBING!!!'
  }
  $('#progress').html(PROGRESS.vibes);
}

// function handleComplete(){
//   console.log('init assets');
//   charSpriteSheet = new createjs.SpriteSheet({images: [loader.getResult('char')], frames: {width: 64, height: 64}, animations: {walk: [0, 32]}});
//   char = new createjs.Sprite(charSpriteSheet);
//   stage.addChild(char);
//   char.play('walk');
//   stage.update();
// }

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
  starSprites = new createjs.SpriteSheet({images: [loader.getResult('star')], frames: {width: 32, height: 96}, animations: {fall: [0, 7]}});
  addStar();
}

function addStar() {
  star = new FallingStar(starSprites, randomXCoord(), randomVelocity());
  fallingStars.addChild(star);
  star.scale = 2;
  star.regX = 0;
  star.regY = 0;
  star.play('fall');
}

function initFloor() {
  floor = new createjs.Container();

  const floorTop = new createjs.Shape();
  floorTop.graphics.beginFill('#1B9CFC').drawRect(0, stage.canvas.height - 55, stage.canvas.width, 15);
  floorTop.cache(0, stage.canvas.height - 55, stage.canvas.width, 15);

  const floorSide = new createjs.Shape();
  floorSide.graphics.beginFill('#182C61').drawRect(0, stage.canvas.height - 40, stage.canvas.width, 40);
  floorSide.cache(0, stage.canvas.height - 40, stage.canvas.width, 40);

  floor.addChild(floorTop, floorSide);
}

function initShadow() {
  shadow = new createjs.Shape();
  shadow.graphics.beginFill('#1B1464').drawEllipse(47, stage.canvas.height - 53, 110, 10);
  // shadow.x = 100;
  // shadow.y = 145;
  shadow.cache(47, stage.canvas.height - 53, 110, 10);
}

function initChar() {

  charSpriteSheet = new createjs.SpriteSheet({images: [loader.getResult('char')], frames: {width: 64, height: 64}, animations: { walk: { frames: [0, 15], speed: 0.1}}});
  char = new Char(charSpriteSheet);
  char.y = stage.canvas.height - 240;
  char.scaleX = -3;
  char.scaleY = 3;
  char.regX = 32;
  char.regY = 0;
  char.play('walk');

}

// function initWelcome() {
//   text = new createjs.Text("catch the stars and accumulate good vibes!", "24px Arial", "#FFF");
//   text.x = 100;
//   text.y = 400;
//   text.textBaseline = "alphabetic";
//   text.cache(-200, -200, 600, 2000);
// }

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

  if (window.innerHeight > window.innerWidth) {
    $('#resizeAlert').css('display', 'block');
  }

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
  createjs.Ticker.framerate = 15;
  createjs.Ticker.addEventListener('tick', () => {

    char.x += char.velocity;
    shadow.x += char.velocity;

    fallingStars.children.forEach( function (child) {
      child.speed += 1;
      child.y += child.velocity + child.speed;
      let pt = child.localToLocal(0, 0, char);

      if (char.hitArea.hitTest(pt.x, pt.y)) { 
        child.alpha = 0.2;
        PROGRESS.score += 1;
        $('#score').html(PROGRESS.score);
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
    updateProgress();
    if (rainbowIndex == 10) {
      rainbowIndex = 0;
    }
    $('#progress').css('color', rainbow[rainbowIndex]);
    rainbowIndex += 1;
  }, 1000);

  setInterval(function() {
    if (starFallFrames >= 40) {
      speedingUp = true;
    }
    if (starFallFrames <= 10) {
      speedingUp = false;
    }
    if (speedingUp) {
      starFallFrames -= 2;
    }
    else {
      starFallFrames += 2;
    }
    stage.update();
  }, 3000);

};

window.addEventListener('resize', () => {
  if (window.innerHeight > window.innerWidth) {
    $('#resizeAlert').css('display', 'block');
  }
  else {
    $('#resizeAlert').css('display', 'none');
  }
});

$(() => {
  init();
})
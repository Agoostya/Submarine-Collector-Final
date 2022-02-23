var submarine, starfish, trash, starfishImg, trashImg, seabg1, seabg2, goldCoin, goldCoinImg;
var gameover, gameoverImg, resetImg, reset, submarineImg, ground;
var oceanSound, bellSound, gameoverSound;
var PLAY=1;
var END=0;
var gameState=PLAY;
var score=0;
var starfishGroup,trashGroup,goldCoinGroup,sharkGroup;
var shark,sharkImg;

function preload(){
  submarineImg=loadImage('./assets/submarine.png');
  trashImg=loadImage('./assets/bottle.png');
  starfishImg=loadImage('./assets/starfish.png');
  seabg1=loadImage('./assets/sea2.jpeg');
  seabg2=loadImage('./assets/sea1.jpeg');
  gameoverImg=loadImage('./assets/gameover.png');
  resetImg=loadImage('./assets/reset.png');
  goldCoinImg=loadImage("./assets/goldcoin.png");
  sharkImg=loadImage("./assets/shark.png");

  oceanSound=loadSound("ocean.mp3");
  bellSound=loadSound("bell.mp3");
  gameoverSound=loadSound("gameover.mp3");
}

function setup(){
  createCanvas(displayWidth,displayHeight);

  ground=createSprite(width/3.5,height/3,displayWidth,displayHeight);
  ground.addImage(seabg1);
  ground.scale=1.7;

  submarine=createSprite(width/8,height/2);
  submarine.addImage(submarineImg);
  submarine.scale=0.2;
  submarine.setCollider("circle",0,0,140);

  gameover=createSprite(width/2,height/2);
  gameover.addImage(gameoverImg);
  gameover.scale=0.5;
  gameover.visible=false;

  reset=createSprite(width-50,50);
  reset.addImage(resetImg);
  reset.scale=0.5;
  reset.visible=false;

  oceanSound.play();

  starfishGroup=new Group();
  trashGroup=new Group();
  goldCoinGroup=new Group();
  sharkGroup=new Group();
}

function draw(){
  background('#014574');

  if(gameState==PLAY){
    if(ground.x<width/3){
      ground.x=width/2;
    }
  
    spawnTrash();
    spawnStarfish();
    spawnGoldCoins();
    spawnSharks();
  
    submarine.y=mouseY;
    ground.velocityX=-10;

    if(trashGroup.isTouching(submarine)){
      score=score+50;
      trashGroup.destroyEach();
      bellSound.play();
    }

    if(goldCoinGroup.isTouching(submarine)){
      score=score+100;
      goldCoinGroup.destroyEach();
      bellSound.play();
    }
    
    if(starfishGroup.isTouching(submarine)){
      gameoverSound.play();
      gameState=END;
    }

    if(sharkGroup.isTouching(submarine)){
      gameoverSound.play();
      gameState=END;
    }
  }

  if(gameState===END){
    ground.velocityX=0;
    gameover.visible=true;
    reset.visible=true;

    if(mousePressedOver(reset)){
      resetFunc();
    }

    trashGroup.setVelocityXEach(0);
    starfishGroup.setVelocityXEach(0);
    trashGroup.setLifetimeEach(-1);
    starfishGroup.setLifetimeEach(-1);
    goldCoinGroup.setVelocityEach(0);
    goldCoinGroup.setLifetimeEach(-1);
  }

  drawSprites();

  textSize(20);
  fill("white");
  text("Score: "+score,500,50);
}

function spawnTrash(){
  if(frameCount%175===0){
    trash=createSprite(width+10,Math.round(random(height/4,height-100)));
    trash.addImage(trashImg);
    trash.velocityX=-6.5;
    trash.lifetime=width/2;
    trash.scale=0.2;
    trashGroup.add(trash);
  }
}

function spawnStarfish(){
  if(frameCount%150===0){
    starfish=createSprite(width+10,Math.round(random(height/3,height-100)));
    starfish.addImage(starfishImg);
    starfish.velocityX=-5.6;
    starfish.lifetime=width/2;
    starfish.scale=0.1;
    starfishGroup.add(starfish);
  }
}

function spawnGoldCoins(){
  if(frameCount%240===0){
    goldCoin=createSprite(width+10,Math.round(random(height/3,height-100)));
    goldCoin.addImage(goldCoinImg);
    goldCoin.velocityX=-7.3;
    goldCoin.lifetime=width/2;
    goldCoin.scale=0.1;
    goldCoinGroup.add(goldCoin);
  }
}

function spawnSharks(){
  if(frameCount%325===0){
    shark=createSprite(width+10,Math.round(random(height/3,height-100)));
    shark.addImage(sharkImg);
    shark.velocityX=-15.9;
    shark.lifetime=width/2;
    shark.scale=0.1;
    sharkGroup.add(shark);
  }
}

function resetFunc(){
  gameover.visible=false;
  gameState=PLAY;
  trashGroup.destroyEach();
  starfishGroup.destroyEach();
  score=0;
}
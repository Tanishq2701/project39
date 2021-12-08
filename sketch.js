var canvas, bgIMG;
var sonic, ring, spike;
var sonicRunningIMG, ringIMG, spikeIMG;
var rings, spikes;
var test1;

var score = 0;
gameState = 0;


function preload() {
  bgIMG = loadImage("sprites/track.jpg");
  sonicRunningIMG = loadImage("sprites/sonic_running.gif");
  sonicLostIMG = loadImage("sprites/sonic_lost.gif");
  ringIMG = loadImage("sprites/ring.png");
  spikeIMG = loadImage("sprites/spike.png");
}


function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight - 320);

  sonic = createSprite(190, 380, 50, 50);
  sonic.addImage(sonicRunningIMG);
  sonic.scale = 0.65;
  sonic.velocityX = 20;

  rings = createGroup();
  spikes = createGroup();
}


function draw() {
  background("#0030B8");
  image(bgIMG, 0, 0);

  //moving the camera with the player and moving the player
  camera.position.x = sonic.position.x + 760;
  //camera.position.x = 950;
  //camera.velocityX = 20;
  camera.position.y = 380;
  sonic.y = World.mouseY;
  if(camera.position.x > 6500) {
    sonic.position.x = 500;
  }

  //spawn rings
  if(frameCount % 30 == 0) {
    ring = createSprite(camera.position.x + 940, random(170,600));
    ring.addImage(ringIMG);
    ring.scale = 0.15;
    ring.visible = true;
    ring.lifetime = 82;
    rings.add(ring);
  }

  //gaining rings
  if(rings.isTouching(sonic)) {
    score++;
  }

  //spawn obstacles
  if(frameCount % 45 == 0) {
    spike = createSprite(camera.position.x + 940, random(170,600));
    spike.addImage(spikeIMG);
    spike.scale = 2.5;
    spike.lifetime = 81;
    spikes.add(spike);
  }

  //takign damage and losinglosing
  if(spikes.isTouching(sonic)) {
    score = score - 10;
  }
  if(spikes.isTouching(sonic) && score <= 0) {
    gameState = 1;
  }

  //losing screen
  if(gameState == 1) {
    sonic.position.y = 380;
    sonic.velocityX = 0;
    sonic.addImage(sonicLostIMG);
    sonic.scale = 0.4;
    rings.destroyEach();
    spikes.destroyEach();

    fill("white");
    stroke("white");
    strokeWeight(4);
    textSize(90);
    textFont("Courier New");
    text("GAME", sonic.position.x + 600, 360);
    text("OVER", sonic.position.x + 600, 450);
  }

  drawSprites();

  fill("black");
  stroke("black");
  strokeWeight(2);
  textSize(40);
  textFont("Courier New");
  text("Rings: "+ score, sonic.position.x - 100, 77);
}
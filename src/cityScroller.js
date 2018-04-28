//since these are variables we don't want to ever change in the code, we capitalize them
var WINDOW_WIDTH = screen.width;
var WINDOW_HEIGHT = 375;
var SPACE_BUTTON = '32';
var UP_BUTTON = '38';
var DOWN_BUTTON = '40';

//Building testBuilding = new Building(0, random(10, 20), 100, color(2, 10, 300));
//TODO: Create an instance of your Skyline object
Sun testSun = new Sun(20, 30, 100);
Cloud testCloud = new Cloud(random(75, 100), random(75, 100), 85, 35, 0.45);
Cloud cloud2 = new Cloud(random(375, 400), random(50, 75), 85, 35, 0.45);
Cloud cloud3 = new Cloud(random(675, 700), random(85, 110), 85, 35, 0.45);
Cloud cloud4 = new Cloud(random(975, 1000), random(40, 65), 85, 35, 0.45);
Character Kylo = new Character(-7, 60, (random(WINDOW_HEIGHT - 175, WINDOW_HEIGHT - 250)));
Character Diana = new Character(-7, 300, (random(WINDOW_HEIGHT - 175, WINDOW_HEIGHT - 250)));
Character Barry = new Character (-7, 500,(random(WINDOW_HEIGHT - 175, WINDOW_HEIGHT - 250)));
Character Bruce = new Character (-7, 700, (random(WINDOW_HEIGHT - 175, WINDOW_HEIGHT - 250)));
Character Iris = new Character (-7, 900, (random(WINDOW_HEIGHT - 175, WINDOW_HEIGHT - 250)));

//@pjs preload must be used to preload the image
/* @pjs preload="yello0.gif, yello1.gif, yello2.gif, yello3.gif" */

PImage[] polarbear = new PImage[4];

//@pjs preload must be used to preload the image
/* @pjs preload="background4.png" */

PImage backgroundImage;

//@pjs preload must be used to preload the image
/* @pjs preload="character.jpg" */

PImage characterImage;



// This function only runs once at the start of the program
void setup() {
  size(WINDOW_WIDTH, WINDOW_HEIGHT); //sets the size of the window
  frameRate(10); //how many times the draw function is called per second
  backgroundImage = loadImage("background4.png");
  //noLoop();
//loop for Sprite
  for (var i = 0; i < polarbear.length; i++) {
    polarbear[i] = loadImage("yello" + i + ".gif");
  }
}

// called repeatedly
void draw() {

  //TODO: Call drawSkyline on your Skyline object
  image(backgroundImage, 0, 0);
  testSun.drawSun();
  testCloud.drawCloud();
  cloud2.drawCloud();
  cloud3.drawCloud();
  cloud4.drawCloud();
  fill(255, 255, 255);
  rect(0, 200, screen.width, WINDOW_HEIGHT - 20);
  Kylo.drawCharacter();
  Diana.drawCharacter();
  Barry.drawCharacter();
  Bruce.drawCharacter();
  Iris.drawCharacter();

  font = loadFont("FFScala.ttf");

  String a = "Hi, my name's Kylo.";

  String b = "Hi, my name's Diana.";

  String c = "Hi, my name's Barry.";

  String d = "Hi, my name's Bruce.";

  String e = "Hi, my name's Iris.";

  String welcome = "Welcome to the Arctic Circle,";
  String purpose = "a place for kids to come learn about polar bears";
  String how = "and how they can help them.";
  String space = "Press the space bar to watch the animation and learn.";

  textFont(font);

//Welcome to the circle code
  fill(150,150,255);
  ellipse(180, 100, 360, 180);
  fill(255,255,255);
  text(welcome, 50, 60);
  text(purpose, 50, 85);
  text(how, 50, 105);
  text(space, 50, 130);

//Kylo Text code
  fill(150, 150, 150);

  rect(Kylo.cxPosition - 10, Kylo.cyPosition + 50, 125, 25);

  fill(255, 255, 255);

  text(a, Kylo.cxPosition, Kylo.cyPosition + 65);

//Diana text code
  fill(150, 150, 150);

  rect(Diana.cxPosition - 10, Diana.cyPosition + 45, 125, 25);

  fill(255, 255, 255);

  text(b, Diana.cxPosition, Diana.cyPosition + 60);

//Barry text code

  fill(150, 150, 150);

  rect(Barry.cxPosition - 10, Barry.cyPosition + 45, 125, 25);

  fill(255, 255, 255);

  text(c, Barry.cxPosition, Barry.cyPosition + 60);

//Bruce text code

  fill(150, 150, 150);

  rect(Bruce.cxPosition - 10, Bruce.cyPosition + 45, 125, 25);

  fill(255, 255, 255);

  text(d, Bruce.cxPosition, Bruce.cyPosition + 60);

//Iris text code

  fill(150, 150, 150);

  rect(Iris.cxPosition - 10, Iris.cyPosition + 45, 125, 25);

  fill(255, 255, 255);

  text(e, Iris.cxPosition, Iris.cyPosition + 60);

  if (keyCode == SPACE_BUTTON) {
    testSun.moveSun();
    testCloud.moveCloud();
    cloud2.moveCloud();
    cloud3.moveCloud();
    cloud4.moveCloud();
    Kylo.moveCharacter();
    Diana.moveCharacter();
    Barry.moveCharacter();
    Bruce.moveCharacter();
    Iris.moveCharacter();
  }

  if (frameCount % 30 == 0) {

  }

}

class Sun {
  var sunXPos;
  var sunYPos;
  var sunRadius;

  Sun(float sXP, sYP, sR) {
    sunXPos = sXP;
    sunYPos = sYP;
    sunRadius = sR;
    sunColor = color(255, 214, 94);
  }

  void moveSun() {
    drawSun();
    updateSun();
  }

  void drawSun() {
    noStroke();
    fill(sunColor);
    ellipse(sunXPos, sunYPos, sunRadius, sunRadius);
  }

  void updateSun() {
    sunXPos += 0.05;
    if (sunXPos - 100 > width) {
      sunXPos = -40;
    }
  }
}

class Cloud {
  var cloudXPos;
  var cloudYPos;
  var cloudWidth;
  var cloudHeight;
  var cloudSpeed;
  var cloudColor;

  Cloud(float cXP, float cYP, float cW, float cH, float cS) {
    cloudXPos = cXP;
    cloudYPos = cYP;
    cloudWidth = cW;
    cloudHeight = cH;
    cloudSpeed = cS;
  }
  void moveCloud() {
    drawCloud();
    updateCloud();
    addCloud();
  }

  void drawCloud() {
    fill(255, 255, 255);
    ellipse(cloudXPos, cloudYPos, cloudWidth, cloudHeight);
    ellipse(cloudXPos - 30, cloudYPos - 10, cloudWidth - 50, cloudHeight - 16);
    ellipse(cloudXPos + 30, cloudYPos - 10, cloudWidth - 50, cloudHeight - 16);
    ellipse(cloudXPos, cloudYPos - 15, cloudWidth - 50, cloudHeight - 16);
    ellipse(cloudXPos + 50, cloudYPos, cloudWidth - 45, cloudHeight - 20);
    ellipse(cloudXPos - 50, cloudYPos, cloudWidth - 45, cloudHeight - 20);
  }

  void updateCloud() {
    if (cloudXPos <= WINDOW_WIDTH) {
      cloudXPos += cloudSpeed;
    } else {
      cloudXPos = 0;
    }
  }

  void addCloud() {
    var randomXPos = random(75, 1000);
    var randomYPos = random(40, 100);
    Cloud currentCloud = new Cloud(randomXPos, randomYPos, cloudWidth, cloudHeight, cloudSpeed);
  }

}

class Character {

  var cxPosition, cyPosition, charSpeed, imageNumber;

  Character(var charSpeed, var cxPosition, var cyPosition) {

    this.cxPosition = cxPosition;

    this.charSpeed = charSpeed;

    this.cyPosition = cyPosition;

    imageNumber = 0;

  }

  void moveCharacter() {

    drawCharacter();

    updateCharacter();

  }

  void drawCharacter() {
    image(polarbear[imageNumber], cxPosition, cyPosition, 200, 150);

  }

  void updateCharacter() {

    cxPosition -= charSpeed;

    if (cxPosition > WINDOW_WIDTH) {

      cxPosition = -100;

    }

    imageNumber++;

    if (imageNumber == polarbear.length) {
      imageNumber = 0;
    }
  }

}

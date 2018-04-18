//since these are variables we don't want to ever change in the code, we capitalize them
var WINDOW_WIDTH = screen.width;
var WINDOW_HEIGHT = 375;
var BACKGROUND_COLOR = color(64, 159, 232);
var RIGHT_ARROW = '39';

//Building testBuilding = new Building(0, random(10, 20), 100, color(2, 10, 300));
//TODO: Create an instance of your Skyline object
Sun testSun = new Sun(20, 30, 100);
Cloud testCloud = new Cloud(random(75, 100), random(75, 100), 85, 35, 0.45);
Cloud cloud2 = new Cloud(random(375, 400), random(50, 75), 85, 35, 0.45);
Cloud cloud3 = new Cloud(random(675, 700), random(85, 110), 85, 35, 0.45);
Cloud cloud4 = new Cloud(random(975, 1000), random(40, 65), 85, 35, 0.45);
Character kyloRen = new Character(-.005);

//@pjs preload must be used to preload the image
/* @pjs preload="yello0.gif, yello1.gif, yello2.gif, yello3.gif" */

PImage[] polarbear = new PImage[4];

//@pjs preload must be used to preload the image
/* @pjs preload="background3.png" */

PImage backgroundImage;

//@pjs preload must be used to preload the image
/* @pjs preload="character.jpg" */

PImage characterImage;




// This function only runs once at the start of the program
void setup() {
  size(WINDOW_WIDTH, WINDOW_HEIGHT); //sets the size of the window
  frameRate(10); //how many times the draw function is called per second
  backgroundImage = loadImage("background3.png");
  //noLoop();
//loop for Sprite
  for (var i = 0; i < polarbear.length; i++) {
    polarbear[i] = loadImage("yello" + i + ".gif");
  }
}

// called repeatedly
void draw() {
  background(BACKGROUND_COLOR); //needed in the draw function to "clear" the screen between updates
  //testBuilding.drawAndUpdate();
  //TODO: Call drawSkyline on your Skyline object
  image(backgroundImage, 0, 0);
  testSun.drawSun();
  testCloud.drawCloud();
  cloud2.drawCloud();
  cloud3.drawCloud();
  cloud4.drawCloud();
  fill(255, 255, 255);
  rect(0, 300 , screen.width, WINDOW_HEIGHT - 250);
  kyloRen.drawCharacter();


  if (keyCode == RIGHT_ARROW) {
    //image(backgroundImage, 0, 0);
    testSun.moveSun();
    testCloud.moveCloud();
    cloud2.moveCloud();
    cloud3.moveCloud();
    cloud4.moveCloud();
    kyloRen.moveCharacter();
  }

}

class Character {

  var cxPosition, charSpeed, imageNumber;

  Character(float cSpeed) {

    this.cxPosition = WINDOW_WIDTH - 50;

    this.charSpeed = cSpeed;

    cyP = WINDOW_HEIGHT - 100;

    imageNumber = 0;

  }

  void moveCharacter() {

    drawCharacter();

    updateCharacter();

  }

  void drawCharacter() {

    image(polarbear[imageNumber], 50, WINDOW_HEIGHT - 100, 100, 85);

  }

  void updateCharacter() {

    cxPosition -= charSpeed;

    if (cxPosition < 0) {

      cxPosition = WINDOW_WIDTH - 50;

    }

    imageNumber++;

    if (imageNumber == polarbear.length) {
      imageNumber = 0;
    }
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
    sunColor = color(255, 246, 0);
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
      // sunColor = color(255,255,255);
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
    //currentCloud.moveCloud();
  }

}

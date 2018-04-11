//since these are variables we don't want to ever change in the code, we capitalize them
var WINDOW_WIDTH = screen.width;
var WINDOW_HEIGHT = 375;
var BACKGROUND_COLOR = color(64, 159, 232);
var RIGHT_ARROW = '39';

//Glacier testGlacier = new Glacier(0, random(10, 20), 100, color(2, 10, 300));
//TODO: Create an instance of your Skyline object
Skyline testSkyline = new Skyline(185, -5, (color(161, 193, 209)));
Skyline secondSkyline = new Skyline(250, -3.5, (color(112, 138, 150)));
Skyline thirdSkyline = new Skyline(300, -2, (color(55, 83, 96)));
Sun testSun = new Sun(20, 30, 100);
Cloud testCloud = new Cloud(random(75, 100), random(75, 100), 85, 35, 0.25);
Cloud cloud2 = new Cloud(random(375, 400), random(50, 75), 85, 35, 0.25);
Cloud cloud3 = new Cloud(random(675, 700), random(85, 110), 85, 35, 0.25);
Cloud cloud4 = new Cloud(random(975, 1000), random(40, 65), 85, 35, 0.25);
Character kyloRen = new Character(-3);

//@pjs preload must be used to preload the image
/* @pjs preload="tmp-0.gif, tmp-1.gif, tmp-2.gif, tmp-3.gif, tmp-4.gif, tmp-5.gif, tmp-6.gif, tmp-7.gif" */

PImage[] walkman = new PImage[8];

//@pjs preload must be used to preload the image
/* @pjs preload="background3.png" */

PImage backgroundImage;

//@pjs preload must be used to preload the image
/* @pjs preload="character.jpg" */

PImage characterImage;


//@pjs preload must be used to preload the image
/* @pjs preload="glacier.png" */

PIMage[] iceImage;


// This function only runs once at the start of the program
void setup() {
  size(WINDOW_WIDTH, WINDOW_HEIGHT); //sets the size of the window
  frameRate(30); //how many times the draw function is called per second
  backgroundImage = loadImage("background3.png");
  //noLoop();
  characterImage = loadImage("character.jpg");

  iceImage = loadImage("glacier.png");

//loop for Sprite
  for (var i = 0; i < walkman.length; i++) {
    walkman[i] = loadImage("tmp-" + i + ".gif");
  }
}

// called repeatedly
void draw() {
  background(BACKGROUND_COLOR); //needed in the draw function to "clear" the screen between updates
  //testGlacier.drawAndUpdate();
  //TODO: Call drawSkyline on your Skyline object
  image(backgroundImage, 0, 0);
  testSun.drawSun();
  testCloud.drawCloud();
  cloud2.drawCloud();
  cloud3.drawCloud();
  cloud4.drawCloud();
  thirdSkyline.drawSkyline();
  secondSkyline.drawSkyline();
  testSkyline.drawSkyline();
  fill(255, 255, 255);
  rect (WINDOW_WIDTH/1000, WINDOW_HEIGHT - 20, screen.width + 100, 30);
  kyloRen.drawCharacter();

  if (keyCode == RIGHT_ARROW) {
    //image(backgroundImage, 0, 0);
    testSun.moveSun();
    testCloud.moveCloud();
    cloud2.moveCloud();
    cloud3.moveCloud();
    cloud4.moveCloud();
    thirdSkyline.moveSkyline();
    secondSkyline.moveSkyline();
    testSkyline.moveSkyline();
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

    image(walkman[imageNumber], 50, WINDOW_HEIGHT - 70, 100, 85);

  }

  void updateCharacter() {

    cxPosition -= charSpeed;

    if (cxPosition < 0) {

      cxPosition = WINDOW_WIDTH - 50;

    }

    imageNumber++;

    if (imageNumber == walkman.length) {
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

/**
 * Represents one layer of a city skyline, which is a collection of glaciers
 * that all move at the same speed.
 */
class Skyline {
  ArrayList < Glacier > glacierList;
  var xPosition;
  var bw;
  var glacierHeight;
  var speed;
  var glacierColor;


  /**
   * Constructs a SkyLine with enough glaciers to fill the screen
   */
  Skyline(float bh, float s, float bC) {
    glacierList = new ArrayList < Glacier > ();
    xPosition = 0;
    bw = 200;
    glacierHeight = bh;
    speed = s;
    glacierColor = bC
    fillSkyline(); //when a Skyline is created it automatically has enough glaciers to fill the screen
  }

  void moveSkyline() {
    //TODO: update and draw the skyline, add glaciers as glaciers leave the screen
    drawSkyline();
    updateSkyline(speed);
  }

  /**
   * Draws the skyline, placing it on the screen
   */
  void drawSkyline() {
    //TODO: loop through glacierList and draw each Glacier
    stroke();
    for (var i = 0; i < glacierList.size(); i++) {
      var randomGlacier = glacierList.get(i);
      randomGlacier.drawGlacier();
    }

  }

  /**
   * Updates the position of each Glacier in the SkyLine
   */
  void updateSkyline(var skylineSpeed) {
    //TODO:loop through glacierList and update each Glacier
    for (var i = 0; i < glacierList.size(); i++) {
      var randomGlacier = glacierList.get(i);
      randomGlacier.update(skylineSpeed);
      if (randomGlacier.getX() + randomGlacier.getWidth() < 0) {
        addGlacier();
        glacierList.remove(i);
        i--;
      }
    }
    xPosition += skylineSpeed;

  }

  /**
   * Adds a glacier of random glacier width and then updates
   * the x position to be the right corner of the glacier in order
   * to have the next glacier not overlap
   */
  void addGlacier() {
    var randomGlacierWidth = random(40, 80);
    Glacier currentGlacier = new Glacier(xPosition, randomGlacierWidth, glacierHeight, glacierColor);
    glacierList.add(currentGlacier);
    xPosition += randomGlacierWidth;
  }


  void fillSkyline() {
    //TODO:add enough glaciers to fill the screen
    // hint - use xPosition and WINDOW_WIDTH to figure out when you have
    //        enough glaciers
    while (xPosition - 500 < WINDOW_WIDTH) {
      addGlacier();
    }
  }
}

/**
 * Represents a glacier, providing a way to place a glacier and move
 * it across the screen.
 */
class Glacier {

  var xPosition, yPosition, glacierHeight, glacierWidth;
  var glacierColor;

  /**
   * Constructs a Glacier object
   * @param xPos - the x position of the top left corner of the glacier
   * @param bw - the glacier's width
   */
  Glacier(var xPos,
    var bw,
      var bH, bC) {
    glacierHeight = random(50, bH);
    glacierWidth = bw;
    xPosition = xPos;
    glacierColor = bC;
  }

  void drawAndUpdate() {
    drawGlacier();
    update(5);
  }

  /**
   * Draws a glacier always attached to the bottom of the screen
   */
  void drawGlacier() {
    image(iceImage, 50, WINDOW_HEIGHT - 70, 100, 85);

    }

  int getX() {
    return xPosition;
  }

  int getWidth() {
    return glacierWidth;
  }

  /**
   * Updates the x position of the glacier
   * @param speed - the speed at which the glacier updates
   */
  void update(var speed) {
    xPosition += speed;
  }

}

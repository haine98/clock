function setup(){
// Simple p5.js Clock Template
// Golan Levin, 2016
 
var prevSec;
var prevMin;
var prevHour;
var millisRolloverTime;
var secRolloverTime;
var hourRolloverTime;
var cubeList;
var x = [];
var squareSize;
 
//--------------------------
function setup() {
  createCanvas(400, 650);
  millisRolloverTime = 0;
  secRolloverTime = 0;
  hourRolloverTime = 0;
  cubeList = [];
  squareSize = 15;
  for (var k = 0; k < 24; k++){
    randomX = int(random(35, width - squareSize - 20));
    randomY = int(random(200, height - squareSize - 20));
    append(x, randomX);
    append(x, randomY);
    append(x, int(random(0,230)));
    append(x, int(random(0,230)));
    append(x, int(random(0,230)));
    append(x, int(random(1, 9)));
    append(cubeList, x);
    x = [];
  }
  print(cubeList);
}
//--------------------------
 
//--------------------------
function draw() {
  background(255,255,255,150); // My favorite pink
 
  // Fetch the current time
  var H = hour();
  var M = minute();
  var S = second();
 
  // Reckon the current millisecond, 
  // particularly if the second has rolled over.
  // Note that this is more correct than using millis()%1000;
  if (prevSec != S) {
    millisRolloverTime = millis();
  }
  prevSec = S;
 
  if (prevMin != M) {
    secRolloverTime = millis();
  }
  prevMin = M;
 
  if (prevHour != H) {
    hourRolloverTime = millis();
  }
  prevHour = H;
 
  var smoothMin = floor(millis() - secRolloverTime);
  var mils = floor(millis() - millisRolloverTime);
  var smoothHour = floor(millis() - hourRolloverTime);
 
  //var leftMinDiv = map(height, 0, 800, 
 
 
  //fill(128,100,100);
  //text("Hour: "   + H, 10, 22);
  //text("Minute: " + M, 10, 42);
  //text("Second: " + S, 10, 62);
  //text("Millis: " + mils, 10, 82);
  //text("SmoothHour: " + smoothHour, 10, 102);
 
  var hourBarWidth   = map(H, 0, 23, 0, width);
  var minuteBarWidth = map(M, 0, 59, 0, width);
  var secondBarWidth = map(S, 0, 59, 0, width);
 
  // Make a bar which *smoothly* interpolates across 1 minute.
  // We calculate a version that goes from 0...60, 
  // but with a fractional remainder:
  var secondsWithFraction   = S + (mils / 1000.0);
  var secondsWithNoFraction = S;
  var secondBarWidthChunky  = map(secondsWithNoFraction, 0, 60, 0, width);
  var secondBarWidthSmooth  = map(secondsWithFraction,   0, 60, 0, width);
  var smoothMinFraction = M + secondsWithFraction;
  var smoothMinBar = map(smoothMinFraction, 0, (M*60) + 60, 0, width);
 
  //////////
 
  //noStroke();
  //fill(40);
  //rect(0, 100, hourBarWidth, 50);
  //fill(80);
  //rect(0, 150, minuteBarWidth, 50);
  //fill(120);
  //rect(0, 200, secondBarWidthChunky, 50);
  //fill(160);
  //rect(0, 250, secondBarWidthSmooth, 50);
  //fill(200);
  //rect(0, 50, smoothMinBar, 50);
  noStroke();
  var circleSize = 20;
 
  if (mils >= 300){
    var mapping2 = map(mils, 300, 999, 15, (height - (M * 10) - 10));
    fill(255, 153, 153);
    ellipse(width/2, mapping2, circleSize, circleSize);
  }
 
  var hourMap = map(smoothHour, 0, 3600000, height, 190);
  var minMap = map(smoothMin, 0, 60000, 10, 0);
  var minAdj = map(M, 0, 59, height - 15, 180);
 
  beginShape();
  for (var i = 0; i <= width+1; i++) {
    var mapWidth = map(i, i, width, PI, 2*PI); 
    var x = float(i);
    var mapping = map(mils, 0, 500, -PI, 0);
    var bounce = map(mils, 0,999, 9, 0);
    var y = 10 * sin(bounce * mapWidth * 0.1 * mapping) + (height - (M * 10) - 10);
    if (x >= 0 && x <= width+1){
      vertex(x, y);
    }
  }
 
 
  mapTankColR = map(M, 0, 60, 204, 255);
  mapTankColG = map(M, 0, 60, 255, 200);
  mapTankColB = map(M, 0, 60, 255, 200);
 
  fill(mapTankColR, mapTankColG, mapTankColB, 150);
  vertex(width, height);
  vertex(0, height);
  endShape();
 
  var minCount = 5;
 
  //255,200,200
  for (var j = height - 45; j > 50; j -= 50) {
    push();
    fill(128, 100, 100);
    text(minCount, 15, j);
    minCount += 5;
    pop();
  }
 
  for (var j = height - 10; j > 50; j -= 10) {
    push();
    stroke(0,0,0);
    strokeWeight(1);
    line(0, j, 10, j);
    pop();  
  }
 
  if (M == 59 && S == 59) {
    if (H == 23) {
      cubeAppear(0, mils);
    }
    else{
      cubeAppear(H+1, mils);
    }
  }
  for (var hor = 0; hor < H; hor++){
    push();
    var mapRotate = map(mils, 0, 999, 0, 2*PI);
    noFill();
    stroke(cubeList[hor][2],cubeList[hor][3],cubeList[hor][4]);
    rect(cubeList[hor][0] + (squareSize*cos(mapRotate * cubeList[hor][5]))/4, cubeList[hor][1] + (squareSize*sin(mapRotate * cubeList[hor][5]))/4,squareSize,squareSize);
    pop();
  }
  //0 0 153
}
 
function cubeAppear(hour, mils){
  if (hour == 0){
    setup();
    return;
  }
  else{
    noFill();
    strokeWeight(1);
    mapOpp = map(mils, 0, 800, 0, 255);
    stroke(cubeList[hour - 1][2],cubeList[hour - 1][3],cubeList[hour - 1][4], mapOpp);
    rect(cubeList[hour - 1][0],cubeList[hour - 1][1],squareSize,squareSize);
  //for (var cube = 0; cube < cubeList.length; cube++){
  //  push();
  //  noFill();
  //  stroke(cubeList[cube][2],cubeList[cube][3],cubeList[cube][4]);
  //  rect(cubeList[cube][0],cubeList[cube][1],squareSize,squareSize);
  //  pop();
  //}
  }
}

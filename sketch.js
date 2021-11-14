
var bgImg;
var hotAirBallon,hotAirBallonImg;
var database,position;

function preload(){
  hotAirBallonImg=loadAnimation("ballon1.png","ballon2.png","ballon3.png");
  bgImg=loadImage("bgImage.png");
}
function setup() {
  createCanvas(1500,600);

  database=firebase.database();

  hotAirBallon = createSprite(400, 200, 50, 50);
  hotAirBallon.addAnimation("ground",hotAirBallonImg);
  hotAirBallon.scale=0.5;

  var hotAirBallonposition=database.ref('balloon/position');
  hotAirBallonposition.on("value",readHeight,showError)
}
//readHeight
function draw() {
  background(bgImg); 
  if(keyDown(LEFT_ARROW)){
    // changePosition(-1,0);
    updateHeight(-10,0)
    hotAirBallon.x = hotAirBallon.x -10;
}
else if(keyDown(RIGHT_ARROW)){
    // changePosition(1,0);
    updateHeight(10,0)
    hotAirBallon.x = hotAirBallon.x +10;
}
else if(keyDown(UP_ARROW)){

  hotAirBallon.addAnimation("ground",hotAirBallonImg);

  updateHeight(0,-10)
  hotAirBallon.y = hotAirBallon.y -10;
}
else if(keyDown(DOWN_ARROW)){
    // changePosition(0,+1);
    hotAirBallon.addAnimation("ground",hotAirBallonImg);
   
    updateHeight(0,10)
    hotAirBallon.y = hotAirBallon.y +10;

}
  drawSprites();
}
function updateHeight(x,y){
database.ref('balloon/position').set({
  "x" : position.x + x ,
  "y" : position.y + y
})}

function showError(){
console.log("error");
}

function readHeight(data){
  position=data.val();
  hotAirBallon.x=position.x;
  hotAirBallon.y=position.y;
}
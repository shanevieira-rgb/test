
let canvas

function setup(){
    createCanvas(windowWidth,windowHeight);
    background(255);


}

function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
}

function draw() {
;
  
  for (let i=0; i<6; i++){
    noStroke();
    fill(255*(i/5));
    ellipse(width/2, height/2, 300-(i*50), 300-(i*50));
    ellipse(width/5, height/5, 300-(i*50), 300-(i*50));
    ellipse(1500, 800, 300-(i*50), 300-(i*50));
  }
  
}

function mouseMoved(){
 drawThing(mouseX,mouseY);
}

function drawThing(_x,_y){
    strokeWeight(0)
    fill(random(200,255),random(200,255),random(200,255));
 ellipse(_x, _y,30, 30)
}
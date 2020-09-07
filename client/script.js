
// Random Ball Placement

/*global io*/

let xBall, yBall, xSpeed, ySpeed, score;
let socket;
let otherPlayer;
let gameStart;
let img
let image1
let myFont
let dots

xBall = Math.floor(Math.random() * 300) + 50;
yBall = 50;
xSpeed = (2, 7);
ySpeed = (-7, -2);
score = 0;
gameStart = false;

dots = [];


// Canvas
function setup() {
  createCanvas(400, 400);
  socket = io.connect("https://cold-buttery-reward.glitch.me");
  console.log(socket);
  socket.on("mouse", movePaddle);
  for (let x = 0; x < 20; x++) {
    dots.push(new BouncyDot());
}

  myFont = loadFont('https://cdn.glitch.com/cd6ff4ec-a269-44d1-8663-bc4b0f728a79%2FSmilen-gKW6.otf?v=1596066038007');
  img = loadImage("https://cdn.glitch.com/cd6ff4ec-a269-44d1-8663-bc4b0f728a79%2Ftable-tennis-4040589_640.jpg?v=1596064807871")
}

function movePaddle(data) {
  
  // background(0);
  
  fill('#fffff');
  rect(data.x, 20, 90, 15);
  
  // Paddle
//   fill("#ffffff");
//   rect(mouseX, 375, 90, 15);
  
  otherPlayer = data;
  if (xBall > data.x && xBall < data.x + 90 && yBall + 10 >= 35) {
    xSpeed *= -1;
    ySpeed *= -1;
    score++;
  }
  
//   if (xBall > mouseX && xBall < mouseX + 90 && yBall + 10 >= 375) {
//     xSpeed *= -1;
//     ySpeed *= -1;
//     score++;
//   }
  
//   //Functions
//   move();
//   display();
//   bounce();
//   //resetBall();

//   //Score
//   fill("#d9c3f7");
//   textSize(24);
//   text("Score: " + score, 10, 25);
}
  //console.log(data);


function mouseDragged() {
  let data = {
    "x": mouseX,
    "y": mouseY
  };
  
  socket.emit("mouse", data);

}

//Background

 function draw() {
   if (gameStart){
      // Background
      background(0);

      // Paddle
      fill("#ffffff");
      rect(mouseX, 375, 90, 15);

      // Paddle2
      if(otherPlayer != undefined){  
        rect(otherPlayer.x, 20, 90, 15)
      }
     
      //Functions
      move();
      display();
      bounce();
      paddle();
  

      //Score
      fill("#d9c3f7");
      textSize(24);
      text("Score: " + score, 10, 25);
      console.log(otherPlayer)
    } else {
         displayStart();
       }
}

// Ball Functions
function move() {
  xBall += xSpeed;
  yBall += ySpeed;
}

function bounce() {
  if (xBall < 10 || xBall > 400 - 10) {
    xSpeed *= -1;
  }
  if (yBall < 10 || yBall > 400 - 10) {
    ySpeed *= -1;
  }
}

//Reset Ball
function resetBall() {
  if (yBall >= 400 || yBall > 400 - 10) {
    ySpeed = 4;
  }
}

function display() {
  fill("#d9c3f7");
  ellipse(xBall, yBall, 20, 20);
}

// Bounce off Paddle
function paddle() {
  if (xBall > mouseX && xBall < mouseX + 90 && yBall + 10 >= 375) {
    xSpeed *= -1;
    ySpeed *= -1;
    score++;
  }
}

function displayStart(){
  background(220)
  for (let i = 0; i < dots.length; i++) {
    dots[i].float();
    dots[i].display();
  }
  //image(img, 100, 100, 100, 100)
  textSize(20);
  fill(0);
  textFont(myFont)
  text("Welcome to the World of Unlimited PONG", 20, 50);
  textSize(15)
  textFont(myFont)
  text("Where we don't play for money, we play in the sockets", 20, 125)
  textSize(30)
  textFont(myFont)
  text("Press s to start", 20, 200)
  
}

function keyTyped(){
  if(key == 's'){
    gameStart = true;
  }
}




class BouncyDot {
  constructor() {
    // Randomly generate position
    this.x = random(width);
    this.y = random(height);
    // Randomly generate radius
    this.r = random(5, 12);
    // Randomly generate color
    this.color = random(360);
    // Randomly generate a master velocity (broken into components)...
    this.masterXvelocity = random(0.5, 3);
    this.masterYvelocity = random(0.5, 3);
    // ...and use those as starting velocities.
    this.xVelocity = this.masterXvelocity;
    this.yVelocity = this.masterYvelocity;
  }

  float() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    // Standard bounce code - like the DVD logo, but for spheres.
    if (this.x + this.r > width) {
      this.xVelocity = -1 * this.masterXvelocity;
    }
    if (this.x - this.r < 0) {
      this.xVelocity = this.masterXvelocity;
    }
    if (this.y + this.r > height) {
      this.yVelocity = -1 * this.masterYvelocity;
    }
    if (this.y - this.r < 0) {
      this.yVelocity = this.masterYvelocity;
    }
  }

  display() {
    fill(this.color, 80, 70);
    noStroke();
    ellipse(this.x, this.y, this.r * 2);
  }
}

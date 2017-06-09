var bugs = []; // array of Jitter objects

function setup() {
  createCanvas(710, 400);
  // Create objects
  for (var i=0; i<5; i++) {
    bugs.push(new Jitter());
  }
  fooBar.blah();
}

function draw() {
  background(50, 89, 100);
  for (var i=0; i<bugs.length; i++) {
    bugs[i].move();
    bugs[i].display();
  }
}

function fooBar() {
  this.blah = function (){
    console.log('please work');
  };
}

// Jitter class
function Jitter() {
  this.x = random(width);
  this.y = random(height);
  this.diameter = random(10, 30);
  this.speed = 1;

  this.move = function() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  };

  this.display = function() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  };
}
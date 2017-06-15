var tree;

var canvas_dim = 800;
var max_dist = Math.floor( canvas_dim / 10 ); // 40;
var min_dist = Math.floor( canvas_dim / 40 ); // 10;
var num_leaves = canvas_dim;
var branch_length = Math.floor( canvas_dim / 80 );

function setup() {
  createCanvas(canvas_dim, canvas_dim);
  tree = new Tree();

}

function draw() {
	background(51);
  tree.show();
  tree.grow();
  // stop drawing
  if ( tree.grow_cycles_since_last_grown > 25 ) {
  	noLoop();
  }
  
}
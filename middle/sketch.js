// TODO allow for the use of es6

// how many rows board is subdivided into (MUST BE EVEN)
var row_number = 10;
// number of lines
var difficulty = 3;

// line dimension an spacing
var line_width = 0.1;
var line_height = 0.02;
var line_gap = 0.05;

// instantiate a global state controller object (theres probably a better way to do it)
 var stateContr = new SelectedStateController();
// array for the line objects
 var middle_lines = [];

function setup() {

   // Create the canvas
  createCanvas(400, 200);

  // stop from looping thru draw()
  noLoop();
  
  // Set colors for the lines
  fill(204, 101, 192, 127);

  initializeBoard(difficulty);
  
}

function draw() {
  // draw the background color
  background(50, 89, 100);
  // draw the center line
  strokeWeight(2);
  stroke('black');
  line(0, height*0.5, width, height*0.5);
  // update the display based on the internal state of the objects 
  refreshMiddleLinesDisplay();
}

// MiddleLine class
function MiddleLine ( _board_position, _id ) {
  // TODO use map instead of id
  this.id = _id;
  this.vertical_position = _board_position
  this.is_selected = false;

  // width and height are P5 canvas globals
  this.width = width * line_width;
  this.height = height * line_height;

}

MiddleLine.prototype.display = function () {
  // choose the color based on selected status
  if ( this.is_selected == true ) {
    // purple
    strokeWeight(4);
    stroke(179, 56, 155);
  } else {
    // orange
    strokeWeight(2);
    stroke(179, 107, 56);
  }

  // voodoo: width - ( gap(i+1) + bar(i) )
  var x_val = ( ( width*line_gap )*( this.id+1 ) + ( width*line_width )*( this.id ) )
  // voodoo: start in the middle then move in increments of the row gap times the position
  var y_val = ( height*0.5 ) - ( ( height/row_number ) * this.vertical_position );

  // By default, the first two parameters to rect() are the 
  // coordinates of the upper-left corner and the second pair
  // is the width and height
  rect( x_val, y_val, this.width, this.height);
}

MiddleLine.prototype.moveUp = function () {
  this.moveNeighbors( abs(this.vertical_position) );
  this.vertical_position++;
}

MiddleLine.prototype.moveDown = function () {
  this.moveNeighbors( abs(this.vertical_position)*(-1) );
  this.vertical_position--;
}

MiddleLine.prototype.moveNeighbors = function ( amount ) {
  var left_dude = (this.id) - 1;
  var right_dude = (this.id) + 1;
  // only move lines that exist
  if ( !(left_dude < 0 ) ) {
    middle_lines[left_dude].vertical_position += amount;
  }
  if ( right_dude < middle_lines.length ) {
    middle_lines[right_dude].vertical_position += amount;
  }
}

function SelectedStateController () {
  this.selected_middle_line_id = 0;

  this.moveLeftOrRight = function ( leftOrRight ) {
    // deselect the previous line then change to the next
    middle_lines[this.selected_middle_line_id].is_selected = false;
    var next = this.selected_middle_line_id + leftOrRight;
    // wrap the selected line around or inc/dec
    if ( next < 0 ) {
      middle_lines[middle_lines.length - 1].is_selected = true;
      this.selected_middle_line_id = middle_lines.length - 1;
    } else if ( next == middle_lines.length ) {
      middle_lines[0].is_selected = true;
      this.selected_middle_line_id = 0;
    } else {
      middle_lines[next].is_selected = true;
      this.selected_middle_line_id = next;
    }
  };

}

function refreshMiddleLinesDisplay () {
  // loop thru and draw all the lines
  for (i=0; i<middle_lines.length; i++) {
    middle_lines[i].display();
  }
}

function initializeBoard( difficulty_value ) {
  // create the lines
  for (i=0; i<difficulty_value; i++) {
    middle_lines.push( new MiddleLine( 0, i ));
  }
  // choose start
  middle_lines[0].is_selected = true;
  // randomize the board state
  // TODO make randomize function
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    stateContr.moveLeftOrRight(-1);
  } else if (keyCode === RIGHT_ARROW) {
    stateContr.moveLeftOrRight(1);
  } else if (keyCode === UP_ARROW) {
    middle_lines[ stateContr.selected_middle_line_id ].moveUp();
  } else if (keyCode === DOWN_ARROW) {
    middle_lines[ stateContr.selected_middle_line_id ].moveDown();
  }
  // refresh display after any changes
  redraw();
}

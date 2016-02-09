carousels = document.getElementsByClassName('carousel');

// Gallery representing a group of images
// this.state = -1 when Gallery is off, (+) when Gallery is on.
var Gallery = function(className) {
  this.className = className;
  this.images = document.getElementsByClassName(className);
  this.state = -1;
}

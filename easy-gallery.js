// carousels = document.getElementsByClassName('carousel');

// Gallery representing a group of images
// this.state = -1 when Gallery is off, (+) when Gallery is on.
var Gallery = function(className) {
  this.className = className;
  this.images = document.getElementsByClassName(className);
  this.state = -1;

  // this.onclick = this.toggleOn()
  for (var i = 0, img; img = this.images[i]; i++) {
    var gallery = this;
    img.onclick = (function(initialState) {
      return function() { gallery.toggleOn(initialState); }
    }(i));
  }
}

Gallery.prototype.toggleOn = function(state) {
  this.state = state;
  this.createSelf();
};

Gallery.prototype.createSelf = function() {
  var element = document.createElement('div');
  element.style.position = "fixed";
  element.style.left = "0";
  element.style.top = "0";
  element.style.width = "100%";
  element.style.height = "100%";
  element.style.background = "rgba(0,0,0,0.5)";
  element.style.textAlign = "center";
  document.body.appendChild(element);
  var imgSource = this.images[this.state].src;
  var img = document.createElement('img');
  img.src = imgSource;
  img.style.height = "100%";
  element.appendChild(img);
}

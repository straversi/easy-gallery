// Gallery representing a group of images
// this.state = -1 when Gallery is off, (+) when Gallery is on.
var Gallery = function(className) {
  this.className = className;
  this.images = document.getElementsByClassName(className);
  this.state = -1;
  this.galleryElement = false;

  // this.onclick = this.toggleOn()
  for (var i = 0, img; img = this.images[i]; i++) {
    var gallery = this;
    img.onclick = (function(initialState) {
      return function() { gallery.toggleOn(initialState); }
    }(i));
  }

  window.addEventListener("keypress", function(e) {
    // escape
    if (e.keyCode == 27) {
      gallery.toggleOff();
    }
  });
}

Gallery.prototype.toggleOn = function(state) {
  this.state = state;
  if (!this.galleryElement) {
    this.createSelf();
  } else {
    this.getImageAndShow();
  }
};

Gallery.prototype.toggleOff = function() {
  this.state = -1;
  this.hideSelf();
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
  this.galleryElement = element;
  var imgSource = this.images[this.state].src;
  var img = document.createElement('img');
  img.src = imgSource;
  if (useFullHeight(img)) {
    img.style.height = "100%";
    img.style.width = "auto";
  } else {
    img.style.width = "100%";
    img.style.height = "auto";
  }
  element.appendChild(img);
}

Gallery.prototype.showSelf = function() {
  this.galleryElement.style.display = "block";
}

Gallery.prototype.hideSelf = function() {
  this.galleryElement.style.display = "none";
}

Gallery.prototype.getImageAndShow = function() {
  img = this.galleryElement.getElementsByTagName('img')[0];
  var imgSource = this.images[this.state].src;
  img.src = imgSource;
  if (useFullHeight(img)) {
    img.style.height = "100%";
    img.style.width = "auto";
  } else {
    img.style.width = "100%";
    img.style.height = "auto";
  }
  this.showSelf();
}

function useFullHeight(img) {
  imgW = img.width;
  imgH = img.height;
  windowW = window.innerWidth;
  windowH = window.innerHeight;
  return (imgW / imgH < windowW / windowH);
}

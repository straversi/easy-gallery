// Gallery representing a group of images
// this.state = -1 when Gallery is off, (+) when Gallery is on.
var Gallery = function(className) {
  this.className = className;
  this.images = document.getElementsByClassName(className);
  this.size = this.images.length;
  this.state = -1;
  this.galleryElement = false;
  this.img = 0;
  this.buttonSize = 30;

  // this.onclick = this.toggleOn()
  for (var i = 0, img; img = this.images[i]; i++) {
    var gallery = this;
    img.onclick = (function(initialState) {
      return function() { gallery.toggleOn(initialState); }
    }(i));
  }

  window.addEventListener("keydown", function(e) {
    switch (e.keyCode) {
      case 27: // escape
        gallery.toggleOff();
        break;
      case 37: // left arrow
        gallery.cycle(-1);
        break;
      case 39: // right arrow
        gallery.cycle(1);
        break;
    }
  });

  ;(function() {
      var throttle = function(type, name, obj) {
          obj = obj || window;
          var running = false;
          var func = function() {
              if (running) { return; }
              running = true;
               requestAnimationFrame(function() {
                  obj.dispatchEvent(new CustomEvent(name));
                  running = false;
              });
          };
          obj.addEventListener(type, func);
      };

      /* init - you can init any event */
      throttle("resize", "optimizedResize");
  })();
  var gallery = this;
  window.addEventListener("optimizedResize", function() {
    resizeImage(gallery.img);
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

Gallery.prototype.cycle = function(n) {
  // takes care of negative % problem
  this.state = ((this.state + this.size) + n) % this.size
  this.getImageAndShow();
};

Gallery.prototype.createSelf = function() {
  var element = document.createElement('div');
  element.style.position = "fixed";
  element.style.left = "0";
  element.style.top = "0";
  element.style.width = "100%";
  element.style.height = "100%";
  element.style.background = "rgba(0,0,0,0.7)";
  element.style.textAlign = "center";
  document.body.appendChild(element);
  this.galleryElement = element;
  var imgSource = this.images[this.state].src;
  var img = createImage(imgSource);
  img.style.position = "relative";
  img.style.objectFit = "contain";
  resizeImage(img);
  element.appendChild(img);
  this.img = img;
  // Click handling
  var gallery = this; // Use gallery over 'this' in click handlers
  var leftArrow  = createArrow('left', this.buttonSize);
  var rightArrow = createArrow('right', this.buttonSize);
  var x          = createX(this.buttonSize);
  x.onclick          = (function(gallery) { return function() {gallery.toggleOff();} }(gallery));
  leftArrow.onclick  = (function(gallery) { return function() {gallery.cycle(-1);} }(gallery));
  rightArrow.onclick = (function(gallery) { return function() {gallery.cycle(1);} }(gallery));
  element.appendChild(leftArrow);
  element.appendChild(rightArrow);
  element.appendChild(x);
}

function createImage(source) {
  var img = document.createElement('img');
  img.src = source;
  img.id = "1";
  return img;
}

// Create an arrow element with DIRECTION [left, right]
function createArrow(direction, size) {
  var arrow = document.createElement('img');
  arrow.style.width = size + "px";
  arrow.style.position = "absolute";
  arrow.style.transform = "translateY(-50%)";
  arrow.style.top = "50%";
  arrow.style[direction] = 0;
  arrow.src = "svg/" + direction + "-arrow.svg"
  return arrow;
}
function createX(size) {
  var x = document.createElement('img');
  x.style.width = size + "px";
  x.style.position = "absolute";
  x.style.top = "0";
  x.style.left = "0";
  x.style.transform = "translate(12.5%, 12.5%)";
  x.src = "svg/x.svg";
  return x;
}

function resizeImage(img) {
  // width and heights are backups for img.objectFit = 'contain'.
  if (useFullHeight(img)) {
    img.style.height = "100%";
    img.style.width = "";
    img.style.transform = "";
    img.style.top = "";
    // img.style.left = "";
  } else {
    img.style.width = "100%";
    img.style.height = "";
    img.style.transform = "translateY(-50%)";
    img.style.top = "50%";
    // img.style.left = "0";
  }
}

Gallery.prototype.showSelf = function() {
  this.galleryElement.style.display = "block";
}

Gallery.prototype.hideSelf = function() {
  this.galleryElement.style.display = "none";
}

Gallery.prototype.getImageAndShow = function() {
  // img = this.galleryElement.getElementsByTagName('img')[0];
  var img = this.img;
  var imgSource = this.images[this.state].src;
  img.src = imgSource;
  resizeImage(img);
  if (this.galleryElement.style.display != "block") {
    this.showSelf();
  }
}

function useFullHeight(img) {
  var imgW = img.width;
  var imgH = img.height;
  var windowW = window.innerWidth;
  var windowH = window.innerHeight;
  return (imgW / imgH < windowW / windowH);
}

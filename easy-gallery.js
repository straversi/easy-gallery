// Gallery representing a group of images
// this.state = -1 when Gallery is off, (+) when Gallery is on.
var Gallery = function(className, imgurThumbnailFormat) {
  this.className = className;
  this.images = document.getElementsByClassName(className);
  this.size = this.images.length;
  this.state = -1;
  this.galleryElement = false;
  this.imgElement = 0;
  this.buttonSize = 30;
  this.imgurThumbnailFormat = imgurThumbnailFormat;
  this.padding = "20px";

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
  element.style.right = "0";
  element.style.bottom = "0";
  element.style.padding = this.padding;
  element.style.background = "rgba(0,0,0,0.7)";
  element.style.textAlign = "center";
  document.body.appendChild(element);
  this.galleryElement = element;

  var imageContainer = document.createElement('div');
  imageContainer.style.width = "100%";
  imageContainer.style.height = "100%";
  element.appendChild(imageContainer);

  this.imgElement = createImageElement();
  imageContainer.appendChild(this.imgElement);
  // Resize handling
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
    resizeImage(gallery.imgElement);
  });
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
  this.getImageAndShow();
}

function createImageElement() {
  var img = document.createElement('img');
  img.style.position = "relative";
  img.style.objectFit = "contain";
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
  } else {
    img.style.width = "100%";
    img.style.height = "";
    img.style.transform = "translateY(-50%)";
    img.style.top = "50%";
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
  var img = this.imgElement;
  img.onload = function() {
    resizeImage(img);
  }
  var thumbnailSource = this.images[this.state].src;
  if (this.imgurThumbnailFormat) {
    var re = /^(.+)b\.(jpg|png)$/;
    var result = thumbnailSource.match(re);
    var fullSizeSource = result[1] + "." + result[2]; // removes the "b" for thumbnail
    img.src = fullSizeSource;
  } else {
    img.src = thumbnailSource;
  }
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

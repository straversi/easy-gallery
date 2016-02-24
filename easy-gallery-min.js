function createImageElement(){var e=document.createElement("img");return e.style.position="relative",e.style.objectFit="contain",e}function createArrow(e,t){var i=document.createElement("img");return i.style.width=t+"px",i.style.position="absolute",i.style.transform="translateY(-50%)",i.style.top="50%",i.style[e]=0,i.src="svg/"+e+"-arrow.svg",i}function createX(e){var t=document.createElement("img");return t.style.width=e+"px",t.style.position="absolute",t.style.top="0",t.style.left="0",t.style.transform="translate(12.5%, 12.5%)",t.src="svg/x.svg",t}function resizeImage(e){useFullHeight(e)?(e.style.height="100%",e.style.width="",e.style.transform="",e.style.top=""):(e.style.width="100%",e.style.height="",e.style.transform="translateY(-50%)",e.style.top="50%")}function useFullHeight(e){var t=e.width,i=e.height,l=window.innerWidth,a=window.innerHeight;return l/a>t/i}var Gallery=function(e,t){this.className=e,this.images=document.getElementsByClassName(e),this.size=this.images.length,this.state=-1,this.galleryElement=!1,this.imgElement=0,this.buttonSize=30,this.imgurThumbnailFormat=t,this.padding="20px",this.smallWidth="500px";for(var i,l=0;i=this.images[l];l++){var a=this;i.onclick=function(e){return function(){a.toggleOn(e)}}(l)}window.addEventListener("keydown",function(e){switch(e.keyCode){case 27:a.toggleOff();break;case 37:a.cycle(-1);break;case 39:a.cycle(1)}})};Gallery.prototype.toggleOn=function(e){this.state=e,this.galleryElement?this.getImageAndShow():this.createSelf()},Gallery.prototype.toggleOff=function(){this.state=-1,this.hideSelf()},Gallery.prototype.cycle=function(e){this.state=(this.state+this.size+e)%this.size,this.getImageAndShow()},Gallery.prototype.createSelf=function(){var e=document.createElement("div");e.className+="easy-gallery",e.id="gallery-main",e.style.position="fixed",e.style.left="0",e.style.top="0",e.style.right="0",e.style.bottom="0",e.style.padding=this.padding,document.querySelector("style").textContent+="@media screen and (max-width:"+this.smallWidth+") { .easy-gallery { padding: 0 !important; }}",e.style.background="rgba(0,0,0,0.9)",e.style.textAlign="center",document.body.appendChild(e),this.galleryElement=e;var t=document.createElement("div");t.id="gallery-image-container",t.style.width="100%",t.style.height="100%",e.appendChild(t),this.imgElement=createImageElement(),this.imgElement.id="gallery-image-main",t.appendChild(this.imgElement),function(){var e=function(e,t,i){i=i||window;var l=!1,a=function(){l||(l=!0,requestAnimationFrame(function(){i.dispatchEvent(new CustomEvent(t)),l=!1}))};i.addEventListener(e,a)};e("resize","optimizedResize")}();var i=this;window.addEventListener("optimizedResize",function(){resizeImage(i.imgElement)});var i=this,l=createArrow("left",this.buttonSize),a=createArrow("right",this.buttonSize),n=createX(this.buttonSize);l.id="gallery-left-arrow",a.id="gallery-right-arrow",n.id="gallery-x",e.onclick=function(e){e=e||event;var t=e.target||e.srcElement;switch(t.id){case"gallery-main":case"gallery-image-container":case"gallery-x":i.toggleOff();break;case"gallery-left-arrow":i.cycle(-1);break;case"gallery-right-arrow":i.cycle(1);break;case"gallery-image-main":window.open(t.src)}},e.appendChild(l),e.appendChild(a),e.appendChild(n),this.getImageAndShow()},Gallery.prototype.showSelf=function(){this.galleryElement.style.display="block"},Gallery.prototype.hideSelf=function(){this.galleryElement.style.display="none"},Gallery.prototype.getImageAndShow=function(){var e=this.imgElement;e.onload=function(){resizeImage(e)};var t=this.images[this.state].src;if(this.imgurThumbnailFormat){var i=/^(.+)b\.(jpg|png)$/,l=t.match(i),a=l[1]+"."+l[2];e.src=a}else e.src=t;"block"!=this.galleryElement.style.display&&this.showSelf()};
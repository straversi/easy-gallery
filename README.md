# easy-gallery
A compact javascript library for creating an image gallery.

Size: 4.2KB

The aim is extreme simplicity. To have a working gallery, include the script `easy-gallery-min.js`, give each image you want in a gallery a custom class, and include a single line of javascript to set everything up. That's it. It's not big, ugly, or in your way.

Compare this to PhotoSwipe, which is 54.0KB minified, and requires the developer to include ~20 lines of HTML and ~10 lines of JS to initialize a gallery.

## Usage

The parameter `true` in the constructor specifies that I'm taking advantage of Imgur's url sizing format.

Imgur's styling format means that in my markup, I include a `b` at the end of each image URL. Imgur serves a thumbnail. Easy-gallery will include remove the `b` when an image is expanded, loading the full size image.

The final parameter is the asset path of the svg files.
```javascript
var firstGallery = new Gallery("image-group-1", true, "./svg/");
```
```html
<img class='image-group-1' src='http://i.imgur.com/3gBHbzEb.png' />
<img class='image-group-1' src='http://i.imgur.com/PvHMW7fb.png' />
<img class='image-group-1' src='http://i.imgur.com/Lwxrv1db.png' />
<img class='image-group-1' src='http://i.imgur.com/Y8ufw56b.png'
  data-caption='A caption example' />
```

## Development

- [x] Capture all images
- [x] Images should expand on click
- [x] Images should collapse on "esc"
- [x] Images should not clip off window and should preserve aspect ratio
  - [x] Should maintain across window resizes
- [x] Images should be vertically centered
  - [x] Should maintain across window resizes
- [x] Gallery should maintain padding between edges and images
  - [x] But should remove padding on smaller window sizes
- [x] Gallery should cycle left/right on ←/→
- [x] Gallery should cycle to beginning from end, and vice versa
- [x] Gallery should collapse on press of "X" icon or click outside of image box
- [x] Gallery should move left/right on tap of hit boxes
- [x] Display comments
- [x] Images outside of full-screen mode should be thumbnails
  - [x] Imgur API
  - [ ] Smooth loading
- [x] README documentation
- [x] Optimized for mobile

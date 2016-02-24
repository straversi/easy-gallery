# easy-gallery
A compact javascript library for creating an image gallery.

Size: 3.7KB

## Usage

The parameter `true` in the constructor specifies that I'm taking advantage of Imgur's url sizing format.

Imgur's styling format means that in my markup, I include a `b` at the end of each image URL. Imgur serves a thumbnail. Easy-gallery will include remove the `b` when an image is expanded, loading the full size image.
```javascript
var firstGallery = new Gallery("image-group-1", true);
```
```html
<img class='image-group-1' src='http://i.imgur.com/3gBHbzEb.png'>
<img class='image-group-1' src='http://i.imgur.com/PvHMW7fb.png'>
<img class='image-group-1' src='http://i.imgur.com/Lwxrv1db.png'>
<img class='image-group-1' src='http://i.imgur.com/Y8ufw56b.png'>
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
- [ ] Display comments
- [x] Images outside of full-screen mode should be thumbnails
  - [x] Imgur API
- [x] README documentation

# easy-gallery
A compact javascript library for creating an image gallery.

- [x] Capture all images
- [x] Images should expand on click
- [x] Images should collapse on "esc"
- [x] Images should not clip off window and should preserve aspect ratio
  - [x] Should maintain across window resizes
- [x] Images should be vertically centered
  - [x] Should maintain across window resizes
- [x] Gallery should cycle left/right on ←/→
- [x] Gallery should cycle to beginning from end, and vice versa
- [x] Gallery should collapse on press of "X" icon
- [x] Gallery should move left/right on tap of hit boxes
- [ ] Display comments
- [x] Images outside of full-screen mode should be thumbnails
  - [x] Imgur API

## Usage

Creating a gallery

```javascript
var firstGallery = new Gallery("image-group-1");
```

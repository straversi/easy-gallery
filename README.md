# easy-gallery
A compact javascript library for creating an image gallery.

- [x] Capture all images
- [x] Images should expand on click
- [x] Images should collapse on "esc"
- [x] Images should not clip off window and should preserve aspect ratio
  - [ ] Should maintain across window resizes
- [ ] Images should be vertically centered
- [ ] Gallery should cycle left/right on ←/→
- [ ] Gallery should cycle to beginning from end, and vice versa
- [ ] Gallery should collapse on press of "X" icon
- [ ] Gallery should move left/right on tap of hit boxes
- [ ] Display comments
- [ ] Images outside of full-screen mode should be thumbnails
  - [ ] Imgur API

## Usage

Creating a gallery

```javascript
var firstGallery = new Gallery("image-group-1");
```

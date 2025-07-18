# Youtube Facade

A lightweight, accessible YouTube embed solution inspired by Paul Irish's [Lite YouTube Embed](https://github.com/paulirish/lite-youtube-embed). This package provides a simple way to embed YouTube videos with minimal JavaScript, optional modal playback, and improved performance.

[Live Demo](https://mikeh74.github.io/youtube-facade/demo)

**Features:**
- No custom elements required
- Optional modal playback via data attribute
- Responsive and accessible design
- Easy integration with or without a bundler

---

## Installation

**Option 1: Static files**
Copy the `dist` folder to your project and reference the CSS and JS files:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" href="/path/to/dist/youtube-facade.css">
</head>
<body>
  <!-- Your YouTube links here -->
  <script src="/path/to/dist/youtube-facade.js"></script>
  <script>
    youtubeFacade();
  </script>
</body>
</html>
```

**Option 2: Bundler (npm)**
Install via npm and import in your code:

```bash
npm install youtube-facade
```

```javascript
import youtubeFacade from 'youtube-facade';

youtubeFacade();
```

---

## Basic Usage

Add a link to YouTube with an image and the class `youtube-facade`. The script will automatically enhance it:

```html
<a href="https://www.youtube.com/watch?v=uIlwoXYcods"
   aria-label="Play embedded YouTube video"
   class="youtube-facade"
   data-title="Youtube Facade - First one"
   target="_blank" rel="noopener noreferrer">
  <img src="https://i.ytimg.com/vi/uIlwoXYcods/maxresdefault.jpg"
       class="youtube-facade-img" alt="Click to play embedded YouTube video">
  <div class="youtube-facade-playbtn"></div>
</a>
```

---

## Modal Playback

To play the YouTube video in a modal, add the `data-youtube-modal` attribute (no value needed):

```html
<a href="https://www.youtube.com/watch?v=uIlwoXYcods"
   aria-label="Play embedded YouTube video"
   class="youtube-facade"
   data-title="Youtube Facade - First one"
   target="_blank" rel="noopener noreferrer"
   data-youtube-modal>
  <img src="https://i.ytimg.com/vi/uIlwoXYcods/maxresdefault.jpg"
       class="youtube-facade-img" alt="Click to play embedded YouTube video">
  <div class="youtube-facade-playbtn"></div>
</a>
```

---

## API Reference

```javascript
youtubeFacade({
  selector: '.youtube-facade', // CSS selector for YouTube links
  muteForAutoplay: true       // Mute video for autoplay on mobile (default: true)
});
```

- `selector`: CSS selector for YouTube links (default: `.youtube-facade`)
- `muteForAutoplay`: Mute video for autoplay on mobile devices (default: `true`)

---

## Accessibility
- Keyboard and screen reader friendly
- Uses ARIA labels and visible focus states
- Modal and close button are accessible

---

## Troubleshooting
- Ensure your YouTube links use the correct format (`https://www.youtube.com/watch?v=VIDEO_ID`)
- If the modal does not appear, check that the `data-youtube-modal` attribute is present
- For bundler usage, ensure you import both JS and CSS

---

## Credits
Inspired by [Lite YouTube Embed](https://github.com/paulirish/lite-youtube-embed) by Paul Irish.

---

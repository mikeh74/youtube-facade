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
npm install git+https://github.com/mikeh74/youtube-facade.git#<commit-or-tag>
```

Replace `<commit-or-tag>` with the desired commit hash, branch name, or git tag.  
For example, to install a specific tag:

```bash
npm install git+https://github.com/mikeh74/youtube-facade.git#v1.1.0
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

## Targeting a Specific Element

You can use the `data-target` attribute to specify a different element to receive the YouTube embed when the facade is activated. This is useful for advanced layouts or when you want the video to appear elsewhere in the DOM.

**Example:**

```html
<!-- Facade link -->
<a href="https://www.youtube.com/watch?v=uIlwoXYcods"
   class="youtube-facade"
   data-target="#video-container">
  <img src="https://i.ytimg.com/vi/uIlwoXYcods/maxresdefault.jpg" alt="Click to play embedded YouTube video">
  <div class="youtube-facade-playbtn"></div>
</a>

<!-- Target container -->
<div id="video-container"></div>
```

When the facade is clicked, the YouTube embed will be placed inside the element with the selector specified by `data-target`. If the target element is not found, the embed will appear in place of the facade link as usual.


## Data Attributes

YouTube Facade supports several `data-` attributes to control its behavior directly in your HTML:


| Attribute                | Description                                                                                 | Example Value         |
|--------------------------|---------------------------------------------------------------------------------------------|----------------------|
| `data-youtube-modal`     | Opens the video in a modal overlay. No value needed.                                        | (present/empty)      |
| `data-target`            | CSS selector for a target element where the video should be embedded.                       | `#video-container`   |
| `data-use-youtube-api`   | Forces use of the YouTube Iframe API (enables JS API features, e.g., autoplay, events). If set to "false", always uses a plain iframe. | (present/empty) or "false" |
| `data-title`             | Sets the accessible label/title for the video.                                              | "My Video Title"    |
| `data-mute-for-mobile`   | Mutes the video for autoplay on mobile devices (overrides global option if present).        | (present/empty)      |

**Example:**

```html
<a href="https://www.youtube.com/watch?v=VIDEO_ID"
   class="youtube-facade"
   data-youtube-modal
   data-target="#video-container"
   data-use-youtube-api
   data-title="My Video Title"
   data-mute-for-mobile>
  <img src="https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg" alt="Click to play embedded YouTube video">
  <div class="youtube-facade-playbtn"></div>
</a>
<div id="video-container"></div>
```

You can combine these attributes as needed to customize the behavior for each video embed.

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

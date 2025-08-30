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

## Custom Modal Template

You can customize the modal template by passing a `customModalTemplate` parameter to the `youtubeFacade` function. This allows you to modify the appearance and structure of the modal while maintaining the required functionality.

**Default Modal Template:**

```html
<div class="youtube-facade-modal-content">
  <button class="youtube-facade-modal-close" aria-label="Close modal">
    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path class="youtube-facade-model-close-svg" fill="#ffffff" d="M 16.830797 20.000301 L 10.000151 13.16957 L 3.169428 20.000301 L -0 16.830883 L 6.830741 10.000151 L -0 3.169418 L 3.169428 0 L 10.000151 6.830732 L 16.830797 0 L 20 3.169418 L 13.16958 10.000151 L 20 16.830883 Z"/>
    </svg>
  </button>
  <div class="youtube-facade-modal-content-inner">
    <div id="youtube-facade-modal-placeholder" class="youtube-facade-modal-inner"></div>
  </div>
</div>
```

**Required Elements:**

For the modal to function correctly, your custom template must include:

1. **Close button** with class `youtube-facade-modal-close` - This element will receive click event listeners for closing the modal
2. **Video placeholder** with ID `youtube-facade-modal-placeholder` - This is where the YouTube video iframe will be inserted
3. **ARIA label** on the close button for accessibility

**Usage Example:**

```javascript
const customTemplate = `
  <div class="my-custom-modal-content">
    <div class="my-header">
      <h2>Custom Video Player</h2>
      <button class="youtube-facade-modal-close" aria-label="Close video">✕</button>
    </div>
    <div class="my-video-container">
      <div id="youtube-facade-modal-placeholder"></div>
    </div>
  </div>
`;

youtubeFacade({
  customModalTemplate: customTemplate
});
```

**Important Notes:**
- The modal template is set globally for all YouTube facades on the page
- Custom CSS styling can be applied to your custom classes
- The close button functionality (click and ESC key) is automatically wired up
- The video placeholder element will be populated with the YouTube iframe when a modal video is activated

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
  selector: '.youtube-facade',        // CSS selector for YouTube links
  muteForAutoplay: true,              // Mute video for autoplay on mobile (default: true)
  customModalTemplate: null           // Custom modal template HTML string (default: null)
});
```

- `selector`: CSS selector for YouTube links (default: `.youtube-facade`)
- `muteForAutoplay`: Mute video for autoplay on mobile devices (default: `true`)
- `customModalTemplate`: Custom HTML template string for the modal (default: `null` - uses built-in template)

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

# Youtube Facade

Youtube Facade script. Inspired by Paul Irish's [ Lite youtube embed](https://github.com/paulirish/lite-youtube-embed), which for most purposes is probably the better
option rather than this package.

Demo version here: https://mikeh74.github.io/youtube-facade/demo

The reason for creating this version was so meet the following specific
requirements:
* youtube iframe can be opened in a modal to focus the users attention rather
than playing in place
* it can fall back to simply playing in youtube is all esle fails

The second one is much less likely to be an issue but relying just on javascript
is breaking the progressive enhancement principle which might still be an issue
in some situations.

## Basic Usage

Add a link to youtube with an image inside and add the class youtube-facade,
load the script and call the default function:

```html
  <a href="https://www.youtube.com/watch?v=uIlwoXYcods"
    aria-label="Play embedded youtube video" class="youtube-facade"
    data-title="Youtube Facade - First one" target="_blank" rel="noopener noreferrer">
    <img src="https://i.ytimg.com/vi/uIlwoXYcods/maxresdefault.jpg" class="youtube-facade-img"
      alt="Click to play embedded youtube video">
    <div class="youtube-facade-playbtn"></div>
  </a>

  <script type="module">
    import youtubeFacade from '../index.js';
    youtubeFacade();
  </script>

```

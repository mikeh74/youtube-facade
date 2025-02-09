# Youtube Facade

The Youtube Facade script is inspired by Paul Irish's
[Lite YouTube Embed](https://github.com/paulirish/lite-youtube-embed),
which is likely a better option for most people rather than this package.

[Demo version](https://mikeh74.github.io/youtube-facade/demo)

This version doesn't use javascript components and has an option to play
the video in a modal using a data attribute.

## Loading the script

This project provides an es6 module which can be included in your project in a number of ways.

If you are not using a javascript bundler, such as webpack, then you will need to copy the source files locally to your project and then load the script as an es6 module:

```html
  <script type="module">
    import youtubeFacade from '/path/to/index.js';
    youtubeFacade();
  </script>
```

If you are using a javascript bundler and you have installed this package via
npm then you can include it liks this:

```javascript
  // This imports the packakge into your code
  import youtubeFacade from 'youtubeFacade';

  // This initialises the package
  youtubeFacade();
```

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

# Modal Version

To play the youtube video in a modal then you just add the following a custom
data attribute *data-youtube-modal=""*, the attribute doesn't require to have
a value set the script is just looking for the attribute:

```html
  <a href="https://www.youtube.com/watch?v=uIlwoXYcods"
    aria-label="Play embedded youtube video" class="youtube-facade"
    data-title="Youtube Facade - First one" target="_blank"
    data-youtube-modal=""
    rel="noopener noreferrer">
    <img src="https://i.ytimg.com/vi/uIlwoXYcods/maxresdefault.jpg"
      class="youtube-facade-img" alt="Click to play embedded youtube video">
    <div class="youtube-facade-playbtn"></div>
  </a>

  <script type="module">
    import youtubeFacade from '../index.js';
    youtubeFacade();
  </script>
```

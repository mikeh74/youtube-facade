# Youtube Facade

The Youtube Facade script is inspired by Paul Irish's
[Lite YouTube Embed](https://github.com/paulirish/lite-youtube-embed),
which is likely a better option for most people rather than this package.

[Demo version](https://mikeh74.github.io/youtube-facade/demo)

This version doesn't use javascript custom elements and has an option to play
the video in a modal using a data attribute.

## Installation

The easiest way to install the package is to copy the dist folder to your
project and then reference the css and js files in your code:

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
...
  <link rel="stylesheet" href="/path/to/dist/youtube-facade.css">
...
</head>
<body>
...

  <script src="../dist/youtube-facade.js"></script>
  <script>
    youtubeFacade();
  </script>
</body>
</html>
```

If you are using a javascript bundler you can install the package by referencing
by installing the package via npm and include it liks this:

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

```

## Modal Version

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
```

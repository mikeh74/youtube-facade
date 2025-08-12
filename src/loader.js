// ------ YouTube Iframe API ------

let isYouTubeIframeAPILoaded = false;
let youTubeIframeAPIPromise = null;

/**
 * Loads the YouTube Iframe API asynchronously and returns the YT object.
 * Adds error handling for script loading and API readiness.
 * @returns {Promise<object>} Resolves with the YT API object.
 */
async function loadYouTubeIframeAPI() {
  if (isYouTubeIframeAPILoaded) {
    let YT = window.YT;
    return Promise.resolve(YT);
  }
  if (youTubeIframeAPIPromise) {
    return youTubeIframeAPIPromise;
  }
  youTubeIframeAPIPromise = new Promise((resolve, reject) => {
    try {
      var tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.onerror = (err) => {
        console.error('YouTube Iframe API script failed to load', err);
        reject(new Error('YouTube Iframe API script failed to load'));
      };
      var firstScriptTag = document.getElementsByTagName('script')[0];
      if (!firstScriptTag || !firstScriptTag.parentNode) {
        console.error('No script tag found in document for YouTube API insertion');
        reject(new Error('No script tag found in document for YouTube API insertion'));
        return;
      }
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = () => {
        let YT = window.YT;
        if (!YT) {
          reject(new Error('YouTube Iframe API did not initialize correctly'));
          return;
        }
        isYouTubeIframeAPILoaded = true;
        resolve(YT);
      };
    }
    catch (err) {
      console.error('Error loading YouTube Iframe API', err);
      reject(err);
    }
  });
  return youTubeIframeAPIPromise;
}

/**
 * Creates a YouTube player instance using the Iframe API.
 * Adds error handling for missing API or element.
 * @param {HTMLElement|string} elementId - The element or its ID to attach the player to.
 * @param {string} videoId - The YouTube video ID.
 * @param {object} playerVars - Player configuration variables.
 * @returns {Promise<object>} Resolves with the YT.Player instance.
 */
async function createYouTubePlayer(elementId, videoId, playerVars, onPlayerReady) {
  if (!elementId) {
    throw new Error('createYouTubePlayer: elementId is required');
  }
  if (!videoId || typeof videoId !== 'string') {
    throw new Error('createYouTubePlayer: videoId is required and must be a string');
  }
  try {
    const YT = await loadYouTubeIframeAPI();
    return new YT.Player(elementId, {
      width: '720',
      height: '405',
      videoId: videoId,
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
      playerVars: playerVars,
      events: {
        onReady: onPlayerReady,
      },
    });
  }
  catch (err) {
    console.error('createYouTubePlayer: Failed to create player', err);
    throw err;
  }
}

export { createYouTubePlayer };

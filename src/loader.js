// ------ YouTube Iframe API ------

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

let isYouTubeIframeAPILoaded = false;
let youTubeIframeAPIPromise = null;

async function loadYouTubeIframeAPI() {
  if (isYouTubeIframeAPILoaded) {
    let YT = window.YT;
    return Promise.resolve(YT);
  }

  if (youTubeIframeAPIPromise) {
    return youTubeIframeAPIPromise;
  }

  youTubeIframeAPIPromise = new Promise((resolve) => {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      let YT = window.YT;
      isYouTubeIframeAPILoaded = true;
      resolve(YT);
    };
  });

  return youTubeIframeAPIPromise;
}

async function createYouTubePlayer(elementId, videoId, playerVars) {
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
};

export { createYouTubePlayer };

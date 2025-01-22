
// const modalContent = documment.getElementById('yf-modal-placeholder');
// console.log(modalContent);

/**
 * 
 * @param {string} url 
 */
const addPreconnect = (url) => {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = url;
  document.head.appendChild(link);
}

const warmConnections = (function() {

  let preconnnectsAdded = false;

  let preconnectUrls = [
    'https://www.youtube-nocookie.com',
    'https://www.google.com'
  ];

  return function() {
    if (preconnnectsAdded) {
      console.log('preconnects already added');
      return;
    }

    preconnectUrls.forEach(url => {
      addPreconnect(url);
    });

    console.log('preconnects added');

    preconnnectsAdded = true;
  }
})();

const els = document.querySelectorAll('.youtube-facade');

console.log(els);

els.forEach(el => {

  el.addEventListener('pointerover', warmConnections, {once: true});
  el.addEventListener('focusin', warmConnections, {once: true});

  el.addEventListener('click', (e) => {
    console.log('clicked');
    e.preventDefault();

    // try to get the video id from the data-youtube-id attribute first
    const videoId = getYoutubeVideoId(el);

    // create an iframe element and replace the current element with it
    const iframe = createYouTubeIframe(videoId);
    console.log(iframe);

    // check if the element has the data-youtube-modal attribute
    const modal = el.getAttribute('data-youtube-modal');

    if (modal) {
      // toggle the modal
      toggleModal();
      const modalContent = document.querySelector('#youtube-facade-modal-placeholder');
      modalContent.appendChild(iframe);
    } else {
      // replace the element with the iframe
      el.replaceWith(iframe);
    }
  });
});

const toggleModal = () => {
  const modal = document.querySelector('.youtube-facade-modal');
  modal.classList.toggle('youtube-facade-modal-active');
}

function createYouTubeIframe(videoId) {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('src', `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`);
  iframe.setAttribute('width', '560');
  iframe.setAttribute('height', '315');
  iframe.setAttribute('class', 'youtube-facade-iframe');
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
  iframe.setAttribute('allowfullscreen', '');
  return iframe;
}

/**
 * Get the youtube video id from the element data-youtube-id attribute
 * or the href attribute if the data-youtube-id attribute is not present
 *
 * @param {HTMLElement} el 
 * @return {string} videoId
 */
function getYoutubeVideoId(el) {

  let videoId = null;

  videoId = el.getAttribute('data-youtube-id');

  if (videoId) {
    console.log(videoId);
    return videoId;
  }

  // parse href of the element and get the video id from the v parameter
  const href = el.getAttribute('href');
  const url = new URL(href);
  videoId = url.searchParams.get('v');

  console.log(videoId);
  return videoId;
}

const closeButtons = document.querySelectorAll('.youtube-facade-modal-close');

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    toggleModal();
    const modalContent = document.querySelector('#youtube-facade-modal-placeholder');
    modalContent.innerHTML = '';
  });
});

// ------ YouTube Iframe API ------

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

let isYouTubeIframeAPILoaded = false;
let youTubeIframeAPIPromise = null;

async function loadYouTubeIframeAPI() {

  if (isYouTubeIframeAPILoaded) {
    return Promise.resolve(YT);
  }

  if (youTubeIframeAPIPromise) {
    return youTubeIframeAPIPromise;
  }

  youTubeIframeAPIPromise = new Promise((resolve) => {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      isYouTubeIframeAPILoaded = true;
      resolve(YT);
    };
  });

  return youTubeIframeAPIPromise;
}

async function createYouTubePlayer(elementId, videoId) {
  const YT = await loadYouTubeIframeAPI();
  return new YT.Player(elementId, {
    height: '390',
    width: '640',
    videoId: videoId,
    playerVars: {
      'playsinline': 1
    },
    events: {
      'onReady': onPlayerReady
    }
  });
}

// Usage example:
// let youtubeEl = document.getElementById('player');
//
// createYouTubePlayer(youtubeEl, 'uIlwoXYcods').then(player => {
//   console.log(player);
// });

// make player available to the global scope
window.onPlayerReady = onPlayerReady;

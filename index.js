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
      return;
    }
    preconnectUrls.forEach(url => {
      addPreconnect(url);
    });
    preconnnectsAdded = true;
  }
})();

function renderYoutubePlayer(el, videoId, playerVars) {

  // check if the element has the data-youtube-modal attribute
  const modal = el.getAttribute('data-youtube-modal');

  let target = el;

  if (modal) {
    const modalPlaceholder = document.getElementById('youtube-facade-modal-placeholder');

    // create a new iframe element to insert into the modal placeholder element
    const newDiv = document.createElement('div');
    newDiv.classList.add('youtube-facade-iframe');
    modalPlaceholder.appendChild(newDiv);
    target = newDiv;
    toggleModal();
  }

  createYouTubePlayer(target, videoId, playerVars).then(player => {
    console.log(player);
    window.myplayer = player;
  });
}

function renderYouTubeIframe(el, videoId, playerVars) {
  const iframe = createYouTubeIframe(videoId, playerVars);

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
}

function createYouTubeIframe(videoId, playerVars) {

  // convert playerVars object to query string
  const playerVarsString = new URLSearchParams(playerVars).toString();

  const iframe = document.createElement('iframe');
  iframe.setAttribute('src', `https://www.youtube-nocookie.com/embed/${videoId}?${playerVarsString}`);
  iframe.setAttribute('width', '720');
  iframe.setAttribute('height', '405');
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
    return videoId;
  }

  // parse href of the element and get the video id from the v parameter
  const href = el.getAttribute('href');

  try {
    const url = new URL(href);
    videoId = url.searchParams.get('v');
  } catch (error) {
    return null;
  }

  return videoId;
}

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

async function createYouTubePlayer(elementId, videoId, playerVars) {
  const YT = await loadYouTubeIframeAPI();
  return new YT.Player(elementId, {
    width: '720',
    height: '405',
    videoId: videoId,
    allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
    playerVars: playerVars,
    events: {
      'onReady': onPlayerReady
    }
  });
}

// function to check viewport width is less than 400px and the user is on a
// mobile device, and the user agent includes 'Intel Mac OS X'
function isMobile() {
  return window.innerWidth < 600 && navigator.userAgent.includes('Mobi');
}

// on DomContentLoaded add modal code to the body
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.createElement('div');
  modal.classList.add('youtube-facade-modal');
  modal.innerHTML = `
      <div class="youtube-facade-modal-content">
        <button class="youtube-facade-modal-close" aria-label="Close modal">
          <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path class="youtube-facade-model-close-svg" fill="#ffffff" d="M 16.830797 20.000301 L 10.000151 13.16957 L 3.169428 20.000301 L -0 16.830883 L 6.830741 10.000151 L -0 3.169418 L 3.169428 0 L 10.000151 6.830732 L 16.830797 0 L 20 3.169418 L 13.16958 10.000151 L 20 16.830883 Z"/>
          </svg>
        </button>
        <div id="youtube-facade-modal-placeholder" class="youtube-facade-modal-inner">
        </div>
      </div>
    `;

  document.body.appendChild(modal);

  // ------ Wire up the close button ------

  const closeButtons = document.querySelectorAll('.youtube-facade-modal-close');

  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      closeModal();
    });
  });

  // ------ Wire up the escape key ------

  // add event listener for ESC key and close the modal if it is open

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
});

const toggleModal = () => {
  const modal = document.querySelector('.youtube-facade-modal');
  modal.classList.toggle('youtube-facade-modal-active');
}

const closeModal = () => {
  const modal = document.querySelector('.youtube-facade-modal');
  modal.classList.remove('youtube-facade-modal-active');
  const modalContent = document.querySelector('#youtube-facade-modal-placeholder');
  modalContent.innerHTML = '';
}

/**
 * Initialize the youtube facade
 *
 * @param {object} options
 * @param {string} options.selector
 * @param {boolean} options.muteForAutoplay
 */
const youtubeFacade = ({
  selector = '.youtube-facade',
  muteForAutoplay = true
} = {}) => {

    const playerVars = {
      'playsinline': 1,
      'autoplay': 1,
      'rel': 0,
    };

    if (muteForAutoplay && isMobile()) {
      playerVars['mute'] = 1;
    };

  const els = document.querySelectorAll(selector);

  els.forEach(el => {
  
    el.addEventListener('pointerover', warmConnections, {once: true});
    el.addEventListener('focusin', warmConnections, {once: true});

    el.addEventListener('click', (e) => {
      e.preventDefault();
      const videoId = getYoutubeVideoId(el);

      // needsYTApi = this.hasAttribute("js-api") || navigator.vendor.includes('Apple') || navigator.userAgent.includes('Mobi');
      const needsYTApi = navigator.vendor.includes('Apple') || navigator.userAgent.includes('Mobi');

      // check if the element has the data-mute-for-mobile attribute and the user is on an iPhone
      if (el.hasAttribute("data-mute-for-mobile") && isMobile()) {
        playerVars['mute'] = 1;
      };

      if (needsYTApi) {
        // create a player using the youtube iframe api
        renderYoutubePlayer(el, videoId, playerVars);
      } else {
        // create an iframe element and replace the current element with it
        renderYouTubeIframe(el, videoId, playerVars);
      }
    });
  });
}

export default youtubeFacade;

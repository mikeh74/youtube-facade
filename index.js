
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

    // at this point decide whether to create an iframe element or to use
    // the youtube iframe api to create a player 

    // let needsYTApi = true;

    // needsYTApi = this.hasAttribute("js-api") || navigator.vendor.includes('Apple') || navigator.userAgent.includes('Mobi');
    const needsYTApi = navigator.vendor.includes('Apple') || navigator.userAgent.includes('Mobi');

    if (needsYTApi) {
      // create a player using the youtube iframe api
      // createYouTubePlayer(el, videoId);
      renderYoutubePlayer(el, videoId);
      return;
    } else {
      // create an iframe element and replace the current element with it
      renderYouTubeIframe(el, videoId);
    }
  });
});

const toggleModal = () => {
  const modal = document.querySelector('.youtube-facade-modal');
  modal.classList.toggle('youtube-facade-modal-active');
}

function renderYoutubePlayer(el, videoId) {

  // check if the element has the data-youtube-modal attribute
  const modal = el.getAttribute('data-youtube-modal');

  let target = el;

  if (modal) {
    const modalPlaceholder = document.getElementById('youtube-facade-modal-placeholder');

    // create a new iframe element to insert into the modal placeholder element
    const newDiv = document.createElement('div');
    newDiv.classList.add('youtube-facade-iframe');
    modalPlaceholder.appendChild(newDiv);
    console.log(newDiv);
    target = newDiv;
    toggleModal();
  }

  createYouTubePlayer(target, videoId).then(player => {
    console.log(player);
    window.myplayer = player;
  });
}

function renderYouTubeIframe(el, videoId) {
  const iframe = createYouTubeIframe(videoId);

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
      'playsinline': 1,
      'autoplay': 1,
      'rel': 0,
    },
    events: {
      'onReady': onPlayerReady
    }
  });
}


// Example usage
// const ytBtn = document.querySelector('.yt-target-btn');

// ytBtn.addEventListener('click', () => {
//   ytEl = document.querySelector('.yt-target');
//   createYouTubePlayer(ytEl, 'uIlwoXYcods').then(player => {
//     window.myplayer = player;
//   });
// });

// ------ YouTube Iframe API ------

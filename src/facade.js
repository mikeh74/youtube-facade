import {
  getYoutubeVideoId,
  isMobile,
  warmConnections,
  delegateEvent,
  getTargetElement,
} from './utils';
import { createYouTubePlayer } from './loader';

/**
 * Renders a YouTube player using the YouTube iframe API.
 * @param {HTMLElement} el - The element to attach the player to.
 * @param {string} videoId - The YouTube video ID.
 * @param {object} playerVars - Player configuration variables.
 */
function renderYoutubePlayer(el, videoId, playerVars) {
  if (!el || !(el instanceof HTMLElement)) {
    console.error('renderYoutubePlayer: Invalid element');
    return;
  }
  const modal = el.getAttribute('data-youtube-modal');
  let target = getTargetElement(el);
  if (!target) {
    console.error('No matching target for element', el);
    return;
  }
  if (modal) {
    const modalPlaceholder = document.getElementById('youtube-facade-modal-placeholder');
    if (!modalPlaceholder) {
      console.error('renderYoutubePlayer: Modal placeholder not found');
      return;
    }
    const newDiv = document.createElement('div');
    newDiv.classList.add('youtube-facade-iframe');
    modalPlaceholder.appendChild(newDiv);
    target = newDiv;
    toggleModal();
  }
  createYouTubePlayer(target, videoId, playerVars)
    .then((player) => {
      window.yfplayer = player;

      // add the active class
      if (el !== target && !modal) {
        el.classList.add('youtube-facade-active');
        el.tabIndex = '-1';
      }
    })
    .catch((err) => {
      console.error('renderYoutubePlayer: Failed to create YouTube player', err);
    });
}

/**
 * Renders a YouTube iframe element (no API).
 * @param {HTMLElement} el - The element to replace or attach the iframe to.
 * @param {string} videoId - The YouTube video ID.
 * @param {object} playerVars - Player configuration variables.
 */
function renderYouTubeIframe(el, videoId, playerVars) {
  if (!el || !(el instanceof HTMLElement)) {
    console.error('renderYouTubeIframe: Invalid element');
    return;
  }
  const iframe = createYouTubeIframe(videoId, playerVars);
  const modal = el.getAttribute('data-youtube-modal');
  if (modal) {
    toggleModal();
    const modalContent = document.querySelector('#youtube-facade-modal-placeholder');
    if (!modalContent) {
      console.error('renderYouTubeIframe: Modal content not found');
      return;
    }
    modalContent.appendChild(iframe);
  }
  else {
    let target = getTargetElement(el);
    // if we have no available target then exit
    if (!target) {
      return;
    }
    target.replaceWith(iframe);

    // add the active class
    if (el !== target) {
      el.classList.add('youtube-facade-active');
      el.tabIndex = '-1';
    }
  }
}

/**
 * Creates a YouTube iframe element.
 * @param {string} videoId - The YouTube video ID.
 * @param {object} playerVars - Player configuration variables.
 * @returns {HTMLIFrameElement} The created iframe element.
 */
function createYouTubeIframe(videoId, playerVars) {
  if (!videoId || typeof videoId !== 'string') {
    console.error('createYouTubeIframe: Invalid videoId');
    return null;
  }
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

// Closure for holding the modal template, allowing override
const modalTemplate = (() => {
  let template = `
      <div class="youtube-facade-modal-content">
        <button class="youtube-facade-modal-close" aria-label="Close modal">
          <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path class="youtube-facade-model-close-svg" fill="#ffffff" d="M 16.830797 20.000301 L 10.000151 13.16957 L 3.169428 20.000301 L -0 16.830883 L 6.830741 10.000151 L -0 3.169418 L 3.169428 0 L 10.000151 6.830732 L 16.830797 0 L 20 3.169418 L 13.16958 10.000151 L 20 16.830883 Z"/>
          </svg>
        </button>
        <div class="youtube-facade-modal-content-inner">
          <div id="youtube-facade-modal-placeholder"
            class="youtube-facade-modal-inner"></div>
        </div>
      </div>
    `;
  return {
    get: () => template,
    set: (newTemplate) => {
      if (typeof newTemplate === 'string') {
        template = newTemplate;
      }
    },
  };
})();

// Usage: modalTemplate.get() to retrieve, modalTemplate.set(newValue) to override

const setup = () => {
  const modal = document.createElement('div');
  modal.classList.add('youtube-facade-modal');
  modal.innerHTML = modalTemplate.get();
  document.body.appendChild(modal);

  // ------ Wire up the close button ------
  const closeButtons = document.querySelectorAll('.youtube-facade-modal-close');
  closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      closeModal();
    });
  });

  // ------ Wire up the escape key ------
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      closeModal();
    }
  });
};

const toggleModal = () => {
  const modal = document.querySelector('.youtube-facade-modal');
  if (!modal) {
    console.error('toggleModal: Modal not found');
    return;
  }
  modal.classList.toggle('youtube-facade-modal-active');
  if (modal.classList.contains('youtube-facade-modal-active')) {
    document.body.classList.add('youtube-facade-body-no-scroll');
  }
  else {
    document.body.classList.remove('youtube-facade-body-no-scroll');
  }
};

/**
 * Closes the modal and clears its content.
 */
const closeModal = () => {
  requestAnimationFrame(() => {
    const modal = document.querySelector('.youtube-facade-modal');
    const modalContent = document.querySelector('#youtube-facade-modal-placeholder');
    if (modalContent) {
      modalContent.innerHTML = '';
    }
    if (modal) {
      modal.classList.remove('youtube-facade-modal-active');
    }
    document.body.classList.remove('youtube-facade-body-no-scroll');
  });
};

/**
 * Initializes the YouTube facade component and event delegation.
 * @param {object} options - Configuration options.
 * @param {string} options.selector - CSS selector for YouTube elements.
 * @param {boolean} options.muteForAutoplay - Whether to mute for autoplay on mobile.
 * @param {string|null} options.customModalTemplate - Custom modal template HTML string.
 */
const youtubeFacade = ({
  selector = '.youtube-facade',
  muteForAutoplay = true,
  customModalTemplate = null,
} = {}) => {
  // Set the modal template if provided
  if (customModalTemplate && typeof customModalTemplate === 'string') {
    modalTemplate.set(customModalTemplate);
  }

  setup(); // Ensure modal is set up

  const playerVars = {
    playsinline: 1,
    autoplay: 1,
    rel: 0,
  };

  if (muteForAutoplay && isMobile()) {
    playerVars['mute'] = 1;
  }
  delegateEvent(document, 'click', selector, (event) => {
    event.preventDefault();
    const el = event.target.closest(selector);
    if (!el) {
      console.error('youtubeFacade: Clicked element not found for selector', selector);
      return;
    }
    handleVideoClick(el, playerVars);
  });
  delegateEvent(document, 'focusin', selector, warmConnections, { once: true });
  // Couldn't use event delegation for this one
  const els = document.querySelectorAll(selector);
  els.forEach((el) => {
    el.addEventListener('pointerover', warmConnections, { once: true });
  });
};

/**
 * Handles click events for YouTube elements, choosing API or iframe.
 * @param {HTMLElement} el - The clicked element.
 * @param {object} playerVars - Player configuration variables.
 */
function handleVideoClick(el, playerVars) {
  if (!el || !(el instanceof HTMLElement)) {
    console.error('handleVideoClick: Invalid element');
    return;
  }
  const videoId = getYoutubeVideoId(el);
  if (!videoId) {
    console.error('handleVideoClick: No videoId found');
    return;
  }
  const needsYTApi = el.hasAttribute('data-use-youtube-api') || navigator.vendor.includes('Apple') || navigator.userAgent.includes('Mobi');
  if (el.hasAttribute('data-mute-for-mobile') && isMobile()) {
    playerVars['mute'] = 1;
  }
  if (needsYTApi) {
    renderYoutubePlayer(el, videoId, playerVars);
  }
  else {
    renderYouTubeIframe(el, videoId, playerVars);
  }
  // Trigger custom event
  dispatchFacadeActivated(el, videoId);
}

/**
 * Dispatches a custom event when a YouTube facade is activated.
 * @param {HTMLElement} el - The element that triggered the event.
 * @param {string} videoId - The YouTube video ID.
 */
function dispatchFacadeActivated(el, videoId) {
  const event = new CustomEvent('youtube-facade-active', {
    detail: { element: el, videoId },
    bubbles: true,
  });
  el.dispatchEvent(event);
}

export default youtubeFacade;

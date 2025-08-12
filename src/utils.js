/**
 * Adds a preconnect link to the document head for performance optimization.
 * @param {string} url - The URL to preconnect to.
 */
const addPreconnect = (url) => {
  if (!url || typeof url !== 'string') {
    console.error('addPreconnect: Invalid URL');
    return;
  }
  try {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = url;
    document.head.appendChild(link);
  }
  catch (err) {
    console.error('addPreconnect: Failed to add preconnect link', err);
  }
};

/**
 * Warms up connections by preconnecting to essential domains for YouTube embeds.
 * Only runs once per session.
 */
const warmConnections = (() => {
  let preconnectsAdded = false;
  const preconnectUrls = [
    'https://www.youtube-nocookie.com',
    'https://www.google.com',
  ];
  return () => {
    if (preconnectsAdded) return;
    preconnectUrls.forEach(url => addPreconnect(url));
    preconnectsAdded = true;
  };
})();

/**
 * Extracts the YouTube video ID from an element's data attribute or href.
 * @param {HTMLElement} el - The element containing the video info.
 * @returns {string|null} The YouTube video ID, or null if not found/invalid.
 */
function getYoutubeVideoId(el) {
  if (!el || !(el instanceof HTMLElement)) {
    console.error('getYoutubeVideoId: Invalid element');
    return null;
  }
  let videoId = el.getAttribute('data-youtube-id');
  if (videoId) return videoId;
  const href = el.getAttribute('href');
  if (!href) return null;
  try {
    const url = new URL(href);
    videoId = url.searchParams.get('v');
  }
  catch (error) {
    console.error('getYoutubeVideoId: Failed to parse href', error);
    return null;
  }
  return videoId;
}

/**
 * Checks if the user is on a mobile device (viewport < 600px and user agent contains 'Mobi').
 * @returns {boolean} True if mobile, false otherwise.
 */
function isMobile() {
  return window.innerWidth < 600 && navigator.userAgent.includes('Mobi');
}

/**
 * Delegates an event from a parent to matching child elements.
 * @param {HTMLElement} parent - The parent element to delegate the event to.
 * @param {string} eventType - The type of event to listen for.
 * @param {string} selector - The selector for the child elements.
 * @param {Function} handler - The event handler function.
 * @param {object|boolean} [options=false] - Options for addEventListener.
 */
function delegateEvent(parent, eventType, selector, handler, options = false) {
  // Accept document as a valid parent
  const isDocument = parent === document;
  if (!isDocument && !(parent instanceof HTMLElement)) {
    console.error('delegateEvent: Invalid parent element');
    return;
  }
  if (typeof eventType !== 'string' || typeof selector !== 'string' || typeof handler !== 'function') {
    console.error('delegateEvent: Invalid arguments');
    return;
  }
  // Use document if parent is document, otherwise use parent
  const eventTarget = isDocument ? document : parent;
  eventTarget.addEventListener(eventType, function (event) {
    const targetElement = event.target.closest(selector);
    if (targetElement && (isDocument || this.contains(targetElement))) {
      handler.call(targetElement, event);
    }
  }, options);
}

function getTargetElement(el) {
  if (!el || !(el instanceof HTMLElement)) {
    console.error('getTargetElement: Invalid element');
    return null;
  }
  const targetSelector = el.getAttribute('data-target');
  if (targetSelector) {
    const targetElement = document.querySelector(targetSelector);
    if (targetElement) {
      return targetElement;
    }
    console.error(
      'getTargetElement: Target element not found for selector:',
      targetSelector,
    );
    return null;
  }
  return el;
}

export {
  getYoutubeVideoId,
  isMobile,
  warmConnections,
  delegateEvent,
  getTargetElement,
};

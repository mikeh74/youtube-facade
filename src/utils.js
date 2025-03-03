/**
 *
 * @param {string} url
 */
const addPreconnect = (url) => {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = url;
  document.head.appendChild(link);
};

const warmConnections = (function () {
  let preconnnectsAdded = false;
  let preconnectUrls = [
    'https://www.youtube-nocookie.com',
    'https://www.google.com',
  ];

  return function () {
    if (preconnnectsAdded) {
      return;
    }
    preconnectUrls.forEach((url) => {
      addPreconnect(url);
    });
    preconnnectsAdded = true;
  };
})();

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
  }
  catch (error) {
    console.error(error);
    return null;
  }

  return videoId;
};

// function to check viewport width is less than 400px and the user is on a
// mobile device, and the user agent includes 'Intel Mac OS X'
function isMobile() {
  return window.innerWidth < 600 && navigator.userAgent.includes('Mobi');
}

/**
 * Delegate an event to a parent element
 *
 * @param {HTMLElement} parent - The parent element to delegate the event to
 * @param {string} eventType - The type of event to listen for
 * @param {string} selector - The selector for the child elements to delegate the event to
 * @param {Function} handler - The event handler function
 * @param {object} options - The options for the event listener
 */
function delegateEvent(parent, eventType, selector, handler, options = false) {
  parent.addEventListener(eventType, function (event) {
    const targetElement = event.target.closest(selector);

    // this is that 'parent' element at this point
    if (this.contains(targetElement)) {
      handler.call(targetElement, event);
    }
  }, options);
}

export { getYoutubeVideoId, isMobile, warmConnections, delegateEvent };

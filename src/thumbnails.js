import { getYoutubeVideoId } from './utils';
/**
 * Takes an html element and a youtube video ID, and populates the element's
 * `src` attribute with the highest resolution thumbnail image available.
 *
 * @param {HTMLElement} element
 * @param {string} ytId
 */
const populateYoutubeImg = async (element, ytId) => {
  if (
    !element
    || !(element instanceof HTMLElement)
    || element.tagName !== 'IMG'
  ) {
    console.error('populateYoutubeImg: Invalid element (must be IMG)');
    return;
  }

  const options = [
    'maxresdefault',
    'sddefault',
    'hqdefault',
    'mqdefault',
    'default',
  ];

  const baseUrl = `https://img.youtube.com/vi/${ytId}/`;
  const imgUrls = options.map(opt => `${baseUrl}${opt}.jpg`);

  /**
   * Loop through URLs and fetch the first valid image
   *
   * @param {*} urls
   * @return
   */
  async function fetchFirstValidImage(urls) {
    for (const url of urls) {
      try {
        const response = await fetch(url);
        if (response.status === 200) {
          return response;
        }
      }
      catch (err) {
        console.warn('Could not find a valid youtube image:', err);
      }
    }
    return null; // No valid image found
  }

  const o = await fetchFirstValidImage(imgUrls);
  if (o) {
    element.src = o.url;
  }
};

/**
 * Finds all IMG elements with data-use-youtube-thumb and populates their src with the best thumbnail.
 * @param {string} [selector='.youtube-facade-img']
 */
const checkForThumbs = (selector = '.youtube-facade') => {
  const elements = document.querySelectorAll(`${selector}[data-use-youtube-thumb]`);
  elements.forEach((el) => {
    let img = null;
    if (el.tagName === 'IMG') {
      img = el;
    }
    else {
      img = el.querySelector('img');
      if (!img) {
        console.error('checkForThumbs: No IMG found in element', el);
        return;
      }
    }

    const ytId = getYoutubeVideoId(el);
    if (ytId) {
      populateYoutubeImg(img, ytId);
    }
  });
};

export default checkForThumbs;

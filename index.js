
const els = document.querySelectorAll('.youtube-facade');

console.log(els);

els.forEach(el => {

  el.addEventListener('click', (e) => {
    e.preventDefault();

    // try to get the video id from the data-youtube-id attribute first
    const videoId = getYoutubeVideoId(el);

    // create an iframe element and replace the current element with it
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1`);
    iframe.setAttribute('width', '560');
    iframe.setAttribute('height', '315');
    iframe.setAttribute('class', 'youtube-facade-iframe');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');

    el.replaceWith(iframe);
  });
});

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

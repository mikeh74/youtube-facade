/**
 * Youtube player setup - load script and add event listeners
 *
 */
const loadScript = () => {
  const tag = document.createElement('script');
  tag.id = 'youtube-iframe-api';
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
};

/**
 * @param {event} event
 *
 * When a player is ready start playing the video
 */
window.onYoutubePlayerReady = function(event) {
  event.target.playVideo();
};

const createPlayer = (playerContainer, youtubeId) => {
  window[playerContainer] = new YT.Player(playerContainer, {
    height: '450',
    width: '800',
    videoId: youtubeId,
    host: 'https://www.youtube-nocookie.com',
    events: {
      'onReady': onYoutubePlayerReady,
    },
    playerVars: {
      'rel': 0,
    },
  });
};

const modal = () => {
  return `
  <div class="modal modal-youtube fade" id="youtubeModal" tabindex="-1"
    role="dialog">
    <div class="modal-youtube-inner">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
            <button id="close-youtube-player" type="button" class="close"
              data-dismiss="modal" aria-label="Close">CLOSE ×</button>
          <div class="modal-body modal-body-youtube">
            <div class="embed-responsive embed-responsive-16by9">
              <div id="ytIframePlayer" class="embed-responsive-item"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
};


// need to decide whether it's a play in place or a modal
const init = (el, selector) => {
  el.addEventListener('click', (event) => {
    event.preventDefault();
    const chrs = selector.split('');

    let str;

    // remove square brackets from selector if present
    if (chrs[0] === '[') {
      str = selector.substring(1, chrs.length - 1);
    } else {
      str = selector;
    }

    const id = el.getAttribute(str);
    const playInModal = el.getAttribute('data-youtube-modal');

    let playerContainer;

    if (playInModal) {
      const mod = document.querySelector('#youtubeModal');
      if (mod === null) {
        document.body.insertAdjacentHTML('beforeend', modal());
      }

      playerContainer = 'ytIframePlayer';

      createPlayer(playerContainer, id);

      $('#youtubeModal').modal();

      $('#youtubeModal').on('hidden.bs.modal', function() {
        window['ytIframePlayer'].destroy();
      });
    } else {
      const img = el.querySelector('img');
      const caption = el.querySelector('.youtube-caption--wrapper');

      el.removeChild(caption);

      playerContainer = img.id;
      createPlayer(playerContainer, id);
    }
  });
};

/**
 * Default function to configure component
 *
 * @param {string} selector
 */
export default function(selector = '[data-youtube-id]') {
  const els = document.querySelectorAll(selector);


  if (typeof els !== 'undefined') {
    loadScript();
    els.forEach((el) => {
      init(el, selector);
    });
  }
}

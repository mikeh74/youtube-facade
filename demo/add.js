document.getElementById('add').addEventListener('click', function () {
  console.log('Adding a new element to the page');

  const anchor = document.createElement('a');
  anchor.href = 'https://www.youtube.com/watch?v=n62zZATx9Ts';
  anchor.classList.add('youtube-facade');
  anchor.target = '_blank';
  // anchor.setAttribute('data-youtube-modal', 'true');
  anchor.rel = 'noopener noreferrer';
  //  aria-label="Play embedded youtube video';

  const img = document.createElement('img');
  img.src = 'https://img.youtube.com/vi/n62zZATx9Ts/0.jpg';
  img.alt = 'Play embedded youtube video';
  img.width = 320;
  img.height = 240;
  anchor.appendChild(img);

  document.getElementById('video-target').appendChild(anchor);
});

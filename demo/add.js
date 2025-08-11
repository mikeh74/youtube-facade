document.getElementById('add').addEventListener('click', function () {
  console.log('Adding a new element to the page');

  // Create a container for the new example
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem; width: 300px;';

  // Create the facade with data-target
  const anchor = document.createElement('a');
  anchor.href = 'https://www.youtube.com/watch?v=n62zZATx9Ts';
  anchor.classList.add('youtube-facade');
  anchor.target = '_blank';
  anchor.setAttribute('data-target', '#dynamic-target');
  anchor.rel = 'noopener noreferrer';
  anchor.setAttribute('aria-label', 'Play embedded youtube video');

  const img = document.createElement('img');
  img.src = 'https://img.youtube.com/vi/n62zZATx9Ts/0.jpg';
  img.alt = 'Play embedded youtube video';
  img.width = 320;
  img.height = 240;
  anchor.appendChild(img);

  // Create the target element
  const target = document.createElement('div');
  target.id = 'dynamic-target';
  target.style.cssText = 'background: #f0f0f0; padding: 20px; text-align: center; border: 2px dashed #ccc;';
  target.textContent = 'Dynamic Target - This will be replaced by the video';

  container.appendChild(anchor);
  container.appendChild(target);
  document.getElementById('video-target').appendChild(container);
});

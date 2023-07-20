import './uploadForm.js';
import { getRandomInt } from './util.js';
import { messages, names } from './data.js';
import { renderPictures } from './renderPictures.js';
import { closeModal } from './drawModal.js';

const photos = [];

for(let i = 1; i <= 25; i++) {
  const comments = [];

  for(let j = 0; j < getRandomInt(0, 30); j++) {
    const message = messages[getRandomInt(0, 500) % messages.length];
    const name = names[getRandomInt(0, 500) % names.length];
    comments.push({
      id: j,
      url: `img/avatar-${getRandomInt(1, 7)}.svg`,
      message,
      name: name,
    });
  }

  photos.push({
    id: i,
    url: `photos/${i}.jpg`,
    description: 'мандарин',
    likes: getRandomInt(15, 200),
    comments: comments
  });
}

renderPictures(photos);

document
  .getElementById('picture-cancel')
  .addEventListener('click', closeModal);


import './uploadForm.js';
import { renderPictures } from './renderPictures.js';
import { closeModal } from './drawModal.js';
import { getPosts } from './api.js';

getPosts().then(renderPictures)

document
  .getElementById('picture-cancel')
  .addEventListener('click', closeModal);


import { openModal } from './drawModal.js'

const template = document.getElementById("picture");
const container = document.querySelector('.pictures');

export const renderPictures = (photos = []) => {
  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];
    const wrapper = document.createElement('div');
    const item = template.content.cloneNode(true);

      item
        .querySelector('.picture__img')
        .src = photo.url;

      item
        .querySelector('.picture__img')
        .alt = photo.description;

      item
        .querySelector('.picture__comments')
        .textContent = photo.comments.length;

      item
        .querySelector('.picture__likes')
        .textContent = photo.likes;

      wrapper.addEventListener('click', e => {
        e.preventDefault();
        openModal(photo);
      });

      wrapper.appendChild(item)

      container.appendChild(wrapper);
  }
}

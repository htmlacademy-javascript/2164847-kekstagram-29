const modal = document.querySelector('.big-picture');

export function openModal(photo) {
  modal
    .querySelector('.big-picture__img img')
    .src = photo.url;

  modal
    .querySelector('.social__caption')
    .textContent = photo.description;

  modal
    .querySelector('.big-picture__img img')
    .alt = photo.description;

  modal
    .querySelector('.likes-count')
    .textContent = photo.likes;

  modal
    .querySelector('.comments-count')
    .textContent = photo.comments.length;

  modal
    .querySelector('.social__comments')
    .innerHTML = `
      ${
        photo.comments
          .map(comment => `
            <li class="social__comment">
                <img
                    src="${comment.url}"
                    alt="${comment.name}"
                    width="35" height="35"
                    class="social__picture"
                  >
                <p class="social__text">
                  ${comment.message}
                </p>
            </li>
          `)
          .join('')
      }
    `;
  modal
    .querySelector('.social__comment-count')
    .classList.add('hidden');
  modal
    .querySelector('.comments-loader')
    .classList.add('hidden');

  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

export function closeModal() {
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

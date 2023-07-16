const modal = document.querySelector('.big-picture');

export function openModal(photo) {
  let commentsLimit = 5;
  const commentsLoader = modal
    .querySelector('.comments-loader');

  if(commentsLimit < photo.comments.length) {
    commentsLoader.classList.remove('hidden');
  } else {
    commentsLoader.classList.add('hidden');
    commentsLimit = photo.comments.length;
  }

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
    .querySelector('.social__comments')
    .innerHTML = renderComments(photo.comments, commentsLimit);
  modal
    .querySelector('.social__comment-count')
    .innerHTML = renderCommentsCount(commentsLimit, photo.comments.length);


  const handler = function() {
    commentsLimit += 5;
    if(commentsLimit >= photo.comments.length) {
      commentsLimit = photo.comments.length;
      this.classList.add('hidden');
    }
    modal
      .querySelector('.social__comments')
      .innerHTML = renderComments(photo.comments, commentsLimit);
    modal
      .querySelector('.social__comment-count')
      .innerHTML = renderCommentsCount(commentsLimit, photo.comments.length);
  }

  commentsLoader.addEventListener('click', handler);
  document
    .getElementById('picture-cancel')
    .addEventListener('click', () => {
      commentsLoader.removeEventListener('click', handler);
    })

  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

export function closeModal() {
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');
}


function renderComments(comments = [], limit = 0) {
  return `
    ${comments
        .slice(0, limit)
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
`
}


function renderCommentsCount(from, to) {
  return `${from} из <span class="comments-count">${to}</span> комментариев`
}

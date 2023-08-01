import './uploadForm.js';
import { getPosts } from './api.js';
import { createState } from './state.js';
import { getRandomItems } from './utils.js';
import { renderPictures } from './renderPictures.js';
import { showFilters, bindFiltersChangeHandler, renderFilters, DEFAULT_VALUE, RANDOM_VALUE, DISCUSSED_VALUE, hideFilters } from './filters.js';
import { notification } from './notification.js';

const store = createState({
  posts: [],
  activeFilter: DEFAULT_VALUE
}, renderApp);


bindFiltersChangeHandler((targetValue) => {
  store.update({ activeFilter: targetValue });
});

getPosts()
  .then((posts) => {
    store.update({ posts });
  })
  .catch(() => {
    notification.error('Произошла ошибка');
  });

function renderApp(state) {
  if(state.posts?.length) {
    showFilters();
    switch(state.activeFilter) {
      case RANDOM_VALUE:
        renderPictures(getRandomItems(state.posts, 10));
        break;
      case DISCUSSED_VALUE:
        renderPictures(
          state.posts.sort((a, b) => b.comments.length - a.comments.length)
        );
        break;
      default:
        renderPictures(state.posts);
        break;
    }
    renderFilters(state.activeFilter);
  } else {
    hideFilters();
  }
}

export const filters = document.querySelector('.img-filters');
export const randomFilter = document.getElementById('filter-random');
export const defaultFilter = document.getElementById('filter-default');
export const discussedFilter = document.getElementById('filter-discussed');

export const RANDOM_VALUE = 'random';
export const DEFAULT_VALUE = 'default';
export const DISCUSSED_VALUE = 'discussed';

export function showFilters() {
  filters.classList.remove('img-filters--inactive');
}
export function hideFilters() {
  filters.classList.add('img-filters--inactive');
}

export function bindFiltersChangeHandler(callback) {
  if(typeof callback !== 'function') {
    return;
  }

  randomFilter.addEventListener('click', (e) => {
    e.preventDefault();
    callback(RANDOM_VALUE);
  });

  defaultFilter.addEventListener('click', (e) => {
    e.preventDefault();
    callback(DEFAULT_VALUE);
  });
  discussedFilter.addEventListener('click', (e) => {
    e.preventDefault();
    callback(DISCUSSED_VALUE);
  });
}

export function renderFilters(activeValue) {
  const filtersButons = document.querySelectorAll('.img-filters__button');

  filtersButons.forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });

  switch(activeValue) {
    case RANDOM_VALUE:
      randomFilter.classList.add('img-filters__button--active');
      break;
    case DISCUSSED_VALUE:
      discussedFilter.classList.add('img-filters__button--active');
      break;
    default:
      defaultFilter.classList.add('img-filters__button--active');
      break;
  }
}

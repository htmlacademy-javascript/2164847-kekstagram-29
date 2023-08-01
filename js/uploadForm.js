import { createState } from './state.js';
import { sendUploadForm } from './api.js';
import { notification } from './notification.js';

const MAX_SCALE = 1;
const MIN_SCALE = 0.25;

let disableEsc = false;

const formSubmit = document.getElementById('upload-submit');
const form = document.getElementById('upload-select-image');
const slider = document.querySelector('.effect-level__slider');
const filters = document.querySelectorAll('.effects__radio');
const upload = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');
const smaller = document.querySelector('.scale__control--smaller');
const bigger = document.querySelector('.scale__control--bigger');
const scalewrapper = document.querySelector('.scale__control--value');
const sliderWrapper = document.querySelector('.img-upload__effect-level');
const effectLevelInput = document.querySelector('.effect-level__value');
const hashtagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

const formState = createState({
  scale: 1,
  intensity: 100,
  isOpen: false,
  filter: 'none',
  imageUrl: null,
}, uploadPreviewRender);

function uploadPreviewRender(state, prevState) {
  preview.src = state.imageUrl;

  if(state.filter !== prevState.filter) {
    state.intensity = 100;
    slider.noUiSlider.set(100);
  }

  if(state.filter === 'none') {
    sliderWrapper.classList.add('hidden');
  } else {
    sliderWrapper.classList.remove('hidden');
  }

  filters.forEach((filter) => {
    if(filter.value === state.filter) {
      filter.checked = true;
    }
  });
  switch(state.filter) {
    case 'none':
      preview.style.filter = 'none';
      effectLevelInput.value = 100;
      break;
    case 'chrome':
      effectLevelInput.value = state.intensity / 100;
      preview.style.filter = `grayscale(${state.intensity / 100})`;
      break;
    case 'sepia':
      effectLevelInput.value = state.intensity / 100;
      preview.style.filter = `sepia(${state.intensity / 100})`;
      break;
    case 'marvin':
      effectLevelInput.value = `${state.intensity}%`;
      preview.style.filter = `invert(${state.intensity}%)`;
      break;
    case 'phobos':
      effectLevelInput.value = `${3 * (state.intensity / 100)}px`;
      preview.style.filter = `blur(${3 * (state.intensity / 100)}px)`;
      break;
    case 'heat':
      effectLevelInput.value = `${1 + 2 * (state.intensity / 100)}`;
      preview.style.filter = `brightness(${1 + 2 * (state.intensity / 100)})`;
      break;
    default:
      break;
  }


  preview.style.transform = `scale(${state.scale})`;
  scalewrapper.value = `${state.scale * 100}%`;

  if(state.isOpen) {
    document
      .querySelector('.img-upload__overlay')
      .classList.remove('hidden');
    document.body.classList.add('modal-open');
  } else {
    document
      .querySelector('.img-upload__overlay')
      .classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
}


noUiSlider.create(slider, {
  start: formState.intensity,
  connect: 'lower',
  range: {
    'min': 0,
    'max': 100
  },
});

slider.noUiSlider.on('update', ([ stringValue ]) => {
  const intValue = parseInt(stringValue, 10);

  if(intValue !== formState.intensity) {
    formState.update({
      intensity: intValue
    });
  }
});

filters.forEach((filter) => {
  filter.addEventListener('change', (e) => {
    formState.update({
      filter: e.target.value
    });
  });
});

smaller.addEventListener('click', () => {
  formState.update((prev) => {
    let newScale = prev.scale - 0.25;
    if(newScale < MIN_SCALE) {
      newScale = MIN_SCALE;
    }
    return {
      ...prev,
      scale: newScale
    };
  });
});

bigger.addEventListener('click', () => {
  formState.update((prev) => {
    let newScale = prev.scale + 0.25;
    if(newScale > MAX_SCALE) {
      newScale = MAX_SCALE;
    }
    return {
      ...prev,
      scale: newScale
    };
  });
});

upload.addEventListener('change', () => {
  const [ file ] = upload.files;

  if (! file) {
    return;
  }

  formState.update({
    isOpen: true,
    imageUrl: URL.createObjectURL(file)
  });
});

const pristine = new Pristine(form);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  e.stopPropagation();

  formSubmit.setAttribute('disabled', true);

  const valid = pristine.validate();
  if(valid) {
    try {
      disableEsc = false;
      await sendUploadForm(form);
      upload.value = '';
      formState.reset();
      hashtagInput.value = '';
      descriptionInput.value = '';
      notification.success('Пост успешно опубликован');
    } catch {
      disableEsc = true;
      notification.error('При отправке формы произошла ошибка');
    }
    pristine.reset();
  }
  formSubmit.removeAttribute('disabled');
});


document.addEventListener('keydown', (evt) => {
  evt = evt || window.event;
  let isEscape = false;
  if ('key' in evt) {
    isEscape = (evt.key === 'Escape' || evt.key === 'Esc');
  } else {
    isEscape = (evt.keyCode === 27);
  }
  if (isEscape && !disableEsc) {
    pristine.reset();
    upload.value = '';
    formState.reset();
    hashtagInput.value = '';
    descriptionInput.value = '';
    formSubmit.removeAttribute('disabled');
  }
});


hashtagInput.addEventListener('focus', () => {
  disableEsc = true;
});

hashtagInput.addEventListener('blur', () => {
  disableEsc = false;
});

descriptionInput.addEventListener('focus', () => {
  disableEsc = true;
});

descriptionInput.addEventListener('blur', () => {
  disableEsc = false;
});

document.getElementById('upload-cancel')
  .addEventListener('click', () => {
    pristine.reset();
    formState.reset();
    upload.value = '';
    hashtagInput.value = '';
    descriptionInput.value = '';
    formSubmit.removeAttribute('disabled');
  });

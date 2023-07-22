import { createState } from './state.js';

const MAX_SCALE = 1;
const MIN_SCALE = 0.25;

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
    slider.noUiSlider.set(100)
  }

  if(state.filter === 'none') {
    sliderWrapper.classList.add('hidden');
  } else {
    sliderWrapper.classList.remove('hidden');
  }

  effectLevelInput.value = state.intensity;

  switch(state.filter) {
    case 'none':
      preview.style.filter = `none`;
      break;
    case 'chrome':
      preview.style.filter = `grayscale(${state.intensity / 100})`;
      break;
    case 'sepia':
      preview.style.filter = `sepia(${state.intensity / 100})`;
      break;
    case 'marvin':
      preview.style.filter = `invert(${state.intensity}%)`;
      break;
    case 'phobos':
      preview.style.filter = `blur(${3 * (state.intensity / 100)}px)`;
      break;
    case 'heat':
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

slider.noUiSlider.on('update', function([ stringValue ]) {
  const intValue = parseInt(stringValue);

  if(intValue !== formState.intensity) {
    formState.update({
      intensity: intValue
    });
  }
});

filters.forEach(filter => {
  filter.addEventListener('change', (e) => {
    formState.update({
      filter: e.target.value
    })
  });
});

smaller.addEventListener('click', function() {
  formState.update(prev => {
    let newScale = prev.scale - 0.25;
    if(newScale < MIN_SCALE) {
      newScale = MIN_SCALE;
    }
    return {
      ...prev,
      scale: newScale
    }
  });
});

bigger.addEventListener('click', function() {
  formState.update(prev => {
    let newScale = prev.scale + 0.25;
    if(newScale > MAX_SCALE) {
      newScale = MAX_SCALE;
    }
    return {
      ...prev,
      scale: newScale
    }
  });
});

upload.addEventListener('change', function(e) {
  const [ file ] = upload.files;

  if (! file) {
    return;
  }

  formState.update({
    isOpen: true,
    imageUrl: URL.createObjectURL(file)
  });
});

document
.getElementById('upload-cancel')
.addEventListener('click', () => {
  formState.reset();
});


const pristine = new Pristine(form);

form.addEventListener('submit', function (e) {

   const valid = pristine.validate();

   if(! valid) {
    e.preventDefault();
    console.log("Форма заполнена некорректно");
   }

});

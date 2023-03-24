import {imageUpload} from './image-scale.js';

const effectsContainer = document.querySelector('.img-upload__effects');
const effectSlider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const effectLevel = document.querySelector('.img-upload__effect-level');


const EFFECTS = [
  {
    name: 'none',
    filter: 'none',
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    start: 100,
    unit : ''
  },
  {
    name: 'chrome',
    filter: 'grayscale',
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
    unit : ''
  },
  {
    name: 'sepia',
    filter: 'sepia',
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
    unit : ''
  },
  {
    name: 'marvin',
    filter: 'invert',
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    start: 100,
    unit : '%'
  },
  {
    name: 'phobos',
    filter: 'blur',
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    start: 3,
    unit : 'px'
  },
  {
    name: 'heat',
    filter: 'brightness',
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    start: 3,
    unit : ''
  }
];

const DEFAULT_EFFECT = EFFECTS[0];
let currentEffect = DEFAULT_EFFECT;

const isDefault = () => currentEffect === DEFAULT_EFFECT;

// Показать ползунок

const showSlider = () => {
  effectLevel.classList.remove('hidden');
};

// Скрыть ползунок

const hideSlider = () => {
  effectLevel.classList.add('hidden');
};

noUiSlider.create(effectSlider, {
  range: DEFAULT_EFFECT.range,
  step: DEFAULT_EFFECT.step,
  start: DEFAULT_EFFECT.start,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});
hideSlider();

// Обновить ползунок

const updateSlider = () => {
  effectSlider.noUiSlider.updateOptions({
    range: currentEffect.range,
    step: currentEffect.step,
    start: currentEffect.start,
  });

  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

// Изменение эффектов

const onEffectsChange = (evt) => {
  if(!evt.target.classList.contains('effects__radio')) {
    return;
  }
  currentEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  imageUpload.className = `effects__preview--${currentEffect.name}`;
  updateSlider();
};

// Обновление ползунка

const onSliderUpdate = () => {
  const sliderValue = effectSlider.noUiSlider.get();
  effectValue.value = sliderValue;
  if (isDefault()) {
    imageUpload.style.filter = DEFAULT_EFFECT.filter;
  } else {
    imageUpload.style.filter = `${currentEffect.filter}(${sliderValue}${currentEffect.unit})`;
  }
};

// Сброс эффектов

const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;
  updateSlider();
};

effectsContainer.addEventListener('change', onEffectsChange);
effectSlider.noUiSlider.on('update', onSliderUpdate);

export {resetEffects};

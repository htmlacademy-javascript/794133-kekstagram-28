const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;
const DEFAULT_SCALE = 100;

const btnSmall = document.querySelector('.scale__control--smaller');
const btnBig = document.querySelector('.scale__control--bigger');
const inputScaleControl = document.querySelector('.scale__control--value');
const imageUpload = document.querySelector('.img-upload__preview img');


// Изменение масштаба изображения

const scaleImage = (value) => {
  imageUpload.style.transform = `scale(${value / 100})`;
};

// Уменьшение масштаба

const onZoomOut = () => {
  const currentValue = parseInt(inputScaleControl.value, 10);
  let result = currentValue - SCALE_STEP;
  if (result < MIN_SCALE) {
    result = MIN_SCALE;
  }
  inputScaleControl.value = `${result}%`;
  scaleImage(result);
};

// Увеличение масштаба

const onZoomIn = () => {
  const currentValue = parseInt(inputScaleControl.value, 10);
  let result = currentValue + SCALE_STEP;
  if (result > MAX_SCALE) {
    result = MAX_SCALE;
  }
  inputScaleControl.value = `${result}%`;
  scaleImage(result);
};

// Установление масштаба по умолчанию

const setDefaultScale = () => {
  inputScaleControl.value = '100%';
  scaleImage(DEFAULT_SCALE);
};

btnSmall.addEventListener('click', onZoomOut);
btnBig.addEventListener('click', onZoomIn);

export {setDefaultScale, imageUpload};

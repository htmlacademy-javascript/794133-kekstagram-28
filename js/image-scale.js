const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;
const DEFAULT_SCALE = 100;

const zoomOutBtn = document.querySelector('.scale__control--smaller');
const zoomInBtn = document.querySelector('.scale__control--bigger');
const inputScaleControl = document.querySelector('.scale__control--value');
const uploadImg = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  uploadImg.style.transform = `scale(${value / 100})`;
};

const onZoomOut = () => {
  const currentValue = parseInt(inputScaleControl.value, 10);
  let result = currentValue - SCALE_STEP;
  if (result < MIN_SCALE) {
    result = MIN_SCALE;
  }
  inputScaleControl.value = `${result}%`;
  scaleImage(result);
};

const onZoomIn = () => {
  const currentValue = parseInt(inputScaleControl.value, 10);
  let result = currentValue + SCALE_STEP;
  if (result > MAX_SCALE) {
    result = MAX_SCALE;
  }
  inputScaleControl.value = `${result}%`;
  scaleImage(result);
};

const setDefaultScale = () => {
  inputScaleControl.value = '100%';
  scaleImage(DEFAULT_SCALE);
};

zoomOutBtn.addEventListener('click', onZoomOut);
zoomInBtn.addEventListener('click', onZoomIn);

export {setDefaultScale, uploadImg};

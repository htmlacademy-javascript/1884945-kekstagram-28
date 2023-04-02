const SCALE_IMG_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const scaleImg = (value) => {
  imgUploadPreview.style.transform = `scale(${value / 100})`;
  scaleControlValue.value = `${value}%`;
};

const reduceScale = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  let newValue = currentValue - SCALE_IMG_STEP;
  if (newValue < MIN_SCALE_VALUE) {
    newValue = MIN_SCALE_VALUE;
  }
  scaleImg(newValue);
};

const increaseScale = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  let newValue = currentValue + SCALE_IMG_STEP;
  if (newValue > MAX_SCALE_VALUE) {
    newValue = MAX_SCALE_VALUE;
  }
  scaleImg(newValue);
};

const addScale = () => {
  scaleControlSmaller.addEventListener('click', reduceScale);
  scaleControlBigger.addEventListener('click', increaseScale);
};

const resetScale = () => {
  scaleImg(parseInt(scaleControlValue.getAttribute('value'), 10));
  scaleControlSmaller.removeEventListener('click', reduceScale);
  scaleControlBigger.removeEventListener('click', increaseScale);
};

export { addScale, resetScale };

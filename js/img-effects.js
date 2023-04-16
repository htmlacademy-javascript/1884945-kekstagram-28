const EFFECTS = [
  {
    name: 'effect-none',
    filter: 'none',
    min: 0,
    max: 0,
    step: 0,
    unit: '',
  },
  {
    name: 'effect-chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'effect-sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'effect-marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'effect-phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'effect-heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];
const DEFAULT_EFFECT = EFFECTS[0];
const imgUpload = document.querySelector('.img-upload');
const imgUploadPreview = imgUpload.querySelector('.img-upload__preview');
const effectLevelSliderContainer = imgUpload.querySelector(
  '.img-upload__effect-level'
);
const effectLevelSlider = imgUpload.querySelector('.effect-level__slider');
const effectLevelValue = imgUpload.querySelector('.effect-level__value');
const effectsList = imgUpload.querySelector('.effects__list');

effectLevelSliderContainer.classList.add('hidden');
noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 0,
  },
  start: 0,
  step: 0,
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

const updateSlider = (effect) => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: effect.min,
      max: effect.max,
    },
    start: effect.max,
    step: effect.step,
  });
};

const chooseEffect = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  const chosenEffect = EFFECTS.find(
    (element) => element.name === evt.target.id
  );
  const onUpdateSlider = () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    imgUploadPreview.style.filter = `${chosenEffect.filter}(${effectLevelValue.value}${chosenEffect.unit})`;
  };

  if (chosenEffect.name === 'effect-none') {
    effectLevelSliderContainer.classList.add('hidden');
    updateSlider(chosenEffect);
    imgUploadPreview.className = 'img-upload__preview';
    imgUploadPreview.style.filter = chosenEffect.filter;
    return;
  }
  effectLevelSlider.noUiSlider.off('update', onUpdateSlider);
  effectLevelSliderContainer.classList.remove('hidden');
  imgUploadPreview.className = `img-upload__preview effects__preview--${
    chosenEffect.name.split('-')[1]
  }`;
  updateSlider(chosenEffect);
  effectLevelSlider.noUiSlider.on('update', onUpdateSlider);
};

const addFilters = () => {
  effectsList.addEventListener('click', chooseEffect);
};

const removeFilters = () => {
  effectsList.removeEventListener('click', chooseEffect);
  imgUploadPreview.className = 'img-upload__preview';
  updateSlider(DEFAULT_EFFECT);
  imgUploadPreview.style.filter = 'none';
  effectLevelSliderContainer.classList.add('hidden');
};

export { addFilters, removeFilters };

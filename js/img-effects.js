const EFFECTS = [
  {
    name: 'effect-none',
    filter: 'none',
    min: 0,
    max: 0,
    step: 0,
  },
  {
    name: 'effect-chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
  },
  {
    name: 'effect-sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
  },
  {
    name: 'effect-marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
  },
  {
    name: 'effect-phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
  },
  {
    name: 'effect-heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
  },
];
const imgUpload = document.querySelector('.img-upload');
const effectLevelSlider = imgUpload.querySelector('.effect-level__slider');
const effectLevelValue = imgUpload.querySelector('.effect-level__value');
const effectsList = imgUpload.querySelector('.effects__list');
const checkedEffect = imgUpload.querySelector();

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 0,
  },
  start: 0,
  step: 1,
  connect: 'lower',
});

effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
});

const chooseEffect = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  console.log(evt.target.id);
};

effectsList.addEventListener('click', chooseEffect);

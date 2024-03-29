const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createsAnArrayOfConsecutiveNumbers = (min, max) =>
  Array.from({ length: max }, (_, i) => i + min);

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const RANDOM_ID_ARRAY = shuffleArray(
    createsAnArrayOfConsecutiveNumbers(min, max)
  );
  let i = -1;

  return () => {
    i++;
    return RANDOM_ID_ARRAY[i];
  };
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const isPictureImg = (evt) => evt.target.className === 'picture__img';

const composeElement = (tagName, className, text) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

const cancelEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  getRandomInteger,
  shuffleArray,
  createRandomIdFromRangeGenerator,
  getRandomArrayElement,
  isEscapeKey,
  isPictureImg,
  composeElement,
  cancelEscKeydown,
  debounce,
};

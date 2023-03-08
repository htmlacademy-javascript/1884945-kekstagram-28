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

export {
  getRandomInteger,
  createRandomIdFromRangeGenerator,
  getRandomArrayElement,
};

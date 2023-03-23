import {
  getRandomInteger,
  createRandomIdFromRangeGenerator,
  getRandomArrayElement,
} from './util.js';

const PHOTO_DESCRIPTIONS_COUNT_MIN = 1; // Минимальное значение уникального id публикации;
const PHOTO_DESCRIPTIONS_COUNT_MAX = 25; // Максимальное значение уникального id публикации;
const COMMENT_ID_COUNT_MIN = 1; // Минимальное значение уникального id комментария;
const COMMENT_ID_COUNT_MAX = 999; // Максимальное значение уникального id комментария;
const COMMENTS_COUNT_MIN = 1; // Минимальное число комметариев у публикации;
const COMMENTS_COUNT_MAX = 27; // Максимальное число комметариев у публикации;
const LIKES_COUNT_MIN = 15; // Минимальное число лайков у публикации
const LIKES_COUNT_MAX = 200; // Максимальное число лайков у публикации

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
];
const DESCRIPTIONS = [
  'Моё любимое фото',
  'Опробовал новый фотоаппарат',
  'Фото через новый объектив',
  'Будничное фото',
  'Фото под настроение',
];

const generatePhotoId = createRandomIdFromRangeGenerator(
  PHOTO_DESCRIPTIONS_COUNT_MIN,
  PHOTO_DESCRIPTIONS_COUNT_MAX
);

const generateUrlId = createRandomIdFromRangeGenerator(
  PHOTO_DESCRIPTIONS_COUNT_MIN,
  PHOTO_DESCRIPTIONS_COUNT_MAX
);

const generateCommentId = createRandomIdFromRangeGenerator(
  COMMENT_ID_COUNT_MIN,
  COMMENT_ID_COUNT_MAX
);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createCommentsArray = () =>
  Array.from(
    { length: getRandomInteger(COMMENTS_COUNT_MIN, COMMENTS_COUNT_MAX) },
    createComment
  );

const createPhotoDescription = () => ({
  id: generatePhotoId(),
  url: `photos/${generateUrlId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES_COUNT_MIN, LIKES_COUNT_MAX),
  comments: createCommentsArray(),
});

const createPhotoDescriptions = () =>
  Array.from({ length: PHOTO_DESCRIPTIONS_COUNT_MAX }, createPhotoDescription);

export { createPhotoDescriptions };

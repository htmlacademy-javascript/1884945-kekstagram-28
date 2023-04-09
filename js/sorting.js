import { getData } from './api.js';
import { shuffleArray, debounce } from './util.js';
import { renderingThumbnails } from './rendering-thumbnails.js';

const RANDOM_PHOTO_DESCRIPTIONS_COUNT = 10;
const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');
let currentFilterButton = imgFiltersForm.querySelector(
  '.img-filters__button--active'
);
const photoDescriptions = await getData().then((result) => result);

const compareByNumberOfComments = (commentA, commentB) =>
  commentB['comments'].length - commentA['comments'].length;

const sortByDefault = () => photoDescriptions;

const sortByComments = (array) => array.slice().sort(compareByNumberOfComments);

const sortRandomly = (array) =>
  shuffleArray(array.slice()).slice(-RANDOM_PHOTO_DESCRIPTIONS_COUNT);

const getSortedPhotoDescriptions = () => {
  switch (currentFilterButton.id) {
    case 'filter-random':
      return sortRandomly(photoDescriptions);
    case 'filter-discussed':
      return sortByComments(photoDescriptions);
    default:
      return sortByDefault();
  }
};

const onSortingClick = (evt) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }
  if (evt.target.id !== currentFilterButton.id) {
    currentFilterButton.classList.remove('img-filters__button--active');
    currentFilterButton = evt.target;
    currentFilterButton.classList.add('img-filters__button--active');
    document.querySelectorAll('.picture').forEach((e) => e.remove());
    const debouncedrenderingThumbnails = debounce(renderingThumbnails);
    debouncedrenderingThumbnails(getSortedPhotoDescriptions());
  }
};

const initSorting = () => {
  imgFilters.classList.remove('img-filters--inactive');
  renderingThumbnails(getSortedPhotoDescriptions());
  imgFiltersForm.addEventListener('click', onSortingClick);
};

export { initSorting, photoDescriptions, getSortedPhotoDescriptions };

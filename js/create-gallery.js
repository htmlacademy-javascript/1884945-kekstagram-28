import { getData } from './api.js';
import { renderingThumbnails } from './rendering-thumbnails.js';
import { openFullSizeThumbnail } from './full-size-thumbnail.js';
import { showFilters } from './filters.js';

const photoDescriptions = await getData().then((result) => result);
const picturesContainer = document.querySelector('.pictures');

const createGallery = () => {
  renderingThumbnails(photoDescriptions);
  showFilters();
  picturesContainer.addEventListener('click', openFullSizeThumbnail);
};

export { createGallery, photoDescriptions };

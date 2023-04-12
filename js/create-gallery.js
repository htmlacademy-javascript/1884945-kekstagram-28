import { openFullSizeThumbnail } from './full-size-thumbnail.js';
import { initSorting } from './sorting.js';

const picturesContainer = document.querySelector('.pictures');

const createGallery = () => {
  initSorting();
  picturesContainer.addEventListener('click', openFullSizeThumbnail);
};

export { createGallery };

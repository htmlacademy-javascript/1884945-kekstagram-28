import { createPhotoDescriptions } from './create-content.js';
import { renderingThumbnails } from './rendering-thumbnails.js';
import { openFullSizeThumbnail } from './full-size-thumbnail.js';

const photoDescriptions = createPhotoDescriptions();
const picturesContainer = document.querySelector('.pictures');

const createGallery = () => {
  renderingThumbnails(photoDescriptions);

  picturesContainer.addEventListener('click', openFullSizeThumbnail);
};

export { createGallery, photoDescriptions };

import { createPhotoDescriptions } from './create-content.js';
import { renderingThumbnails } from './rendering-thumbnails.js';
import { openFullSizeThumbnail } from './full-size-thumbnail.js';

const PhotoDescriptionsArray = createPhotoDescriptions();
const picturesContainer = document.querySelector('.pictures');

const createGallery = () => {
  renderingThumbnails(PhotoDescriptionsArray);

  picturesContainer.addEventListener('click', openFullSizeThumbnail);
};

export { createGallery, PhotoDescriptionsArray };

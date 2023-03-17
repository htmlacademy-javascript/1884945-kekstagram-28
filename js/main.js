import { createPhotoDescriptions } from './create-content.js';
import { renderingThumbnails } from './rendering-thumbnails.js';
import './rendering-full-size-picture.js';

const PhotoDescriptionsArray = createPhotoDescriptions();
console.log(PhotoDescriptionsArray);
renderingThumbnails(PhotoDescriptionsArray);

export { PhotoDescriptionsArray };

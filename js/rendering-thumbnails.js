import { createPhotoDescriptions } from './create-content.js';

const thumbnails = document.querySelector('.pictures');

const thumbnailTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const randomThumbnails = createPhotoDescriptions();

const thumbnailsFragment = document.createDocumentFragment();

randomThumbnails.forEach(({ url, likes, comments }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnailsFragment.append(thumbnail);
});

thumbnails.append(thumbnailsFragment);

const renderingThumbnails = (array) => {
  const thumbnails = document.querySelector('.pictures');

  const thumbnailTemplate = document
    .querySelector('#picture')
    .content.querySelector('.picture');

  const thumbnailsFragment = document.createDocumentFragment();

  array.forEach(({ url, likes, comments, id }) => {
    const thumbnail = thumbnailTemplate.cloneNode(true);
    thumbnail.querySelector('.picture__img').src = url;
    thumbnail.querySelector('.picture__likes').textContent = likes;
    thumbnail.querySelector('.picture__comments').textContent = comments.length;
    thumbnail.id = id;
    thumbnailsFragment.append(thumbnail);
  });

  thumbnails.append(thumbnailsFragment);
};

export { renderingThumbnails };

import { PhotoDescriptionsArray } from './main.js';
const picturesContainer = document.querySelector('.pictures');
const fullSizePicture = document.querySelector('.big-picture');
const fullSizePictureImg = fullSizePicture.querySelector(
  '.big-picture__img img'
);
const likesCount = fullSizePicture.querySelector('.likes-count');
const commentsCount = fullSizePicture.querySelector('.comments-count');
const socialComments = fullSizePicture.querySelector('.social__comments');
const socialCaption = fullSizePicture.querySelector('.social__caption');

const onPictureClick = (evt) => {
  if (evt.target.className === 'picture__img') {
    const picture = evt.target.parentElement;
    const pictureLikesCount =
      picture.querySelector('.picture__likes').textContent;
    const pictureCommentsCount =
      picture.querySelector('.picture__comments').textContent;
    socialCaption.textContent = PhotoDescriptionsArray.find(
      (element) => element.id === Number(evt.target.parentElement.id)
    ).description;
    const commentsArray = PhotoDescriptionsArray.find(
      (element) => element.id === Number(evt.target.parentElement.id)
    ).comments;

    fullSizePictureImg.src = evt.target.src;
    likesCount.textContent = pictureLikesCount;
    commentsCount.textContent = pictureCommentsCount;

    socialComments.innerHTML = '';
    commentsArray.forEach(({ avatar, name, message }) => {
      socialComments.innerHTML += `<li class="social__comment">
      <img
          class="social__picture"
          src="${avatar}"
          alt="${name}"
          width="35" height="35">
      <p class="social__text">${message}</p>
  </li>`;
    });

    fullSizePicture.classList.remove('hidden');
  }
};

picturesContainer.addEventListener('click', onPictureClick);

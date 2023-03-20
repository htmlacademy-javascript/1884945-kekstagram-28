import { photoDescriptions } from './create-gallery.js';
import { isEscapeKey, isPictureImg, composeElement } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

const renderFullSizeThumbnail = (evt) => {
  if (isPictureImg(evt)) {
    const picture = evt.target.parentElement;
    const pictureLikesCount =
      picture.querySelector('.picture__likes').textContent;
    const pictureCommentsCount =
      picture.querySelector('.picture__comments').textContent;
    socialCaption.textContent = photoDescriptions.find(
      (element) => element.id === Number(evt.target.parentElement.id)
    ).description;
    const commentsArray = photoDescriptions.find(
      (element) => element.id === Number(evt.target.parentElement.id)
    ).comments;

    const createSocialComments = () => {
      const socialCommentsElements = [];
      commentsArray.forEach(({ avatar, name, message }) => {
        const socialComment = composeElement('li', 'social__comment');
        const socialPicture = composeElement('img', 'social__picture');
        const socialText = composeElement('p', 'social__text', message);
        socialPicture.src = avatar;
        socialPicture.alt = name;
        socialComment.appendChild(socialPicture);
        socialComment.appendChild(socialText);
        socialCommentsElements.push(socialComment);
        // socialComments.appendChild(socialComment);
      });
      return socialCommentsElements;
    };
    const renderSocialComments = (array) => {
      array.forEach((element) => socialComments.appendChild(element));
    };

    bigPictureImg.src = evt.target.src;
    likesCount.textContent = pictureLikesCount;
    commentsCount.textContent = pictureCommentsCount;

    socialComments.innerHTML = '';
    renderSocialComments(createSocialComments());
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullSizeThumbnail();
  }
};

// Для closeFullSizeThumbnail() используем function declaration, так как при использовании
// стрелочных функций получаем ошибку исползьзование функции до ее инициализации у
// onDocumentKeydown и closeFullSizeThumbnail
function closeFullSizeThumbnail() {
  bigPicture.classList.add('hidden');
  bigPictureCancel.removeEventListener('click', closeFullSizeThumbnail);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
}

const openFullSizeThumbnail = (evt) => {
  renderFullSizeThumbnail(evt);

  bigPicture.classList.remove('hidden');
  bigPictureCancel.addEventListener('click', closeFullSizeThumbnail);
  document.addEventListener('keydown', onDocumentKeydown);

  // После открытия окна спрячьте блоки счётчика комментариев .social__comment-count
  // и загрузки новых комментариев .comments-loader, добавив им класс hidden, с ними
  // мы разберёмся позже, в другом домашнем задании.
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  // После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с
  // фотографиями позади не прокручивался при скролле. При закрытии окна не забудьте
  // удалить этот класс.
  document.body.classList.add('modal-open');
};

export { openFullSizeThumbnail };

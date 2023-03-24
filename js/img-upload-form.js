import { isEscapeKey } from './util.js';

const uploadFileInput = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
const hashTagsInput = imgUploadOverlay.querySelector('.text__hashtags');
const commentTextArea = imgUploadOverlay.querySelector('.text__description');

const closeimgUploadOverlay = () => {
  imgUploadOverlay.classList.add('hidden');
  uploadFileInput.value = '';
  document.body.classList.remove('modal-open');
  imgUploadCancel.removeEventListener('click', closeimgUploadOverlay);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeimgUploadOverlay();
  }
}

const onUploadFileChange = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  imgUploadCancel.addEventListener('click', closeimgUploadOverlay);
  document.addEventListener('keydown', onDocumentKeydown);
};

uploadFileInput.addEventListener('change', onUploadFileChange);

// Валидация img-upload-form

import { isEscapeKey } from './util.js';

const uploadFileInput = document.querySelector('#upload-file');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
const hashTagsInput = imgUploadOverlay.querySelector('.text__hashtags');
const commentTextArea = imgUploadOverlay.querySelector('.text__description');
const pristine = new Pristine(imgUploadForm);

const closeimgUploadOverlay = () => {
  imgUploadOverlay.classList.add('hidden');
  uploadFileInput.value = '';
  document.body.classList.remove('modal-open');
  imgUploadCancel.removeEventListener('click', closeimgUploadOverlay);
  document.removeEventListener('keydown', onDocumentKeydown);
};
// function declaration для всплытия и возможности и использования onDocumentKeydown
// в closeimgUploadOverlay до объявления onDocumentKeydown.
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeimgUploadOverlay();
  }
}

const onUploadFileChange = () => {
  imgUploadOverlay.classList.remove('hidden');
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
  document.body.classList.add('modal-open');
  imgUploadCancel.addEventListener('click', closeimgUploadOverlay);
  document.addEventListener('keydown', onDocumentKeydown);
};

uploadFileInput.addEventListener('change', onUploadFileChange);

// Валидация img-upload-form
// Валидация hashTagsInput
const validateHashTags = (inputValue) => {
  const hashTags = inputValue.split(' ');
  return hashTags.forEach((element) => element[0] !== '#');
};

pristine.addValidator(
  hashTagsInput,
  validateHashTags,
  'Хештег должен начинаться на #'
);

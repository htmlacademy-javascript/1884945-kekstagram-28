import { isEscapeKey, cancelEscKeydown } from './util.js';
import { addScale, resetScale } from './scale-img.js';
import { addFilters, removeFilters } from './img-effects.js';
import { sendData } from './api.js';

const MAX_NUMBER_OF_HASHTAGS = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const uploadFileInput = document.querySelector('#upload-file');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
const hashTagsInput = imgUploadOverlay.querySelector('.text__hashtags');
const commentTextArea = imgUploadOverlay.querySelector('.text__description');
const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const closeimgUploadOverlay = () => {
  imgUploadOverlay.classList.add('hidden');
  uploadFileInput.value = '';
  document.body.classList.remove('modal-open');
  imgUploadCancel.removeEventListener('click', closeimgUploadOverlay);
  document.removeEventListener('keydown', onDocumentKeydown);
  hashTagsInput.removeEventListener('keydown', cancelEscKeydown);
  commentTextArea.removeEventListener('keydown', cancelEscKeydown);
  resetScale();
  imgUploadForm.reset();
  removeFilters();
};
// function declaration для всплытия и возможности и использования onDocumentKeydown
// в closeimgUploadOverlay до объявления onDocumentKeydown.
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeimgUploadOverlay();
  }
}

const openimgUploadOverlay = () => {
  imgUploadOverlay.classList.remove('hidden');
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      sendData(evt);
    }
  });
  document.body.classList.add('modal-open');
  imgUploadCancel.addEventListener('click', closeimgUploadOverlay);
  document.addEventListener('keydown', onDocumentKeydown);
  hashTagsInput.addEventListener('keydown', cancelEscKeydown);
  commentTextArea.addEventListener('keydown', cancelEscKeydown);
  addScale();
  addFilters();
};

uploadFileInput.addEventListener('change', openimgUploadOverlay);

// Валидация хэш-тэгов.
const prepareTagsToValidate = (inputValue) => {
  const hashTags = inputValue
    .trim()
    .split(' ')
    .filter((hashTag) => hashTag.trim().length);
  return hashTags;
};

const isValidNumberOfHashTags = (inputValue) => {
  const hashTags = prepareTagsToValidate(inputValue);
  return hashTags.length <= MAX_NUMBER_OF_HASHTAGS;
};

const isUniqueHashTag = (inputValue) => {
  const hashTags = prepareTagsToValidate(inputValue);
  const lowerCaseHashTags = hashTags.map((hashTag) => hashTag.toLowerCase());
  return lowerCaseHashTags.length === new Set(lowerCaseHashTags).size;
};

const isValidHashTag = (hashTag) => VALID_SYMBOLS.test(hashTag);

const isValidHashTags = (inputValue) => {
  const hashTags = prepareTagsToValidate(inputValue);
  return hashTags.every(isValidHashTag);
};

const viewRequirementsForVaildHashTag = () =>
  `Хэш-тэг должен соответсвовать следующим требованиям:<br>
  - хэш-тег начинается с символа # (решётка);<br>
  - строка после решётки должна состоять из букв и чисел и не может содержать пробелы,
    спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.),
    эмодзи и т. д.;<br>
  - хеш-тег не может состоять только из одной решётки;<br>
  - максимальная длина одного хэш-тега 20 символов, включая решётку.`;

pristine.addValidator(
  hashTagsInput,
  isValidNumberOfHashTags,
  'Нельзя указывать больше пяти хэш-тегов'
);

pristine.addValidator(
  hashTagsInput,
  isUniqueHashTag,
  'Один и тот же хэш-тег не может быть использован дважды'
);

pristine.addValidator(
  hashTagsInput,
  isValidHashTags,
  viewRequirementsForVaildHashTag()
);

export { closeimgUploadOverlay, onDocumentKeydown };

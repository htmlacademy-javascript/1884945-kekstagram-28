import { isEscapeKey } from './util.js';
import { onDocumentKeydown } from './img-upload-form.js';
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.margin = 'auto';
  alertContainer.style.width = '582px';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style['line-height'] = '50px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);
};

const closeSuccessMessage = (evt) => {
  if (
    evt.target.className === 'success' ||
    evt.target.className === 'success__button' ||
    isEscapeKey(evt)
  ) {
    document.querySelector('.success').remove();
    document.removeEventListener('keydown', closeSuccessMessage);
  }
};

const showSuccessMessage = () => {
  const successMessageTemplate = document
    .querySelector('#success')
    .content.querySelector('.success');
  const successMessage = successMessageTemplate.cloneNode(true);
  document.body.append(successMessage);
  successMessage.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', closeSuccessMessage);
};

const closeErrorMessage = (evt) => {
  if (
    evt.target.className === 'error' ||
    evt.target.className === 'error__button' ||
    isEscapeKey(evt)
  ) {
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', closeErrorMessage);
    document.addEventListener('keydown', onDocumentKeydown);
  }
};

const showErrorMessage = () => {
  const errorMessageTemplate = document
    .querySelector('#error')
    .content.querySelector('.error');
  const errorMessage = errorMessageTemplate.cloneNode(true);
  document.body.append(errorMessage);
  errorMessage.addEventListener('click', closeErrorMessage);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', closeErrorMessage);
};

export { showAlert, showSuccessMessage, showErrorMessage };

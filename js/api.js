import { showAlert, showSuccessMessage, showErrorMessage } from './messages.js';
import { closeimgUploadOverlay } from './img-upload-form.js';

const getData = () =>
  fetch('https://28.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      showAlert('Не удалось загрузить данные. Попробуйте обновить страницу');
    });

const sendData = (evt) => {
  const formData = new FormData(evt.target);
  fetch('https://28.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body: formData,
  })
    .then(() => {
      closeimgUploadOverlay();
      showSuccessMessage();
    })
    .catch(() => {
      showErrorMessage();
    });
};

export { getData, sendData };

import { showAlert } from './util.js';

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const getData = () =>
  fetch('https://28.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      showAlert(ErrorText.GET_DATA);
      throw new Error(ErrorText.GET_DATA);
    });

export { getData };

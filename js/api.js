import {renderThumbnails} from './thumbnail.js';
import {showAlert} from './util.js';
import {errorText, showSuccessWindow, showErrorWindow} from './success-error-message.js';

const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};


const getData = () => fetch(
  `${BASE_URL}${Route.GET_DATA}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .then((photos) => {
    renderThumbnails(photos);
  })
  .catch(() => {
    showAlert(errorText);
  });


const sendData = (body, onSucces) => fetch(
  `${BASE_URL}${Route.SEND_DATA}`,
  {
    method: 'POST',
    body,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    onSucces();
    showSuccessWindow();
  })
  .catch(() => {
    showErrorWindow();
  });

export {getData, sendData};

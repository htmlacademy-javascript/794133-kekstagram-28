import {onDocumentKeydown} from './form.js';

const errorText = 'Не удалось загрузить данные. Попробуйте обновить страницу';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successWindow = successTemplate.cloneNode(true);
const successBtn = successWindow.querySelector('.success__button');
const successInner = successWindow.querySelector('.success__inner');

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorWindow = errorTemplate.cloneNode(true);
const errorBtn = errorWindow.querySelector('.error__button');
const errorInner = errorWindow.querySelector('.error__inner');

// Закрытие окна успеха

const closeSuccessWindow = () => {
  successWindow.remove();
  document.removeEventListener('keydown', onSuccessKeydown);
  document.removeEventListener('click', onSuccessClick);
};

// Закрытие окна успеха по нажатию ESC

function onSuccessKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();

    closeSuccessWindow();
  }
}

// Закрытие окна успеха кликом по любой области

function onSuccessClick (evt) {
  if (evt.target !== successInner) {
    closeSuccessWindow();
  }
}

// Показ окна успеха

const showSuccessWindow = () => {
  document.body.append(successWindow);

  successBtn.addEventListener('click', () => {
    closeSuccessWindow();
  });

  document.addEventListener('keydown', onSuccessKeydown);
  document.addEventListener('click', onSuccessClick);
};

// Закрытие окна ошибки

const closeErrorWindow = () => {
  errorWindow.remove();
  document.removeEventListener('keydown', onErrorKeydown);
  document.removeEventListener('click', onErrorClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

// Закрытие окна ошибки по нажатию ESC

function onErrorKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();

    closeErrorWindow();
  }
}

// Закрытие окна ошибки кликом по любой области

function onErrorClick (evt) {
  if (evt.target !== errorInner) {
    closeErrorWindow();
  }
}

// Показ окна ошибки

const showErrorWindow = () => {
  document.body.append(errorWindow);

  errorBtn.addEventListener('click', () => {
    closeErrorWindow();
  });

  document.addEventListener('keydown', onErrorKeydown);
  document.addEventListener('click', onErrorClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

export {errorText, showSuccessWindow, showErrorWindow};

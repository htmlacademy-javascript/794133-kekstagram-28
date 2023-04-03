import {setDefaultScale} from './image-scale.js';
import {resetEffects} from './image-effects.js';
import {sendData} from './api.js';
import {showErrorWindow, showSuccessWindow} from './success-error-message.js';
import {uploadImg} from './image-scale.js';
import {isEscapeKeydown} from './util.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const SubmitButtonText = {
  INITIAL: 'Опубликовать',
  PUBLICATION: 'Публикую...',
};

const uploadFileInput = document.querySelector('#upload-file');
const uploadSelectImageForm = document.querySelector('#upload-select-image');
const imageOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = imageOverlay.querySelector('#upload-cancel');
const body = document.querySelector('body');
const hashtagInputField = document.querySelector('.text__hashtags');
const commentInputField = document.querySelector('.text__description');
const submitBtn = document.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadSelectImageForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent:'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const onModalOpen = () => {
  imageOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  setDefaultScale();

  document.addEventListener('keydown', onDocumentKeydown);
};

const onModalClose = () => {
  uploadSelectImageForm.reset();
  pristine.reset();
  resetEffects();
  imageOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onPreviewImgUpload = () => {
  const file = uploadFileInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    uploadImg.src = '';
    uploadImg.src = URL.createObjectURL(file);
  }
};

const isInputFieldInFocus = () => document.activeElement === hashtagInputField || document.activeElement === commentInputField;

function onDocumentKeydown (evt) {
  if (isEscapeKeydown && !isInputFieldInFocus()) {
    evt.preventDefault();

    onModalClose();
  }
}

const isValidHashtag = (string) => {
  if (string.length === 0) {
    return true;
  }
  const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/i;
  return hashtagPattern.test(string);
};

const checkStringValidHashtag = (string) => {
  const stringAsAnArray = string.trim().split(' ');
  return stringAsAnArray.every(isValidHashtag);
};

const checkStringForDublicateHashtags = (string) => {
  const stringAsAnArray = string.trim().split(' ');
  const uniqueElements = [];
  for (let i = 0; i < stringAsAnArray.length; i++) {
    if(!uniqueElements.includes(stringAsAnArray[i])) {
      uniqueElements.push(stringAsAnArray[i]);
    }
  }
  return uniqueElements.length === stringAsAnArray.length;
};

const checkCountHashtags = (string) => {
  const stringAsAnArray = string.trim().split(' ');
  return stringAsAnArray.length <= 5;
};

const checkCountInputChars = (string) => string.length <= 140;

pristine.addValidator(hashtagInputField, checkStringValidHashtag, 'Хэш-тег введен неверно');
pristine.addValidator(hashtagInputField, checkCountHashtags, 'Количество хэш-тегов больше 5');
pristine.addValidator(hashtagInputField, checkStringForDublicateHashtags, 'Хэш-теги повторяются');
pristine.addValidator(commentInputField, checkCountInputChars, 'Превышено количество введенных символов');

const blockSubmitButton = () => {
  submitBtn.disabled = true;
  submitBtn.textContent = SubmitButtonText.PUBLICATION;
};

const unblockSubmitButton = () => {
  submitBtn.disabled = false;
  submitBtn.textContent = SubmitButtonText.INITIAL;
};

const setUserFormSubmit = () => {
  uploadSelectImageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          onModalClose();
          showSuccessWindow();
        })
        .catch(() => {
          showErrorWindow();
        })
        .finally(unblockSubmitButton);
    }
  });
};

uploadFileInput.addEventListener('change', onModalOpen);
uploadFileInput.addEventListener('change', onPreviewImgUpload);
uploadCancel.addEventListener('click', onModalClose);

export {setUserFormSubmit, onDocumentKeydown};


import {renderBigPictureFullScreen} from './big-picture-full-size.js';

const photoContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesTitle = photoContainer.querySelector('.pictures__title');

picturesTitle.classList.remove('visually-hidden');

// Создание миниатюры фото

const createThumbnail = (picture) => {
  const thumbnail = photoTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = picture.url;
  thumbnail.querySelector('.picture__likes').textContent = picture.likes;
  thumbnail.querySelector('.picture__comments').textContent = picture.comments.length;

  thumbnail.addEventListener('click', () => {
    renderBigPictureFullScreen(picture);
  });
  return thumbnail;
};

// Генерация миниатюр

const renderThumbnails = (pictures) => {
  const photoGalleryFragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    photoGalleryFragment.append(createThumbnail(picture));
  });
  photoContainer.append(photoGalleryFragment);
};

export {renderThumbnails};

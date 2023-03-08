import {createPhotoGallery} from './data.js';

const photosContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photoGalleryFragment = document.createDocumentFragment();
const photoGallery = createPhotoGallery();

photoGallery.forEach(({url, likes, comments}) => {
  const photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoGalleryFragment.append(photoElement);
});

photosContainer.append(photoGalleryFragment);

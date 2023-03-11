import {createPhotoGallery} from './data.js';

const photoContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photoGallery = createPhotoGallery();

const createThumbnail = ({url, likes, comments}) => {
  const thumbnail = photoTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

const renderThumbnails = () => {
  const photoGalleryFragment = document.createDocumentFragment();
  photoGallery.forEach((photo) => {
    photoGalleryFragment.append(createThumbnail(photo));
  });
  photoContainer.append(photoGalleryFragment);
};

export {renderThumbnails};

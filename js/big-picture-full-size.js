import {isEscapeKeydown} from './util.js';

const bigPictureModal = document.querySelector('.big-picture');
const bigPictureImg = bigPictureModal.querySelector('.big-picture__img img');
const likesCount = bigPictureModal.querySelector('.likes-count');
const commentsCount = bigPictureModal.querySelector('.comments-count');
const closeBigPictureBtn = bigPictureModal.querySelector('.big-picture__cancel');
const socialCommentList = document.querySelector('.social__comments');
const socialComment = socialCommentList.querySelector('.social__comment');
const socialCommentCount = bigPictureModal.querySelector('.social__comment-count');
const socialCaption = bigPictureModal.querySelector('.social__caption');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');

const COMMENTS_COUNT = 5;
let currentCommentsCount = COMMENTS_COUNT;
let updateLoadMoreClick;

const openFullSizePhoto = () => {
  bigPictureModal.classList.remove('hidden');
  body.classList.add('modal-open');
  socialCommentList.innerHTML = '';

  document.addEventListener('keydown', onDocumentKeydown);
};

const closeFullSizePhoto = () => {
  bigPictureModal.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

closeBigPictureBtn.addEventListener('click', () => {
  closeFullSizePhoto();
});

function onDocumentKeydown (evt) {
  if (isEscapeKeydown) {
    evt.preventDefault();

    closeFullSizePhoto();
  }
}

const createCommentOnBigPhoto = (comment) => {
  const commentElement = socialComment.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};

const renderComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();
  comments.slice(0, currentCommentsCount).forEach((comment) => {
    commentsFragment.append(createCommentOnBigPhoto(comment));
  });
  socialCommentList.innerHTML = '';
  socialCommentList.append(commentsFragment);
  if (currentCommentsCount >= comments.length) {
    currentCommentsCount = comments.length;
    commentsLoader.classList.add('hidden');
    commentsLoader.removeEventListener('click', updateLoadMoreClick);
  } else {
    commentsLoader.classList.remove('hidden');
  }
  socialCommentCount.textContent = `${currentCommentsCount} из ${comments.length} комментариев`;
};

const renderBigPictureFullScreen = (picture) => {
  openFullSizePhoto();
  currentCommentsCount = COMMENTS_COUNT;
  bigPictureImg.src = picture.url;
  likesCount.textContent = picture.likes;
  socialCaption.textContent = picture.description;
  commentsCount.textContent = picture.comments.length;
  updateLoadMoreClick = () => {
    currentCommentsCount += COMMENTS_COUNT;
    renderComments(picture.comments);
  };
  commentsLoader.addEventListener('click', updateLoadMoreClick);
  renderComments(picture.comments);
};

export {renderBigPictureFullScreen};

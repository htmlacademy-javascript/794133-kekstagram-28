const bigPictureModal = document.querySelector('.big-picture');
const bigPictureImg = bigPictureModal.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPictureModal.querySelector('.likes-count');
const commentsCount = bigPictureModal.querySelector('.comments-count');
const btnCloseBigPicture = bigPictureModal.querySelector('.big-picture__cancel');
const socialCommentList = document.querySelector('.social__comments');
const socialComment = socialCommentList.querySelector('.social__comment');
const socialCommentCount = bigPictureModal.querySelector('.social__comment-count');
const socialCaption = bigPictureModal.querySelector('.social__caption');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');
const COMMENTS_TO_SHOW_INITIAL = 5;
let currentCommentsCount = COMMENTS_TO_SHOW_INITIAL;
let currentPicture;

// Открытие большого фото

const openFullSizePhoto = () => {
  bigPictureModal.classList.remove('hidden');
  body.classList.add('modal-open');
  socialCommentList.innerHTML = '';

  document.addEventListener('keydown', onDocumentKeydown);
};

// Функция закрытия большого фото

const closeFullSizePhoto = () => {
  bigPictureModal.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

// Закрытие фото кликом по кнопке закрытия

btnCloseBigPicture.addEventListener('click', () => {
  closeFullSizePhoto();
});

// Закрытие фото с помощью кнопки Esc

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();

    closeFullSizePhoto();
  }
}

// Создание комментария на большом фото

const createCommentOnBigPhoto = (comment) => {
  const commentElement = socialComment.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};

// Воспроизведение комментариев на большом фото

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

// Обновление комментариев при клике

function updateLoadMoreClick () {
  currentCommentsCount += COMMENTS_TO_SHOW_INITIAL;
  renderComments(currentPicture.comments);
}

// Воспроизведение большого фото

const renderBigPictureFullScreen = (picture) => {
  openFullSizePhoto();
  currentPicture = picture;
  currentCommentsCount = COMMENTS_TO_SHOW_INITIAL;
  bigPictureImg.src = picture.url;
  likesCount.textContent = picture.likes;
  socialCaption.textContent = picture.description;
  commentsCount.textContent = picture.comments.length;
  commentsLoader.addEventListener('click', updateLoadMoreClick);
  renderComments(picture.comments);
};

export {renderBigPictureFullScreen};

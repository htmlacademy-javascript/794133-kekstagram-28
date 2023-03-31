import {renderThumbnails} from './thumbnail.js';
import {debounce, sortRandom} from './util.js';

const TIMEOUT = 500;
const NUMBER_OF_PICTURES_TO_SHOW = 10;

const filterContainer = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const filterDefaultBtn = document.querySelector('#filter-default');
const filterRandomBtn = document.querySelector('#filter-random');
const filterDiscussedBtn = document.querySelector('#filter-discussed');

let currentBtn = filterDefaultBtn;

// Удаление изображений

const deletePictures = (pictures) => pictures.forEach((picture) => picture.remove());

// Сортировка по числу комментариев

const sortByCountComments = (a, b) => b.comments.length - a.comments.length;

// Применить фильтры к изображениям

const applyFilter = (pictures) => {
  if (currentBtn === filterDefaultBtn) {
    return pictures;
  } else if (currentBtn === filterRandomBtn) {
    return pictures.slice().sort(sortRandom).slice(0, NUMBER_OF_PICTURES_TO_SHOW);
  } else if (currentBtn === filterDiscussedBtn) {
    return pictures.slice().sort(sortByCountComments);
  }
};

// Фильтр по клику кнопки

const onFilterBtnClick = (evt, photos) => {
  const images = document.querySelectorAll('.picture');
  currentBtn.classList.remove('img-filters__button--active');
  currentBtn = evt.target;
  currentBtn.classList.add('img-filters__button--active');
  deletePictures(images);
  renderThumbnails(applyFilter(photos));
};

// Показ отфильтрованных изображений

const showFilteredPictures = (photos) => {
  filterContainer.classList.remove('img-filters--inactive');
  filterForm.addEventListener('click', debounce((evt) => {
    onFilterBtnClick(evt, photos);
  }, TIMEOUT));
};

export {showFilteredPictures};


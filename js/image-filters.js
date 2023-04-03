import {renderThumbnails} from './thumbnail.js';
import {debounce, sortRandom} from './util.js';

const TIMEOUT = 500;
const NUMBER_OF_PICTURES_TO_SHOW = 10;

const filterContainer = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const filterDefaultBtn = document.querySelector('#filter-default');
const filterRandomBtn = document.querySelector('#filter-random');
const filterDiscussedBtn = document.querySelector('#filter-discussed');

const showFilters = () => filterContainer.classList.remove('img-filters--inactive');

const removeThumbnails = (thumbnails) => thumbnails.forEach((thumbnail) => thumbnail.remove());

const sortByCommentCount = (a, b) => b.comments.length - a.comments.length;

const filterPhotos = (photos, filterBtn) => {
  if (filterBtn === filterDefaultBtn) {
    return photos;
  } else if (filterBtn === filterRandomBtn) {
    return photos.slice().sort(sortRandom).slice(0, NUMBER_OF_PICTURES_TO_SHOW);
  } else if (filterBtn === filterDiscussedBtn) {
    return photos.slice().sort(sortByCommentCount);
  }
};

const handleFilterButtonClick = (event, photos) => {
  const thumbnails = document.querySelectorAll('.picture');
  const filterBtn = event.target;
  filterDefaultBtn.classList.remove('img-filters__button--active');
  filterRandomBtn.classList.remove('img-filters__button--active');
  filterDiscussedBtn.classList.remove('img-filters__button--active');
  filterBtn.classList.add('img-filters__button--active');
  removeThumbnails(thumbnails);
  renderThumbnails(filterPhotos(photos, filterBtn));
};

const setupFiltering = (photos) => {
  filterForm.addEventListener('click', debounce((event) => {
    handleFilterButtonClick(event, photos);
  }, TIMEOUT));
};

export {setupFiltering, showFilters};

import {getData} from './api.js';
import {renderThumbnails} from './thumbnail.js';
import {showAlert} from './util.js';
import {setUserFormSubmit} from './form.js';
import {setupFiltering, showFilters} from './image-filters.js';

getData()
  .then((photos) => {
    renderThumbnails(photos);
    showFilters();
    setupFiltering(photos);
  })
  .catch((err) => {
    showAlert(err.message);
  });

setUserFormSubmit();

import {getData} from './api.js';
import {renderThumbnails} from './thumbnail.js';
import {showAlert} from './util.js';
import {setUserFormSubmit} from './form.js';
import {showFilteredPictures} from './image-filters.js';


getData()
  .then((photos) => {
    renderThumbnails(photos);
    showFilteredPictures(photos);
  })
  .catch((err) => {
    showAlert(err.message);
  });

setUserFormSubmit();

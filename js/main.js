import {getData} from './api.js';
import {renderThumbnails} from './thumbnail.js';
import {showAlert} from './util.js';
import {setUserFormSubmit} from './form.js';


getData()
  .then((photos) => {
    renderThumbnails(photos);
  })
  .catch((err) => {
    showAlert(err.message);
  });

setUserFormSubmit();

import {setUserFormSubmit, onCloseModal} from './form.js';
import {getData} from './api.js';

getData();

setUserFormSubmit(onCloseModal);

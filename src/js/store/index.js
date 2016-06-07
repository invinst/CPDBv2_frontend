import configureProd from './configureStore.prod';
import configureDev from './configureStore.dev';

let configureStore = configureProd;

if (global.DEVELOPMENT) {
  configureStore = configureDev;
}

export default configureStore;

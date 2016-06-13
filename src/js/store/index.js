import configureProd from './configureStore.prod';
import configureDev from './configureStore.dev';

let configureStore = configureProd;

if (global.DEVELOPMENT) {
  /* istanbul ignore next */
  configureStore = configureDev;
}

export default configureStore;

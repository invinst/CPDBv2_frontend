import configureProd from './configureStore.prod';
import configureDev from './configureStore.dev';

let configureStore = configureProd;

if (global.DEVELOPMENT) {
  /* istanbul ignore next */
  configureStore = configureDev;
}

let store;

export default (...args) => {
  store = store || configureStore(...args);
  return store;
};

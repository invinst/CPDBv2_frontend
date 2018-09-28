import configureProd from './configureStore.prod';
import configureDev from './configureStore.dev';
import config from 'config';

const localStorageVersion = localStorage.getItem('CPDB_LOCALSTORAGE_VERSION', null);
if (config.localStorageVersion !== localStorageVersion) {
  localStorage.clear();
  localStorage.setItem('CPDB_LOCALSTORAGE_VERSION', config.localStorageVersion);
}

let configureStore = configureProd;

if (config.appEnv === 'dev') {
  /* istanbul ignore next */
  configureStore = configureDev;
}

let store;

export default (...args) => {
  store = store || configureStore(...args);
  return store;
};

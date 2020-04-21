import { isEmpty } from 'lodash';


let appConfig = {};

export default {
  set: function (configs) {
    appConfig = {
      ...appConfig,
      ...configs,
    };
  },
  get: function (key, defaultValue) {
    return appConfig[key] || defaultValue;
  },
  isEmpty: () => isEmpty(appConfig),
  clear: function () {
    appConfig = {};
  },
};

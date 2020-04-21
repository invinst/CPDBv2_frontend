import { APP_CONFIG_FETCH_SUCCESS } from 'utils/constants';
import appConfig from 'utils/app-config';
import { APP_CONFIG_KEYS } from 'utils/constants';


const appConfigTransform = config => ({
  ...config,
  [APP_CONFIG_KEYS.PINBOARD_INTRODUCTION_DELAY]: parseInt(config[APP_CONFIG_KEYS.PINBOARD_INTRODUCTION_DELAY]),
});

const updateAppConfig = store => next => action => {
  if (action.type === APP_CONFIG_FETCH_SUCCESS) {
    appConfig.set(appConfigTransform(action.payload));
  }
  return next(action);
};

export default updateAppConfig;

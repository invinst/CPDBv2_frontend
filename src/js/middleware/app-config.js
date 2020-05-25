import { APP_CONFIG_FETCH_SUCCESS, APP_CONFIG_KEYS } from 'utils/constants';
import appConfig from 'utils/app-config';


const appConfigTransform = config => ({
  [APP_CONFIG_KEYS.PINBOARD_INTRODUCTION_DELAY]: parseInt(config[APP_CONFIG_KEYS.PINBOARD_INTRODUCTION_DELAY]),
  [APP_CONFIG_KEYS.VISUAL_TOKEN_COLORS]: (config[APP_CONFIG_KEYS.VISUAL_TOKEN_COLORS] || []).map(visualTokenColor => ({
    upper: visualTokenColor['upper_range'],
    lower: visualTokenColor['lower_range'],
    backgroundColor: visualTokenColor['color'],
    textColor: visualTokenColor['text_color'],
  })),
});

const updateAppConfig = store => next => action => {
  if (action.type === APP_CONFIG_FETCH_SUCCESS) {
    appConfig.set(appConfigTransform(action.payload));
  }
  return next(action);
};

export default updateAppConfig;

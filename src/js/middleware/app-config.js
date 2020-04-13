import { APP_CONFIG_FETCH_SUCCESS } from 'utils/constants';
import appConfig from 'utils/app-config';


const configCamelCaseTransform = config => {
  return {
    visualTokenColors: config['visual_token_colors'].map(visualTokenColor => ({
      upper: visualTokenColor['upper_range'],
      lower: visualTokenColor['lower_range'],
      backgroundColor: visualTokenColor['color'],
      textColor: visualTokenColor['text_color'],
    })),
  };
};

const updateAppConfig = store => next => action => {
  if (action.type === APP_CONFIG_FETCH_SUCCESS) {
    appConfig.set(configCamelCaseTransform(action.payload));
  }
  return next(action);
};

export default updateAppConfig;

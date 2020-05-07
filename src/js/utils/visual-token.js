import { find, pick } from 'lodash';

import { softBlackColor } from 'utils/styles';
import appConfig from 'utils/app-config';
import { APP_CONFIG_KEYS } from 'utils/constants';


export const getVisualTokenOIGBackground = (allegationPercentile) => {
  if (isNaN(allegationPercentile)) {
    return { textColor: softBlackColor };
  }
  const visualTokenColors = appConfig.get(APP_CONFIG_KEYS.VISUAL_TOKEN_COLORS, []);
  return pick(find(
    visualTokenColors,
    ({ lower, upper }) => {
      return allegationPercentile >= lower && allegationPercentile < upper;
    }
  ), ['backgroundColor', 'textColor']);
};

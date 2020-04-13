import { find, pick } from 'lodash';

import { softBlackColor } from 'utils/styles';
import appConfig from 'utils/app-config';


export const getVisualTokenOIGBackground = (allegationPercentile) => {
  if (isNaN(allegationPercentile)) {
    return { textColor: softBlackColor };
  }
  const visualTokenColors = appConfig.get('visualTokenColors', []);
  return pick(find(
    visualTokenColors,
    ({ lower, upper }) => {
      return allegationPercentile >= lower && allegationPercentile < upper;
    }
  ), ['backgroundColor', 'textColor']);
};

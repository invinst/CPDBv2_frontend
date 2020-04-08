import { find, pick } from 'lodash';

import { VISUAL_TOKEN_COLORS } from 'utils/constants';
import { softBlackColor } from 'utils/styles';


export const getVisualTokenOIGBackground = (allegationPercentile) => {
  if (isNaN(allegationPercentile)) {
    return { textColor: softBlackColor };
  }
  return pick(find(
    VISUAL_TOKEN_COLORS,
    ({ lower, upper }) => allegationPercentile >= lower && allegationPercentile < upper
  ), ['backgroundColor', 'textColor']);
};

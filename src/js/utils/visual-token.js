import { scaleThreshold } from 'd3-scale';
import _ from 'lodash';

import config from 'config';
import * as constants from 'utils/constants';

const crScale = scaleThreshold()
  .domain(constants.VISUAL_TOKEN_CR_DOMAIN).range(_.range(6));

export const getVisualTokenShade = cr =>
  constants.VISUAL_TOKEN_COLOR_SCHEME[`${crScale(cr)}0`];

export const getSvgUrl = officerId => {
  return `https://${config.visualTokenAccount}.blob.core.windows.net/visual-token/officer_${officerId}.svg`;
};

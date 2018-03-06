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

const scalePercentile = (val) => {
  return val > 50 ? 2 : (val > 0 ? 1 : 0);
};

export const getVisualTokenOIGBackground = (internalPercentile, civilPercentile, useOfForcePercentile) => {
  const { LIGHT_COLOR, DARK_COLOR, COLOR_TEXT_LIGHT_SCHEME } = constants.OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT;
  const key = [
    scalePercentile(internalPercentile),
    scalePercentile(civilPercentile),
    scalePercentile(useOfForcePercentile)
  ].join('');
  return {
    backgroundColor: constants.OIG_VISUAL_TOKEN_COLOR_SCHEME[key],
    textColor: COLOR_TEXT_LIGHT_SCHEME.indexOf(key) === -1 ? DARK_COLOR : LIGHT_COLOR,
  };
};

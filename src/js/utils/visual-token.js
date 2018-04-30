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

export const scalePercentile = (val) => {
  return val !== 0 ? parseInt((val - 0.0001) / 20) + 1: 0;
};

export const getVisualTokenOIGBackground = (internalPercentile, civilPercentile, useOfForcePercentile) => {
  const { LIGHT_COLOR, DARK_COLOR, COLOR_TEXT_LIGHT_SCHEME } = constants.OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT;
  const key = [
    scalePercentile(internalPercentile),
    scalePercentile(useOfForcePercentile)
  ].join('');
  return {
    backgroundColor: key !== '00' ?
      constants.OIG_VISUAL_TOKEN_COLOR_SCHEME[key] :
      constants.OIG_EXTRA_BLUE_COLOR_SCHEME[scalePercentile(civilPercentile)],
    textColor: COLOR_TEXT_LIGHT_SCHEME.indexOf(key) === -1 ? DARK_COLOR : LIGHT_COLOR,
  };
};

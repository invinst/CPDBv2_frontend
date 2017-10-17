import { scaleThreshold } from 'd3-scale';
import _ from 'lodash';

import * as constants from 'utils/constants';

const crScale = scaleThreshold().domain(constants.VISUAL_TOKEN_CR_DOMAIN).range(_.range(6));

export const getVisualTokenShade = cr =>
  constants.VISUAL_TOKEN_COLOR_SCHEME[`${crScale(cr)}0`];

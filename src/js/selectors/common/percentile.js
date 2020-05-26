import { pick, isEmpty } from 'lodash';

import { getVisualTokenOIGBackground } from 'utils/visual-token';

const PERCENTILE_FIELDS = [
  'percentile_allegation',
  'percentile_allegation_internal',
  'percentile_allegation_civilian',
  'percentile_trr',
];

export const extractLatestPercentile = (obj) => extractPercentile(pick(obj || {}, PERCENTILE_FIELDS));

export const extractPercentile = (percentile) => {
  if (isEmpty(percentile)) return {};

  const internalPercentile = parseFloat(percentile['percentile_allegation_internal']);
  const civilianPercentile = parseFloat(percentile['percentile_allegation_civilian']);
  const trrPercentile = parseFloat(percentile['percentile_trr']);
  const allegationPercentile = parseFloat(percentile['percentile_allegation']);
  const { backgroundColor, textColor } = getVisualTokenOIGBackground(allegationPercentile);
  const yearData = percentile['year'] ? { year: percentile['year'] } : {};

  return {
    ...yearData,
    items: [
      { axis: 'Use of Force Reports', value: trrPercentile },
      { axis: 'Officer Allegations', value: internalPercentile },
      { axis: 'Civilian Allegations', value: civilianPercentile },
    ],
    visualTokenBackground: backgroundColor,
    textColor,
  };
};

export const visualTokenBackground = (percentileAllegation) => {
  const { backgroundColor } = getVisualTokenOIGBackground(parseFloat(percentileAllegation));
  return backgroundColor;
};

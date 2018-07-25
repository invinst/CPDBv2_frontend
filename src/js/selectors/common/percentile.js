import { getVisualTokenOIGBackground } from 'utils/visual-token';


export const extractPercentile = (percentile) => {
  if (!percentile) return null;

  const internalPercentile = parseFloat(percentile['percentile_allegation_internal']);
  const civilianPercentile = parseFloat(percentile['percentile_allegation_civilian']);
  const trrPercentile = parseFloat(percentile['percentile_trr']);

  const { backgroundColor, textColor } = getVisualTokenOIGBackground(
    civilianPercentile,
    internalPercentile,
    trrPercentile
  );
  return {
    officerId: percentile['officer_id'],
    year: percentile['year'],
    items: [
      { axis: 'Use of Force Reports', value: trrPercentile },
      { axis: 'Internal Allegations', value: internalPercentile },
      { axis: 'Civilian Allegations', value: civilianPercentile }
    ],
    visualTokenBackground: backgroundColor,
    textColor,
  };
};

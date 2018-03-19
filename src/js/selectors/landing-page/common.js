import { toLower } from 'lodash';
import { getVisualTokenOIGBackground } from 'utils/visual-token';


export const extractPercentile = (percentile) => {
  if (!percentile) return null;
  const { backgroundColor, textColor } = getVisualTokenOIGBackground(
    parseFloat(percentile['percentile_internal']),
    parseFloat(percentile['percentile_civilian']),
    parseFloat(percentile['percentile_alL_trr'])
  );
  return {
    officerId: percentile['officer_id'],
    year: percentile['year'],
    items: [
      { axis: 'Use of Force Reports', value: parseFloat(percentile['percentile_alL_trr']) },
      { axis: 'Internal Allegations', value: parseFloat(percentile['percentile_internal']) },
      { axis: 'Civilian Allegations', value: parseFloat(percentile['percentile_civilian']) }
    ],
    visualTokenBackground: backgroundColor,
    textColor,
  };
};

export const cardTransform = card => ({
  id: card['id'],
  officerId: card['id'],
  fullName: card['full_name'],
  complaintCount: card['complaint_count'],
  sustainedCount: card['sustained_count'],
  complaintPercentile: card['complaint_percentile'],
  birthYear: card['birth_year'],
  race: toLower(card['race']),
  gender: toLower(card['gender']),
  percentile: extractPercentile(card['percentile']),
});


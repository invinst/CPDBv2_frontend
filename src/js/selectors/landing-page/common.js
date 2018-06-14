import { toLower } from 'lodash';
import { extractPercentile } from 'selectors/common/percentile';
import { ACTIVITY_GRID_CARD_TYPES } from 'utils/constants';


export const cardTransform = card => {
  if (card['type'] === null) {
    return officerCardTransform(card);
  } else if (card['type'] === ACTIVITY_GRID_CARD_TYPES.OFFICER) {
    return officerCardTransform(card);
  } else if (card['type'] === ACTIVITY_GRID_CARD_TYPES.PAIR) {
    return pairingCardTransform(card);
  }
};

const officerCardTransform = card => ({
  id: card['id'],
  officerId: card['id'],
  fullName: card['full_name'],
  complaintCount: card['complaint_count'],
  sustainedCount: card['sustained_count'],
  complaintPercentile: parseFloat(card['complaint_percentile']),
  birthYear: card['birth_year'],
  race: toLower(card['race']),
  gender: toLower(card['gender']),
  percentile: extractPercentile(card['percentile']),
  type: card['type'],
});

const simpleOfficerTransform = officer => ({
  id: officer['id'],
  fullName: officer['full_name'],
  birthYear: officer['birth_year'],
  race: officer['race'],
  gender: officer['gender'],
  percentile: {
    percentileAllegation: officer['percentile']['percentile_allegation'],
    percentileAllegationCivilian: officer['percentile']['percentile_allegation_civilian'],
    percentileAllegationInternal: officer['percentile']['percentile_allegation_internal'],
    percentileTrr: officer['percentile']['percentile_trr'],
  }
});

export const pairingCardTransform = card => ({
  type: card['type'],
  coaccusalCount: card['coaccusal_count'],
  officer1: simpleOfficerTransform(card['officer1']),
  officer2: simpleOfficerTransform(card['officer2'])
});

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

export const pairingCardTransform = card => ({
  type: card['type'],
  officer1: {
    id: card.officer1['id'],
    fullName: card.officer1['full_name'],
    birthYear: card.officer1['birth_year'],
    race: card.officer1['race'],
    gender: card.officer1['gender']
  },
  officer2: {
    id: card.officer2['id'],
    fullName: card.officer2['full_name'],
    birthYear: card.officer2['birth_year'],
    race: card.officer2['race'],
    gender: card.officer2['gender']
  }
});

import { get, groupBy, findIndex, keys, reverse, isEmpty, toLower } from 'lodash';
import { createSelector } from 'reselect';
import pluralize from 'pluralize';
import { extractPercentile } from 'selectors/common/percentile';


const getCoaccusals = (state) => get(state.officerPage.coaccusals, 'items', []);

const coaccusalTransform = (coaccusal) => ({
  id: coaccusal['id'],
  officerId: coaccusal['id'],
  fullName: coaccusal['full_name'],
  complaintCount: coaccusal['complaint_count'],
  sustainedCount: coaccusal['sustained_count'],
  complaintPercentile: parseFloat(coaccusal['complaint_percentile']),
  birthYear: coaccusal['birth_year'],
  race: coaccusal['race'] ? toLower(coaccusal['race']) : 'N/A',
  gender: coaccusal['gender'] ? toLower(coaccusal['gender']) : 'N/A',
  percentile: extractPercentile(coaccusal['percentile']),
  coaccusalCount: coaccusal['coaccusal_count'],
  rank: coaccusal['rank'],
});

const coaccusalThresholds = [1, 4, 9, 14, 20, -1];

const groups = reverse(coaccusalThresholds.map((threshold, index) => {
  const minThreshold = (index === 0) ? 1 : coaccusalThresholds[index - 1] + 1;
  const range =
    (threshold === -1) ?
      `${minThreshold}+`
      :
      (minThreshold === threshold) ?
        `${threshold}`
        :
        `${minThreshold}-${threshold}`;
  return {
    index,
    name: `COACCUSED ${range} ${pluralize('TIME', minThreshold)}`,
    minValue: minThreshold,
  };
}));

const mapCoaccusalToGroup = (coaccusal) => {
  const firstMatchGroup = findIndex(groups, (group) => group.minValue <= coaccusal.coaccusalCount);
  return groups[firstMatchGroup].name;
};

export const coaccusalGroupsSelector = createSelector(
  getCoaccusals,
  coaccusals => {
    const transformedCoaccusals = coaccusals.map(coaccusalTransform);
    const groupedCoaccusals = groupBy(transformedCoaccusals, mapCoaccusalToGroup);
    return keys(groupedCoaccusals).map((key) => ({ name: key, coaccusals: groupedCoaccusals[key] }));
  }
);

export const hasCoaccusalSelector = createSelector(
  getCoaccusals,
  coaccusals => !isEmpty(coaccusals)
);

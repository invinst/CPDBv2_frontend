import { get, groupBy, findIndex, keys, reverse, orderBy } from 'lodash';
import { createSelector } from 'reselect';
import pluralize from 'pluralize';

import { getThisYear } from 'utils/date';


const getCoaccusals = (state) => get(state.officerPage.coaccusals, 'items', []).map(coaccusalTransform);

const coaccusalTransform = (coaccusal) => ({
  officerId: coaccusal.id,
  officerName: coaccusal['full_name'],
  allegationCount: coaccusal['allegation_count'],
  sustainedCount: coaccusal['sustained_count'],
  allegationPercentile: coaccusal['complaint_percentile'],
  race: coaccusal.race.toLowerCase(),
  gender: coaccusal.gender.toLowerCase(),
  age: getThisYear() - coaccusal['birth_year'],
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

export const getCoaccusalGroups = createSelector(
  getCoaccusals,
  (coaccusals) => {
    const sortedCoaccusals = orderBy(coaccusals, 'coaccusalCount', 'desc');
    const groupedCoaccusals = groupBy(sortedCoaccusals, mapCoaccusalToGroup);
    return keys(groupedCoaccusals).map((key) => ({ name: key, coaccusals: groupedCoaccusals[key] }));
  }
);

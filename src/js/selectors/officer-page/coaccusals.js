import { get, groupBy, findIndex, keys, reverse, isEmpty } from 'lodash';
import { createSelector } from 'reselect';
import pluralize from 'pluralize';

import { getThisYear } from 'utils/date';
import { getVisualTokenOIGBackground } from 'utils/visual-token';


const getCoaccusals = (state) => get(state.officerPage.coaccusals, 'items', []);

const coaccusalTransform = (coaccusal) => ({
  officerId: coaccusal.id,
  officerName: coaccusal['full_name'],
  allegationCount: coaccusal['allegation_count'],
  sustainedCount: coaccusal['sustained_count'],
  allegationPercentile: coaccusal['complaint_percentile'],
  race: coaccusal.race.toLowerCase(),
  gender: coaccusal.gender.toLowerCase(),
  age: coaccusal['birth_year'] ? getThisYear() - coaccusal['birth_year'] : 'N/A',
  coaccusalCount: coaccusal['coaccusal_count'],
  rank: coaccusal['rank'],
  radarAxes: [
      { axis: 'trr', value: parseFloat(coaccusal['percentile_trr']) },
      { axis: 'internal', value: parseFloat(coaccusal['percentile_allegation_internal']) },
      { axis: 'civilian', value: parseFloat(coaccusal['percentile_allegation_civilian']) }],
  radarColor: getVisualTokenOIGBackground(
    parseFloat(coaccusal['percentile_allegation_civilian']),
    parseFloat(coaccusal['percentile_allegation_internal']),
    parseFloat(coaccusal['percentile_trr'])
  )
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

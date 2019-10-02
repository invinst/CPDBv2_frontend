import { get, groupBy, findIndex, keys, reverse, isEmpty } from 'lodash';
import { createSelector } from 'reselect';
import pluralize from 'pluralize';

import { officerCardTransform } from 'selectors/common/officer-card';
import { isItemPinned, pinboardItemsSelector } from 'selectors/pinboard-page/pinboard';
import { PINNED_ITEM_TYPES } from 'utils/constants';


const getCoaccusals = (state) => get(state.officerPage.coaccusals, 'items', []);

const pinnedCoaccusalsSelector = createSelector(
  getCoaccusals,
  pinboardItemsSelector,
  (coaccusals, pinboardItems) => coaccusals.map(item => ({
    ...item,
    isPinned: isItemPinned(PINNED_ITEM_TYPES.OFFICER, item.id, pinboardItems),
  }))
);

const coaccusalTransform = coaccusal => ({
  ...officerCardTransform(coaccusal),
  coaccusalCount: coaccusal['coaccusal_count'],
  isPinned: coaccusal.isPinned,
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
  pinnedCoaccusalsSelector,
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

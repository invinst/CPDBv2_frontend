import { createSelector } from 'reselect';
import { flatten, get, map } from 'lodash';


const searchTermsSelector = state => state.searchPage.searchTerms;
const getSearchTermsNavigationIndex = state => state.searchPage.searchTerms.navigation.itemIndex;

export const hiddenSelector = createSelector(searchTermsSelector, searchTerms => searchTerms.hidden);

export const navigationItemsSelector = createSelector(
  searchTermsSelector, searchTerms => map(searchTerms.categories, 'name')
);

export const categoriesSelector = createSelector(
  searchTermsSelector, searchTerms => searchTerms.categories
);

const flattenItems = createSelector(
  categoriesSelector,
  categories => {
    return flatten(categories.map(category => {
      const items = map(category.items, item => ({ ...item, type: category.name }));
      return [
        { id: category.name, name: category.name, type: 'category' },
        ...items,
      ];
    }));
  }
);

const rawFocusedItemSelector = createSelector(
  flattenItems,
  getSearchTermsNavigationIndex,
  (itemsList, itemIndex) => {
    if (itemsList[itemIndex] !== undefined) {
      return itemsList[itemIndex];
    }
    return itemsList[0];
  }
);

const navigationItemTransform = item => {
  if (item === undefined) {
    return {};
  }
  return {
    id: item.id,
    name: item.name,
    description: get(item, 'description', ''),
    callToActionType: get(item, 'call_to_action_type', ''),
    link: get(item, 'link', ''),
    type: item.type,
    uniqueKey: `${item.type}-${item.id}`,
  };
};

export const focusedItemSelector = createSelector(
  rawFocusedItemSelector,
  navigationItemTransform
);

export const totalItemCountSelector = createSelector(
  flattenItems,
  (itemsList) => itemsList.length
);

import { createSelector } from 'reselect';
import { each, toPairs, includes, compact } from 'lodash';


export const getBreadcrumbItems = state => state.breadcrumb.breadcrumbItems;

const breadcrumbItemKeyTransform = key => {
  const fragments = compact(key.split('/')).filter(value => value != 'edit');
  return `/${fragments.join('/')}/`;
};

const getBreadcrumbItemKey = (state, props) => breadcrumbItemKeyTransform(props.url);

const getBreadcrumbMapping = state => state.breadcrumb.breadcrumbsMapping;

const getBreadcrumbText = (breadcrumbItemKey, mapping) => {
  let result = undefined;
  each(toPairs(mapping), ([key, val]) => {
    if (includes(breadcrumbItemKey, key)) {
      result = val;
      return false;
    }
  });
  return result;
};

export const breadcrumbTextSelector = createSelector(
  getBreadcrumbItemKey,
  getBreadcrumbMapping,
  getBreadcrumbText,
);

export const breadcrumbItemsSelector = createSelector(
  getBreadcrumbItems,
  getBreadcrumbMapping,
  (breadcrumbItems, mapping) => {
    const results = [];

    const breadcrumbItemsLength = breadcrumbItems.length;
    each(breadcrumbItems, (item, index) => {
      const breadcrumbItemKey = breadcrumbItemKeyTransform(item);
      const breadcrumbText = getBreadcrumbText(breadcrumbItemKey, mapping);
      if (breadcrumbText) {
        results.push({
          path: item,
          text: breadcrumbText,
          isCurrent: index === breadcrumbItemsLength - 1,
        });
      }
    });
    return results;
  }
);

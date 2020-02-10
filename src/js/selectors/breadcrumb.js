import { createSelector } from 'reselect';
import { each, toPairs, includes, compact, get } from 'lodash';
import { BREADCRUMB_DEFAULT_MAPPING } from 'utils/constants';


export const getBreadcrumbItems = state => get(state, 'breadcrumb.breadcrumbItems', []);

const breadcrumbItemKeyTransform = key => {
  const fragments = compact(key.split('/')).filter(value => value != 'edit');
  return `/${fragments.join('/')}/`;
};

const getBreadcrumbMapping = state => {
  const breadcrumbMapping = get(state, 'breadcrumb.breadcrumbMapping', {});
  return { ...breadcrumbMapping, ...BREADCRUMB_DEFAULT_MAPPING };
};

const getBreadcrumbText = (pathname, mapping) => {
  const breadcrumbItemKey = breadcrumbItemKeyTransform(pathname);
  let result = undefined;
  each(toPairs(mapping), ([key, val]) => {
    if (includes(breadcrumbItemKey, key)) {
      result = val;
      return false;
    }
  });
  return result;
};

export const breadcrumbItemsSelector = createSelector(
  getBreadcrumbItems,
  getBreadcrumbMapping,
  (breadcrumbItems, mapping) => {
    const results = [];

    const breadcrumbItemsLength = breadcrumbItems.length;
    each(breadcrumbItems, (item, index) => {
      const breadcrumbText = getBreadcrumbText(item, mapping);
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

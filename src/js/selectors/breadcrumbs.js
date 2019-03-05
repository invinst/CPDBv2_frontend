import { createSelector } from 'reselect';
import * as _ from 'lodash';


export const getBreadcrumb = state => state.breadcrumb;

const breadcrumbItemKeyTransform = key => {
  const fragments = _.compact(key.split('/')).filter(value => value != 'edit');
  return `/${fragments.join('/')}/`;
};

const getBreadcrumbItemKey = (state, props) => breadcrumbItemKeyTransform(props.url);

const getBreadcrumbMapping = state => state.breadcrumbsMapping;

export const breadcrumbTextSelector = createSelector(
  getBreadcrumbItemKey,
  getBreadcrumbMapping,
  (breadcrumbItemKey, mapping) => {
    let result = undefined;
    _.each(_.toPairs(mapping), ([key, val]) => {
      if (_.includes(breadcrumbItemKey, key)) {
        result = val;
        return false;
      }
    });
    return result;
  }
);

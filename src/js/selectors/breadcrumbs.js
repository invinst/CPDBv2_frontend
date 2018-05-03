import { createSelector } from 'reselect';
import { compact } from 'lodash';


export const getBreadcrumb = state => state.breadcrumb;

const breadcrumbItemKeyTransform = key => {
  const fragments = compact(key.split('/')).filter(value => value != 'edit');
  return `/${fragments[0]}/${fragments[1]}/`;
};

const getBreadcrumbItemKey = (state, props) => breadcrumbItemKeyTransform(props.url);

const getBreadcrumbMapping = state => state.breadcrumbsMapping;

export const breadcrumbTextSelector = createSelector(
  getBreadcrumbItemKey,
  getBreadcrumbMapping,
  (breadcrumbItemKey, mapping) => mapping[breadcrumbItemKey]
);

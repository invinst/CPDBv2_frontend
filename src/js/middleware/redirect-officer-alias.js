import { reset as resetBreadcrumb } from 'redux-breadcrumb-trail';
import { kebabCase, invert, has } from 'lodash';

import { getOfficerId } from 'utils/location';
import { OFFICER_SUMMARY_REQUEST_SUCCESS, OFFICER_PAGE_TAB_ROUTE, CHANGE_OFFICER_TAB } from 'utils/constants';
import { getBreadcrumb } from 'selectors/breadcrumbs';
import { changeOfficerTab } from 'actions/officer-page';
import { updatePathName } from 'actions/path-name';


const officerURLRegex = /(officer\/\d+)\/([\w-]+?)\/([\w-]+)?/;

const getTabName = (pathname, correctOfficerName) => {
  const matches = officerURLRegex.exec(pathname) || [];
  const officerName = matches[2];
  const tabName = matches[3] || (officerName !== correctOfficerName ? officerName : '');
  return tabName in OFFICER_PAGE_TAB_ROUTE ? tabName : '';
};

const getOfficerURLWithoutTabName = (pathname) => {
  const matches = officerURLRegex.exec(pathname) || [];
  return matches[3] ? `/${matches.slice(1, 3).join('/')}/` : pathname;
};


const redirectOfficerAliasMiddleware = store => next => action => {
  if (action.type === OFFICER_SUMMARY_REQUEST_SUCCESS) {
    const state = store.getState();
    let officerId = getOfficerId(action.request.url);
    let fullnameSlug = kebabCase(action.payload['full_name']);
    if (officerId !== action.payload.id) {
      officerId = parseInt(action.payload.id);
    }

    const tabName = getTabName(state.pathname, fullnameSlug);
    if (tabName) {
      store.dispatch(changeOfficerTab(OFFICER_PAGE_TAB_ROUTE[tabName]));
    }

    const tabNameSuffix = tabName ? `${tabName}/` : '';
    const officerPath = `/officer/${officerId}/${fullnameSlug}/${tabNameSuffix}`;
    store.dispatch(updatePathName(officerPath));

    const { breadcrumbs } = getBreadcrumb(state);
    const breadcrumbLen = breadcrumbs.length;
    const officerBreadcrumb = breadcrumbs[breadcrumbLen - 1];

    officerBreadcrumb.location.pathname = officerPath;
    officerBreadcrumb.params.officerId = officerId;
    officerBreadcrumb.params.fullName = fullnameSlug;
    officerBreadcrumb.url = officerPath;

    store.dispatch(resetBreadcrumb({ breadcrumbs }));
  }
  if (action.type === '@@redux-breadcrumb-trail/PUSH' && has(action.payload.params, 'officerId')) {
    action.payload.params.officerId = parseInt(action.payload.params.officerId);
  }
  if (action.type === CHANGE_OFFICER_TAB) {
    const tabName = invert(OFFICER_PAGE_TAB_ROUTE)[action.payload];
    const officerURLWithoutTabName = getOfficerURLWithoutTabName(store.getState().pathname);
    const officerPath = tabName ? `${officerURLWithoutTabName}${tabName}/` : officerURLWithoutTabName;
    store.dispatch(updatePathName(officerPath));
  }
  return next(action);
};

export default redirectOfficerAliasMiddleware;

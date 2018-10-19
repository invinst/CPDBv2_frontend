import { reset as resetBreadcrumb } from 'redux-breadcrumb-trail';
import { kebabCase } from 'lodash';

import { getOfficerId } from 'utils/location';
import { OFFICER_SUMMARY_REQUEST_SUCCESS } from 'utils/constants';
import { getBreadcrumb } from 'selectors/breadcrumbs';


const redirectOfficerAliasMiddelware = store => next => action => {
  if (action.type === OFFICER_SUMMARY_REQUEST_SUCCESS) {
    const state = store.getState();
    let officerId = getOfficerId(action.request.url);
    let fullnameSlug = kebabCase(action.payload['full_name']);
    if (officerId !== action.payload.id) {
      officerId = parseInt(action.payload.id);
    }
    const officerPath = `/officer/${officerId}/${fullnameSlug}/`;

    global.history.replaceState(global.history.state, document.title, officerPath);

    const { breadcrumbs } = getBreadcrumb(state);
    const breadcrumbLen = breadcrumbs.length;
    const officerBreadcrumb = breadcrumbs[breadcrumbLen - 1];

    officerBreadcrumb.location.pathname = officerPath;
    officerBreadcrumb.params.officerId = officerId;
    officerBreadcrumb.params.fullName = fullnameSlug;
    officerBreadcrumb.url = officerPath;

    store.dispatch(resetBreadcrumb({ breadcrumbs }));
  }
  if (action.type === '@@redux-breadcrumb-trail/PUSH') {
    action.payload.params.officerId = parseInt(action.payload.params.officerId);
  }
  return next(action);
};

export default redirectOfficerAliasMiddelware;

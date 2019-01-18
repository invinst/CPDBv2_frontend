import { keys, includes } from 'lodash';

import { getOfficerId } from 'utils/location';
import {
  OFFICER_FETCH_ZIP_FILE_URL_REQUEST_SUCCESS,
  OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_SUCCESS,
} from 'utils/constants';
import { fetchOfficerZipFileUrl, fetchOfficerZipWithDocsFileUrl } from 'actions/officer-page';

const MAX_RETRIES = 60;

const actionMap = {
  [OFFICER_FETCH_ZIP_FILE_URL_REQUEST_SUCCESS]: fetchOfficerZipFileUrl,
  [OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_SUCCESS]: fetchOfficerZipWithDocsFileUrl,
};

const retryOfficerDownloadMiddleware = store => next => action => {
  if (includes(keys(actionMap), action.type)) {
    const officerId = getOfficerId(action.request.url);
    const counter = action.request.params['retry-counter'];
    if (!action.payload && action.counter < MAX_RETRIES) {
      const retryAction = actionMap[action.type];
      setTimeout(
        () => store.dispatch(retryAction(officerId, counter + 1)),
        1000
      );
    }
  }
  return next(action);
};

export default retryOfficerDownloadMiddleware;

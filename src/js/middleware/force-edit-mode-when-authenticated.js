import { isNil, some } from 'lodash';

import { updatePathName } from 'actions/path-name';
import { PAGE_LOAD_START } from 'utils/constants';
import { isSignedInFromCookie } from 'utils/authentication';

const FORCED_PAGE_REGEXES = [
  /^\/document\/\d+\/$/,
];

const forceEditModeWhenAuthenticated = store => next => action => {
  if (action.type === PAGE_LOAD_START) {
    const state = store.getState();

    const matched = some(FORCED_PAGE_REGEXES, regex => !isNil(regex.exec(state.pathname)));

    if (matched && isSignedInFromCookie()) {
      store.dispatch(updatePathName(`/edit${ state.pathname }`));
    }
  }
  return next(action);
};

export default forceEditModeWhenAuthenticated;

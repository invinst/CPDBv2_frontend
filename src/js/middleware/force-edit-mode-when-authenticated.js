import { isNil, isEmpty, some } from 'lodash';

import { updatePathName } from 'actions/path-name';
import { PAGE_LOAD_START } from 'utils/constants';
import Cookies from 'js-cookie';

const FORCED_PAGE_REGEXES = [
  /^\/document\/\d+\/$/,
];

const forceEditModeWhenAuthenticated = store => next => action => {
  if (action.type === PAGE_LOAD_START) {
    const state = store.getState();

    const matched = some(FORCED_PAGE_REGEXES, regex => !isNil(regex.exec(state.pathname)));
    const isSignedIn = !isEmpty(Cookies.get('apiAccessToken'));

    if (matched && isSignedIn) {
      store.dispatch(updatePathName(`/edit${ state.pathname }`));
    }
  }
  return next(action);
};

export default forceEditModeWhenAuthenticated;

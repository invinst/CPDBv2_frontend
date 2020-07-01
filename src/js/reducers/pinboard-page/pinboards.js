import { handleActions } from 'redux-actions';
import { filter } from 'lodash';

import { PINBOARDS_FETCH_REQUEST_SUCCESS, REMOVE_PINBOARD_REQUEST_SUCCESS } from 'utils/constants';
import { getPinboardIdFromRequestUrl } from 'utils/pinboard';

export default handleActions({
  [PINBOARDS_FETCH_REQUEST_SUCCESS]: (state, action) => action.payload,
  [REMOVE_PINBOARD_REQUEST_SUCCESS]: (state, action) => {
    const removedPinboardId = getPinboardIdFromRequestUrl(action.request.url);
    return filter(state, ({ id: pinboardId }) => pinboardId !== removedPinboardId);
  },
}, []);

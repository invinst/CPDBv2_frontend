import { handleActions } from 'redux-actions';

import { UPDATE_SHAREABLE_PAGE_SCROLL_POSITION } from 'utils/constants';


export default handleActions({
  [UPDATE_SHAREABLE_PAGE_SCROLL_POSITION]: (state, action) => {
    return action.payload;
  }
}, null);

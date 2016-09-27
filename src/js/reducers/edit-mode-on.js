import { handleActions } from 'redux-actions';

import {
  TURN_ON_EDIT_MODE, TURN_OFF_EDIT_MODE
} from 'actions/inline-editable/edit-mode';


export default handleActions({
  [TURN_ON_EDIT_MODE]: (state, action) => (true),
  [TURN_OFF_EDIT_MODE]: (state, action) => (false)
}, false);

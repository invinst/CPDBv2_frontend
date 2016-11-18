import { handleActions } from 'redux-actions';

import { TURN_ON_SECTION_EDIT_MODE, TURN_OFF_SECTION_EDIT_MODE, ABOUT } from 'actions/landing-page';


const editModeOn = handleActions({
  [TURN_ON_SECTION_EDIT_MODE]: (state, action) => (action.payload === ABOUT ? true : state),
  [TURN_OFF_SECTION_EDIT_MODE]: (state, action) => (action.payload === ABOUT ? false : state)
}, false);

export default editModeOn;

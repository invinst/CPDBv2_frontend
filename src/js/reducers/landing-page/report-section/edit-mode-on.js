import { handleActions } from 'redux-actions';

import { TURN_ON_SECTION_EDIT_MODE, TURN_OFF_SECTION_EDIT_MODE, REPORTING } from 'actions/landing-page';


const editModeOn = handleActions({
  [TURN_ON_SECTION_EDIT_MODE]: (state, action) => (action.payload === REPORTING ? true : state),
  [TURN_OFF_SECTION_EDIT_MODE]: (state, action) => (action.payload === REPORTING ? false : state)
}, false);

export default editModeOn;

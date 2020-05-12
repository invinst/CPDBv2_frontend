import { handleActions } from 'redux-actions';

import { VISIT_PIN_BUTTON_INTRODUCTION } from 'utils/constants';

export default handleActions({
  [VISIT_PIN_BUTTON_INTRODUCTION]: (state, action) => true,
}, false);

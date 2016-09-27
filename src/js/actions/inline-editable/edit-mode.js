import { createAction } from 'redux-actions';

export const TURN_ON_EDIT_MODE = 'TURN_ON_EDIT_MODE';
export const TURN_OFF_EDIT_MODE = 'TURN_OFF_EDIT_MODE';

export const turnOnEditMode = createAction(TURN_ON_EDIT_MODE);
export const turnOffEditMode = createAction(TURN_OFF_EDIT_MODE);

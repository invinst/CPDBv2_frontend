import { createAction } from 'redux-actions';

import * as constants from 'utils/constants';


export const turnOnLogoSectionEditMode = createAction(constants.TURN_ON_LOGO_EDIT_MODE);

export const turnOffLogoSectionEditMode = createAction(constants.TURN_OFF_LOGO_EDIT_MODE);

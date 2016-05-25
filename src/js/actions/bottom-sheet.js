import { createAction } from 'redux-actions';


export const OPEN_BOTTOM_SHEET = 'OPEN_BOTTOM_SHEET';
export const CLOSE_BOTTOM_SHEET = 'CLOSE_BOTTOM_SHEET';

export const openBottomSheet = createAction(OPEN_BOTTOM_SHEET);
export const closeBottomSheet = createAction(CLOSE_BOTTOM_SHEET);

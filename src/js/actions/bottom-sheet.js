import { createAction } from 'redux-actions';


export const OPEN_BOTTOM_SHEET_WITH_REPORT = 'OPEN_BOTTOM_SHEET_WITH_REPORT';
export const OPEN_BOTTOM_SHEET_WITH_FAQ = 'OPEN_BOTTOM_SHEET_WITH_FAQ';
export const CLOSE_BOTTOM_SHEET = 'CLOSE_BOTTOM_SHEET';

export const REPORT_TYPE = 'REPORT_TYPE';
export const FAQ_TYPE = 'FAQ_TYPE';

export const openBottomSheetWithReport = createAction(OPEN_BOTTOM_SHEET_WITH_REPORT);
export const openBottomSheetWithFAQ = createAction(OPEN_BOTTOM_SHEET_WITH_FAQ);
export const closeBottomSheet = createAction(CLOSE_BOTTOM_SHEET);

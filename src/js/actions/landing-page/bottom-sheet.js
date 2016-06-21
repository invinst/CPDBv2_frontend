import { createAction } from 'redux-actions';


export const OPEN_BOTTOM_SHEET_WITH_STORY = 'OPEN_BOTTOM_SHEET_WITH_STORY';
export const CLOSE_BOTTOM_SHEET = 'CLOSE_BOTTOM_SHEET';

export const STORY_TYPE = 'story';

export const openBottomSheetWithStory = createAction(OPEN_BOTTOM_SHEET_WITH_STORY);
export const closeBottomSheet = createAction(CLOSE_BOTTOM_SHEET);

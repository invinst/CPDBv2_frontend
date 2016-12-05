import { STORIES_PATH } from 'utils/constants';
import {
  OPEN_BOTTOM_SHEET_WITH_REPORT, CLOSE_BOTTOM_SHEET, OPEN_BOTTOM_SHEET_TO_CREATE_REPORT
} from 'actions/bottom-sheet';
import { pushPathPreserveEditMode } from 'utils/edit-path';


export default store => next => action => {
  if (action.type === OPEN_BOTTOM_SHEET_WITH_REPORT) {
    pushPathPreserveEditMode(`/${STORIES_PATH}${action.payload}/`);
  }

  if (action.type === OPEN_BOTTOM_SHEET_TO_CREATE_REPORT) {
    pushPathPreserveEditMode(`/${STORIES_PATH}new/`);
  }

  if (action.type === CLOSE_BOTTOM_SHEET) {
    const { appContent } = store.getState();
    pushPathPreserveEditMode(appContent);
  }
  return next(action);
};

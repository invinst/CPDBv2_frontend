import {
  STORIES_PATH, FAQ_PATH, OPEN_BOTTOM_SHEET_WITH_REPORT, CLOSE_BOTTOM_SHEET, OPEN_BOTTOM_SHEET_TO_CREATE_REPORT,
  OPEN_BOTTOM_SHEET_WITH_FAQ, OPEN_BOTTOM_SHEET_TO_CREATE_FAQ, OPEN_BOTTOM_SHEET_WITH_OFFICER,
  OPEN_BOTTOM_SHEET_WITH_COMPLAINT
} from 'utils/constants';
import { pushPathPreserveEditMode } from 'utils/edit-path';


export default store => next => action => {
  if (action.type === OPEN_BOTTOM_SHEET_WITH_REPORT) {
    const report = action.payload;
    pushPathPreserveEditMode(`/${STORIES_PATH}${report.id}/`);
  }

  if (action.type === OPEN_BOTTOM_SHEET_TO_CREATE_REPORT) {
    pushPathPreserveEditMode(`/${STORIES_PATH}new/`);
  }

  if (action.type === OPEN_BOTTOM_SHEET_WITH_FAQ) {
    pushPathPreserveEditMode(`/${FAQ_PATH}${action.payload}/`);
  }

  if (action.type === OPEN_BOTTOM_SHEET_TO_CREATE_FAQ) {
    pushPathPreserveEditMode(`/${FAQ_PATH}new/`);
  }

  if (action.type === OPEN_BOTTOM_SHEET_WITH_OFFICER) {
    pushPathPreserveEditMode(`/officer/${action.payload}/`);
  }

  if (action.type === OPEN_BOTTOM_SHEET_WITH_COMPLAINT) {
    pushPathPreserveEditMode(`/complaint/${action.payload.crid}/${action.payload.officerId}/`);
  }

  if (action.type === CLOSE_BOTTOM_SHEET) {
    const { appContent } = store.getState();
    pushPathPreserveEditMode(appContent);
  }
  return next(action);
};

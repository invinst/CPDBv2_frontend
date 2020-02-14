import { SEARCH_PATH, OPEN_SEARCH_PAGE, SEARCH_ALIAS_EDIT_PATH } from 'utils/constants';
import { UPDATE_ALIAS_REQUEST_SUCCESS } from 'actions/inline-alias-admin-page';
import { pushPathPreserveEditMode } from 'utils/edit-path';


export default store => next => action => {
  if (action.type === OPEN_SEARCH_PAGE) {
    pushPathPreserveEditMode(SEARCH_PATH);
  }

  // Go back if success
  if (action.type === UPDATE_ALIAS_REQUEST_SUCCESS) {
    pushPathPreserveEditMode(SEARCH_ALIAS_EDIT_PATH);
  }
  return next(action);
};

import { push } from 'react-router-redux';

import { editModeOn } from 'selectors/edit-mode-on';
import { editMode } from 'utils/edit-path';


export const TOGGLE_EDIT_MODE = 'TOGGLE_EDIT_MODE';

export const toggleEditMode = pathName => {
  let nextPathName;
  const isEditModeOn = editModeOn(pathName);

  if (isEditModeOn) {
    nextPathName = pathName.substring(5);
  } else {
    nextPathName = editMode(pathName);
  }

  return push(nextPathName);
};

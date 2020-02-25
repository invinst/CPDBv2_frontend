import { push } from 'connected-react-router';

import { editModeOn, editMode } from 'utils/edit-path';


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

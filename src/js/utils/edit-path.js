import { browserHistory } from 'react-router';

import { getCurrentPathname } from 'utils/dom';
import { editModeOn } from 'selectors/edit-mode-on';


export function editMode(pathname) {
  const path = pathname || '';
  const nonEditPart = path.match(/^(?:\/?edit)?\/?(.*)$/)[1];
  return `/edit/${nonEditPart}`;
}

export function pushPathPreserveEditMode(path) {
  if (editModeOn(getCurrentPathname())) {
    path = editMode(path);
  } else {
    path = path.match(/(?:\/?edit\/)?(.*)/)[1];
  }

  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  browserHistory.push(path);
}

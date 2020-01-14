import browserHistory from 'utils/history';
import { compact } from 'lodash';

import { getCurrentPathname } from 'utils/dom';


export const editModeOn = (pathname) => (
  compact(pathname.split('/'))[0] === 'edit'
);

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

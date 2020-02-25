import { compact } from 'lodash';

import browserHistory from 'utils/history';
import { getCurrentPathname } from 'utils/dom';


export const editModeOn = (pathname) => (
  compact(pathname.split('/'))[0] === 'edit'
);

export function getNonEditPath(pathname) {
  return `/${pathname.match(/^(?:\/?edit)?\/?(.*)$/)[1]}`;
}

export function editMode(pathname) {
  const nonEditPart = getNonEditPath(pathname || '');
  return `/edit${nonEditPart}`;
}

export function pushPathPreserveEditMode(path) {
  if (editModeOn(getCurrentPathname())) {
    path = editMode(path);
  } else {
    path = getNonEditPath(path);
  }

  browserHistory.push(path);
}

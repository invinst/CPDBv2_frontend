import { createSelector } from 'reselect';
import { endsWith } from 'lodash';

import { editModeOn } from 'utils/edit-path';
import { PINBOARD_ADMIN_PATH } from 'utils/constants';
import { getPathname } from 'selectors/common/pathname';


export default createSelector(
  getPathname,
  editModeOn
);

export const openLoginByDefaultSelector = createSelector(
  getPathname,
  pathname => endsWith(pathname, PINBOARD_ADMIN_PATH)
);

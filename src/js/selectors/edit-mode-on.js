import { createSelector } from 'reselect';
import { endsWith, get } from 'lodash';

import { editModeOn } from 'utils/edit-path';
import { PINBOARD_ADMIN_PATH } from 'utils/constants';


const getPathName = (state, props) => props.pathname || get(props, 'location.pathname', '');

export default createSelector(
  getPathName,
  editModeOn
);

export const openLoginByDefaultSelector = createSelector(
  getPathName,
  pathname => endsWith(pathname, PINBOARD_ADMIN_PATH)
);

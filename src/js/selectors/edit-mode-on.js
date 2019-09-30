import { createSelector } from 'reselect';
import { get } from 'lodash';

import { editModeOn } from 'utils/edit-path';


const getPathName = (state, props) => props.pathname || get(props, 'location.pathname', '');

export default createSelector(
  getPathName,
  editModeOn);

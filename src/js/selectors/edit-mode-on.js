import { createSelector } from 'reselect';

import { editModeOn } from 'utils/edit-path';


const getPathName = (state, props) => props.pathname ? props.pathname : props.location.pathname;

export default createSelector(
  getPathName,
  editModeOn);

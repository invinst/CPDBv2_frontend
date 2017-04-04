import { compact } from 'lodash';
import { createSelector } from 'reselect';


const getPathName = (state, props) => props.pathname ? props.pathname : props.location.pathname;
export const editModeOn = (pathname) => (
  compact(pathname.split('/'))[0] === 'edit'
);

export default createSelector(
  getPathName,
  editModeOn);

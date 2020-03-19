import { createSelector } from 'reselect';

import editModeOnSelector from 'selectors/edit-mode-on';
import { isSignedIn } from 'selectors/authentication';


export const showLogOutButton = createSelector(
  editModeOnSelector,
  isSignedIn,
  (editModeOn, isSignedIn) => editModeOn && isSignedIn);

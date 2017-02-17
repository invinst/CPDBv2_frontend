import { createSelector } from 'reselect';

import editModeOnSelector from 'selectors/edit-mode-on';


const isSignedIn = state => !!state.authentication.apiAccessToken;

export const showLogOutButton = createSelector(
  editModeOnSelector,
  isSignedIn,
  (editModeOn, isSignedIn) => editModeOn && isSignedIn);

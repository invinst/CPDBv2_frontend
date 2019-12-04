import { createSelector } from 'reselect';

import editModeOnSelector, { openLoginByDefaultSelector } from 'selectors/edit-mode-on';


const isSignedIn = state => !!state.authentication.apiAccessToken;

export default createSelector(
  editModeOnSelector,
  openLoginByDefaultSelector,
  isSignedIn,
  (editModeOn, openLoginByDefault, isSignedIn) => (editModeOn || openLoginByDefault) && !isSignedIn
);

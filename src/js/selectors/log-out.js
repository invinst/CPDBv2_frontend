import { createSelector } from 'reselect';
import { get } from 'lodash';

import editModeOnSelector from 'selectors/edit-mode-on';


export const isSignedIn = state => !!get(state, 'authentication.apiAccessToken', false);

export const showLogOutButton = createSelector(
  editModeOnSelector,
  isSignedIn,
  (editModeOn, isSignedIn) => editModeOn && isSignedIn);

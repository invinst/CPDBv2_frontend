import { createSelector } from 'reselect';
import { get } from 'lodash';

import editModeOnSelector from 'selectors/edit-mode-on';


const isSignedIn = state => !!state.authentication.apiAccessToken;
const openLoginModal = state => get(state, 'authentication.openLoginModal', false);

export default createSelector(
  editModeOnSelector,
  isSignedIn,
  openLoginModal,
  (editModeOn, isSignedIn, openLoginModal) => (editModeOn || openLoginModal) && !isSignedIn
);

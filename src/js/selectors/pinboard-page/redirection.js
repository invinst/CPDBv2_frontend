import { get } from 'lodash';
import { createSelector } from 'reselect';

const getInitialLoading = state => get(state, 'pinboardPage.redirection.initialLoading', true);
const getRedirect = state => get(state, 'pinboardPage.redirection.redirect', false);


export const isInitiallyLoading = createSelector(
  getInitialLoading,
  loading => loading,
);

export const shouldRedirect = createSelector(
  getRedirect,
  redirect => redirect,
);

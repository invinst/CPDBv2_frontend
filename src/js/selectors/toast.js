import { createSelector } from 'reselect';
import { isEmpty } from 'lodash';

export const getToasts = state => state.toasts;

export const hasToastsSelector = createSelector(
  getToasts,
  toasts => !isEmpty(toasts)
);

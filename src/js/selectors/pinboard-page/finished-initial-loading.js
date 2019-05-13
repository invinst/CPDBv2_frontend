import { get } from 'lodash';
import { createSelector } from 'reselect';


const finishedInitialLoading = state => get(state, 'pinboardPage.finishedInitialLoading', false);

export const hasFinishInitialLoading = createSelector(
  finishedInitialLoading,
  finished => finished,
);

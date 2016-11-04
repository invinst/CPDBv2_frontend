import { createSelector } from 'reselect';

import { keys, omitBy, isEmpty } from 'lodash';


const getSuggestions = state => state.landingPage.suggestionApp.suggestionGroups;

export const tagsSelector = createSelector(
  getSuggestions,
  suggestions => keys(omitBy(suggestions, isEmpty))
);

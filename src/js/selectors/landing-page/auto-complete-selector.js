import { createSelector } from 'reselect';

import { groupBy } from 'lodash';


const getSuggestions = state => state.landingPage.suggestionApp.suggestions;

export const suggestionsSelector = createSelector(
  getSuggestions,
  (suggestions) => (groupBy(suggestions, 'payload.type'))
);

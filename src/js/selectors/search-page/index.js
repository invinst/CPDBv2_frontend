import { hiddenSelector } from './search-terms';
import { focusedResultItemSelector } from './search-results/navigation';
import { focusedSearchTermItemSelector } from './search-terms/navigation';

export const getFocusedItem = (state) => {
  return hiddenSelector(state) ? focusedResultItemSelector(state) : focusedSearchTermItemSelector(state);
};


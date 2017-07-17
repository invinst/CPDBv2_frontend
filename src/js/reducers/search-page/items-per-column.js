import { handleActions } from 'redux-actions';

import { viewportHeight } from 'utils/dom';
import { loadMoreButtonHeight } from 'components/search-page/search-results/suggestion-group/load-more-button.style';
import { navWrapperCompactHeight } from 'components/header/header-content.style';
import { tagsWrapperHeight } from 'components/search-page/search-tags.style';
import {
  suggestionItemHeight
} from 'components/search-page/search-results/suggestion-group/suggestion-column/suggestion-item.style';
import { headerHeight } from 'components/search-page/search-results/suggestion-group/suggestion-group.style';


const occupiedHeight = navWrapperCompactHeight + tagsWrapperHeight + loadMoreButtonHeight + headerHeight;
const availableHeight = viewportHeight() - occupiedHeight;
const itemsPerColumn = Math.min(
  10,
  Math.max(parseInt(availableHeight / suggestionItemHeight), 1)
);

export default handleActions({}, itemsPerColumn);

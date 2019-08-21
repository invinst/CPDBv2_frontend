import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';
import { cardsState, defaultCardsState } from '../cards-state';


export default handleActions(
  {
    [constants.RELATED_COMPLAINTS_BY_CATEGORY_REQUEST_SUCCESS]: cardsState,
  },
  defaultCardsState
);

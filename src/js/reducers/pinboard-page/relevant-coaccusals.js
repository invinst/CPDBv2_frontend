import { reject } from 'lodash';

import createPaginationReducer from './common/pagination';
import * as constants from 'utils/constants';


const customItemsHandler = {
  [constants.ADD_ITEM_TO_PINBOARD_STATE]: (state, action) => {
    const { type, id } = action.payload;

    if (type === 'OFFICER') {
      return reject(state, { id: parseInt(id) });
    } else
      return state;
  },
};

export default createPaginationReducer(
  constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_START,
  constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_SUCCESS,
  constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_FAILURE,
  customItemsHandler
);

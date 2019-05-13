import createPaginationReducer from './common/pagination';
import * as constants from 'utils/constants';


export default createPaginationReducer(
  constants.PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_SUCCESS,
  constants.PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_FAILURE
);

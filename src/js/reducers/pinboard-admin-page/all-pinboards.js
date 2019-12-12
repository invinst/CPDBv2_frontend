import {
  ALL_PINBOARD_REQUEST_START,
  ALL_PINBOARD_REQUEST_SUCCESS,
  ALL_PINBOARD_REQUEST_FAILURE,
} from 'utils/constants';
import createPaginationReducer from 'reducers/common/pagination';


export default createPaginationReducer(
  ALL_PINBOARD_REQUEST_START,
  ALL_PINBOARD_REQUEST_SUCCESS,
  ALL_PINBOARD_REQUEST_FAILURE,
);

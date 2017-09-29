import { get } from 'actions/common/async-action';
import * as constants from 'utils/constants';


export const requestActivityGrid = get(
  constants.ACTIVITY_GRID_API_URL,
  [
    constants.ACTIVITY_GRID_REQUEST_START,
    constants.ACTIVITY_GRID_REQUEST_SUCCESS,
    constants.ACTIVITY_GRID_REQUEST_FAILURE
  ]
);

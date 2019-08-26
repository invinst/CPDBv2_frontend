import { get } from 'actions/common/async-action';
import * as constants from 'utils/constants';


export const requestCrawlers = (params) => get(
  constants.CRAWLERS_API_URL,
  [
    constants.CRAWLERS_REQUEST_START,
    constants.CRAWLERS_REQUEST_SUCCESS,
    constants.CRAWLERS_REQUEST_FAILURE,
  ]
)(params);

import {
  APP_CONFIG_FETCH_START,
  APP_CONFIG_FETCH_FAILURE,
  APP_CONFIG_FETCH_SUCCESS,
  APP_CONFIG_API_URL,
} from 'utils/constants';
import { get } from 'actions/common/async-action';


export const fetchAppConfig = get(
  APP_CONFIG_API_URL,
  [
    APP_CONFIG_FETCH_START,
    APP_CONFIG_FETCH_SUCCESS,
    APP_CONFIG_FETCH_FAILURE,
  ]
);

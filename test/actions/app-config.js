import { fetchAppConfig } from 'actions/app-config';
import {
  APP_CONFIG_FETCH_START,
  APP_CONFIG_FETCH_FAILURE,
  APP_CONFIG_FETCH_SUCCESS,
  APP_CONFIG_API_URL,
} from 'utils/constants';


describe('App config actions', function () {
  describe('fetchAppConfig', function () {
    it('should return the right action', function () {
      fetchAppConfig().should.eql({
        types: [APP_CONFIG_FETCH_START, APP_CONFIG_FETCH_SUCCESS, APP_CONFIG_FETCH_FAILURE],
        payload: {
          request: {
            url: APP_CONFIG_API_URL,
            params: undefined,
            adapter: null,
            cancelToken: undefined,
          },
        },
      });
    });
  });
});

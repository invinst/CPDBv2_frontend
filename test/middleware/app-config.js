import { APP_CONFIG_FETCH_SUCCESS } from 'utils/constants';
import updateAppConfig from 'middleware/app-config';
import appConfig from 'utils/app-config';


describe('updateAppConfig', function () {
  it('should update app config on APP_CONFIG_FETCH_SUCCESS', function () {
    const action = {
      type: APP_CONFIG_FETCH_SUCCESS,
      payload: {
        'PINBOARD_INTRODUCTION_DELAY': '2500',
      },
    };
    updateAppConfig()(() => {})(action);
    appConfig.get('PINBOARD_INTRODUCTION_DELAY').should.eql(2500);
  });
});

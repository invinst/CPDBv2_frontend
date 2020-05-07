import { APP_CONFIG_FETCH_SUCCESS } from 'utils/constants';
import updateAppConfig from 'middleware/app-config';
import appConfig from 'utils/app-config';


describe('updateAppConfig', function () {
  it('should update app config on APP_CONFIG_FETCH_SUCCESS', function () {
    const action = {
      type: APP_CONFIG_FETCH_SUCCESS,
      payload: {
        'VISUAL_TOKEN_COLORS': [
          { 'lower_range': 0, 'upper_range': 50, 'color': '#F5F4F4', 'text_color': '#ADADAD' },
          { 'lower_range': 50, 'upper_range': 100, 'color': '#F9D3C3', 'text_color': '#ADADAF' },
        ],
        'PINBOARD_INTRODUCTION_DELAY': '2500',
      },
    };
    updateAppConfig()(() => {})(action);
    appConfig.get('VISUAL_TOKEN_COLORS').should.eql([
      { lower: 0, upper: 50, backgroundColor: '#F5F4F4', textColor: '#ADADAD' },
      { lower: 50, upper: 100, backgroundColor: '#F9D3C3', textColor: '#ADADAF' },
    ]);
    appConfig.get('PINBOARD_INTRODUCTION_DELAY').should.eql(2500);
  });
});

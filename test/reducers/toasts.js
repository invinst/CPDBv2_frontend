import should from 'should';

import toasts from 'reducers/toasts';
import { TOAST_REQUEST_SUCCESS } from 'utils/constants';


describe('toasts reducer', function () {
  it('should have initial state', function () {
    should(toasts(undefined, {})).eql([]);
  });

  it('should handle TOAST_REQUEST_SUCCESS', function () {
    toasts([], {
      type: TOAST_REQUEST_SUCCESS,
      payload: [{
        name: 'CR',
        template: 'This is CR toast template',
      }, {
        name: 'TRR',
        template: 'This is TRR toast template',
      }],
    }).should.eql([{
      name: 'CR',
      template: 'This is CR toast template',
    }, {
      name: 'TRR',
      template: 'This is TRR toast template',
    }]);
  });
});

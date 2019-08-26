import should from 'should';

import popups from 'reducers/popups';
import { POPUP_REQUEST_SUCCESS } from 'utils/constants';


describe('popups reducer', function () {
  it('should have initial state', function () {
    should(popups(undefined, {})).eql([]);
  });

  it('should handle POPUP_REQUEST_SUCCESS', function () {
    popups([], {
      type: POPUP_REQUEST_SUCCESS,
      payload: [{
        name: 'unit',
        page: 'officer',
        title: 'Unit',
        text: 'Some unit explanation',
      }],
    }).should.eql([{
      name: 'unit',
      page: 'officer',
      title: 'Unit',
      text: 'Some unit explanation',
    }]);
  });
});

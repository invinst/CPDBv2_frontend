import should from 'should';

import pageLoading from 'reducers/page-loading';
import * as constants from 'utils/constants';


describe('pageLoading reducer', function () {
  it('should have initial state', function () {
    should(pageLoading(undefined, {})).eql(false);
  });

  it('should handle PAGE_LOAD_START', function () {
    pageLoading(
      {},
      {
        type: constants.PAGE_LOAD_START
      }
    ).should.eql(true);
  });

  it('should handle PAGE_LOAD_FINISH', function () {
    pageLoading(
      {},
      {
        type: constants.PAGE_LOAD_FINISH
      }
    ).should.eql(false);
  });
});

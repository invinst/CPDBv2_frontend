import { pageLoadStart, pageLoadFinish } from 'actions/page-loading';
import * as constants from 'utils/constants';


describe('Page loading actions', function () {
  describe('pageLoadStart', function () {
    it('should return correct payload', function () {
      pageLoadStart().should.eql({
        type: constants.PAGE_LOAD_START,
        payload: undefined
      });
    });
  });

  describe('pageLoadFinish', function () {
    it('should return correct payload', function () {
      pageLoadFinish().should.eql({
        type: constants.PAGE_LOAD_FINISH,
        payload: undefined
      });
    });
  });
});

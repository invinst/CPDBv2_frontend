import currentCrawlerId from 'reducers/crawlers-page/current-crawler-id';

import { OPEN_LOG_FILE_MODAL } from 'actions/generic-modal';
import should from 'should';


describe('currentCrawlerId reducer', function () {
  it('should return initial state', function () {
    should(currentCrawlerId(undefined, {})).be.null();
  });

  it('should handle OPEN_LOG_FILE_MODAL with empty state', function () {
    currentCrawlerId([], {
      type: OPEN_LOG_FILE_MODAL,
      payload: 111
    }).should.eql(111);
  });
});


import id from 'reducers/crawlers-page/id';

import { OPEN_LOG_FILE_MODAL } from 'actions/generic-modal';


describe('id reducer', function () {
  it('should return initial state', function () {
    id(undefined, {}).should.eql('');
  });

  it('should handle OPEN_LOG_FILE_MODAL with empty state', function () {
    id([], {
      type: OPEN_LOG_FILE_MODAL,
      payload: 111
    }).should.eql(111);
  });
});


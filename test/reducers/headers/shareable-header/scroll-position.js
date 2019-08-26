import should from 'should';

import scrollPosition from 'reducers/headers/shareable-header/scroll-position';

import { UPDATE_SHAREABLE_PAGE_SCROLL_POSITION } from 'utils/constants';


describe('scrollPosition reducer', function () {
  it('should have initial state', function () {
    should(scrollPosition(undefined, {})).be.null();
  });

  it('should handle UPDATE_SHAREABLE_PAGE_SCROLL_POSITION', function () {
    scrollPosition(undefined, {
      type: UPDATE_SHAREABLE_PAGE_SCROLL_POSITION,
      payload: 'middle',
    }).should.eql('middle');
  });
});

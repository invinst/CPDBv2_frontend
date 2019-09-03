import { UPDATE_SHAREABLE_PAGE_SCROLL_POSITION } from 'utils/constants';
import { updateShareablePageScrollPosition } from 'actions/headers/shareable-header';

describe('shareableHeader actions', function () {
  describe('updateShareablePageScrollPosition', function () {
    it('should return right action', function () {
      updateShareablePageScrollPosition('middle').should.eql({
        type: UPDATE_SHAREABLE_PAGE_SCROLL_POSITION,
        payload: 'middle',
      });
    });
  });
});

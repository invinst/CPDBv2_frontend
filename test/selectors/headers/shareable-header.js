import { getShareablePageScrollPosition } from 'selectors/headers/shareable-header';

describe('getShareablePageScrollPosition', function () {
  it('should return correct scroll position', function () {
    getShareablePageScrollPosition({
      headers: {
        shareableHeader: {
          scrollPosition: 'top',
        },
      },
    }).should.eql('top');
  });
});

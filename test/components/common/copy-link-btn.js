import CopyLinkButton from 'components/common/copy-link-btn';
import { withMobileDevice } from 'utils/test';


describe('CopyLinkButton component', function () {
  it('should be renderable', function () {
    CopyLinkButton.should.be.renderable();
    withMobileDevice(() => {
      CopyLinkButton.should.be.renderable();
    });
  });
});

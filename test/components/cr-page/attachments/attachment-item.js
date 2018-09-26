import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  Simulate,
} from 'react-addons-test-utils';
import { stub } from 'sinon';

import AttachmentItem from 'components/cr-page/attachments/attachment-item';
import React from 'react';
import * as GATracking from 'utils/google_analytics_tracking';


describe('AttachmentItem component', function () {
  it('should track click event', function () {
    const stubTrackAttachmentClick = stub(GATracking, 'trackAttachmentClick');
    const instance = renderIntoDocument(
      <AttachmentItem
        url='https://www.documentcloud.org/documents/4769822-CRID-1002813-CR.html'
        pathname='/complaint/123456/'
      />
    );
    Simulate.click(findRenderedDOMComponentWithClass(instance, 'test--attachment-card'));
    stubTrackAttachmentClick.should.be.calledWith(
      '/complaint/123456/',
      'https://www.documentcloud.org/documents/4769822-CRID-1002813-CR.html'
    );
    stubTrackAttachmentClick.restore();
  });
});

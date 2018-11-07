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

  it('should render audio background correctly', function () {
    const instance = renderIntoDocument(
      <AttachmentItem fileType='audio' />
    );

    const thumbnail = findRenderedDOMComponentWithClass(instance, 'test--attachment-card-thumbnail');
    thumbnail.style.background.should.containEql('ic-audio.svg');
  });

  it('should render video background correctly', function () {
    const instance = renderIntoDocument(
      <AttachmentItem fileType='video' />
    );

    const thumbnail = findRenderedDOMComponentWithClass(instance, 'test--attachment-card-thumbnail');
    thumbnail.style.background.should.containEql('ic-video.svg');
  });

  it('should render document background correctly', function () {
    const instance = renderIntoDocument(
      <AttachmentItem fileType='document' previewImageUrl='http://url/image'/>
    );

    const thumbnail = findRenderedDOMComponentWithClass(instance, 'test--attachment-card-thumbnail');
    thumbnail.style.background.should.containEql('http://url/image');
  });
});

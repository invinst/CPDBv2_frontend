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

    const thumbnail = findRenderedDOMComponentWithClass(instance, 'attachment-card-thumbnail');
    thumbnail.style.backgroundImage.should.containEql('ic-audio.svg');
  });

  it('should render video default background when preview image url is None', function () {
    const instance = renderIntoDocument(
      <AttachmentItem fileType='video' />
    );

    const thumbnail = findRenderedDOMComponentWithClass(instance, 'attachment-card-thumbnail');
    thumbnail.style.backgroundImage.should.containEql('ic-video.svg');
  });

  it('should render video background correctly', function () {
    const instance = renderIntoDocument(
      <AttachmentItem fileType='video' previewImageUrl='https://vimeo.com/123456'/>
    );

    const thumbnail = findRenderedDOMComponentWithClass(instance, 'attachment-card-thumbnail');
    thumbnail.style.backgroundImage.should.containEql('https://vimeo.com/123456');
  });

  it('should render document background correctly', function () {
    const instance = renderIntoDocument(
      <AttachmentItem fileType='document' previewImageUrl='http://url/image'/>
    );

    const thumbnail = findRenderedDOMComponentWithClass(instance, 'attachment-card-thumbnail');
    thumbnail.style.backgroundImage.should.containEql('http://url/image');
  });

  it('should track attachment click event', function () {
    const stubOnTrackingAttachment = stub();
    const instance = renderIntoDocument(
      <AttachmentItem
        onTrackingAttachment={ stubOnTrackingAttachment }
        id={ '123456' }
      />
    );
    Simulate.click(findRenderedDOMComponentWithClass(instance, 'test--attachment-card'));
    stubOnTrackingAttachment.should.be.calledWith({
      attachmentId: '123456',
      sourcePage: 'CR Page',
      app: 'Frontend'
    });
  });
});

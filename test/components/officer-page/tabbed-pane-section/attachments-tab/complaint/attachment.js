import React from 'react';

import OutboundLink from 'components/common/outbound-link';
import Attachment from 'components/officer-page/tabbed-pane-section/attachments-tab/complaint/attachment';
import {
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  renderIntoDocument, Simulate
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import { stub } from 'sinon';


describe('Attachment component', function () {
  let instance;
  const attachment = {
    title: 'CRID 1071970 OCIR 2 of 3',
    url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-3-of-3.html',
    previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif',
    fileType: 'document'
  };

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render content correctly', function () {
    instance = renderIntoDocument(
      <Attachment attachment={ attachment } hovering={ false } />
    );

    const outboundLink = findRenderedComponentWithType(instance, OutboundLink);
    outboundLink.props.href.should.eql('https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-3-of-3.html');
    outboundLink.props.target.should.eql('_blank');

    const previewImage = findRenderedDOMComponentWithClass(instance, 'attachment-preview-image');
    previewImage.style.backgroundImage.should.eql(
      'url("https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif")'
    );

    const title = findRenderedDOMComponentWithClass(instance, 'attachment-title');
    title.textContent.should.eql('CRID 1071970 OCIR 2 of 3');
  });

  it('should render preview image correctly', function () {
    const videoAttachment = {
      title: 'Video Clip',
      url: 'https://player.vimeo.com/video/165206078',
      previewImageUrl: '/src/img/ic-video.svg',
      fileType: 'video'
    };

    instance = renderIntoDocument(
      <Attachment attachment={ videoAttachment }/>
    );
    const previewImage = findRenderedDOMComponentWithClass(instance, 'attachment-preview-image');
    previewImage.style.backgroundImage.should.eql('url("/src/img/ic-video.svg")');
  });

  it('should track attachment click event', function () {
    const stubOnTrackingAttachment = stub();
    const attachment = {
      title: 'CRID 1071970 OCIR 2 of 3',
      url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-3-of-3.html',
      previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif',
      fileType: 'document',
      id: '123456',
    };

    instance = renderIntoDocument(
      <Attachment attachment={ attachment } onTrackingAttachment={ stubOnTrackingAttachment } />
    );
    Simulate.click(findRenderedDOMComponentWithClass(instance, 'attachment-preview-image'));
    stubOnTrackingAttachment.should.be.calledWith({
      attachmentId: '123456',
      sourcePage: 'Officer Page - Attachments Tab',
      app: 'Frontend'
    });
  });
});

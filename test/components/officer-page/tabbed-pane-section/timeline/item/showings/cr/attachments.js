import React from 'react';
import { stub } from 'sinon';
import {
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate,
} from 'react-addons-test-utils';

import Attachments from 'components/officer-page/tabbed-pane-section/timeline/item/showings/cr/attachments';
import OutboundLink from 'components/common/outbound-link';
import * as domUtils from 'utils/dom';
import { unmountComponentSuppressError } from 'utils/test';
import * as GATracking from 'utils/google_analytics_tracking';


describe('Attachments component', function () {
  let instance;
  const attachments = [{
    url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-1-of-3.html',
    previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif',
    fileType: 'document',
  }, {
    url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-2-of-3.html',
    previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p2-normal.gif',
    fileType: 'document',
  }, {
    url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-3-of-3.html',
    previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p3-normal.gif',
    fileType: 'document',
  }];

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render attachments correctly', function () {
    instance = renderIntoDocument(<Attachments attachments={ attachments } />);

    const moreAttachment = findRenderedDOMComponentWithClass(instance, 'more-attachment');
    const attachmentImage = findRenderedDOMComponentWithClass(instance, 'attachment-image');
    const attachmentImageHref = findRenderedDOMComponentWithClass(instance, 'attachment-image-href');
    const outboundLink = findRenderedComponentWithType(instance, OutboundLink);

    moreAttachment.textContent.should.eql('+2');
    attachmentImage.style.backgroundImage.should.eql(
      'url("https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif")'
    );
    attachmentImageHref.getAttribute('href').should.eql(
      'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-1-of-3.html'
    );
    outboundLink.props.href.should.eql('https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-1-of-3.html');
    outboundLink.props.target.should.eql('_blank');
  });

  it('should render file types of attachments correctly', function () {
    const videoAttachments = [{
      url: 'https://player.vimeo.com/video/165206078',
      previewImageUrl: '/src/img/ic-video.svg',
      fileType: 'video',
    }];
    const instance = renderIntoDocument(<Attachments attachments={ videoAttachments } />);

    const attachmentImage = findRenderedDOMComponentWithClass(instance, 'attachment-image');
    attachmentImage.style.backgroundImage.should.eql('url("/src/img/ic-video.svg")');
  });

  it('should call changeOfficerTab and scrollToElement', function () {
    const stubChangeOfficerTab = stub();
    const stubScrollToElement = stub(domUtils, 'scrollToElement');

    instance = renderIntoDocument(
      <Attachments attachments={ attachments } changeOfficerTab={ stubChangeOfficerTab } />
    );
    const moreAttachmentEl = findRenderedDOMComponentWithClass(instance, 'more-attachment');
    Simulate.click(moreAttachmentEl);

    stubChangeOfficerTab.should.be.calledWith('ATTACHMENTS');
    stubScrollToElement.should.be.calledWith('.tabbed-pane-section', true, -40);

    stubScrollToElement.restore();
  });

  it('should track click event', function () {
    const stubTrackAttachmentClick = stub(GATracking, 'trackAttachmentClick');
    const attachments = [{
      url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-2-of-3.html',
      previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p2-normal.gif',
      fileType: 'document',
    }];
    instance = renderIntoDocument(
      <Attachments
        attachments={ attachments }
        pathname='/complaint/123456/'
      />
    );
    Simulate.click(findRenderedDOMComponentWithClass(instance, 'attachment-image-href'));
    stubTrackAttachmentClick.should.be.calledWith(
      '/complaint/123456/',
      'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-2-of-3.html'
    );
    stubTrackAttachmentClick.restore();
  });

  it('should render an empty span when attachments is empty', function () {
    instance = renderIntoDocument(<Attachments attachments={ [] }/>);
    scryRenderedDOMComponentsWithClass(instance, 'test--empty-attachment').should.have.length(1);
  });
});

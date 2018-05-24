import Attachments from 'components/officer-page/tabbed-pane-section/timeline/item/showings/cr/attachments';
import React from 'react';
import { findRenderedDOMComponentWithClass, renderIntoDocument } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test/index';


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

    const moreAttachment = findRenderedDOMComponentWithClass(instance, 'test--more-attachment');
    const attachmentImage = findRenderedDOMComponentWithClass(instance, 'test--attachment-image');
    const attachmentImageHref = findRenderedDOMComponentWithClass(instance, 'test--attachment-image-href');

    moreAttachment.textContent.should.eql('+2');
    attachmentImage.style.backgroundImage.should.eql(
      'url("https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif")'
    );
    attachmentImage.style.backgroundSize.should.eql('cover');
    attachmentImageHref.getAttribute('href').should.eql(
      'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-1-of-3.html'
    );
  });

  it('should render file types of attachments correctly', function () {
    const videoAttachments = [{
      url: 'https://player.vimeo.com/video/165206078',
      previewImageUrl: '/src/img/ic-video.svg',
      fileType: 'video',
    }];
    const instance = renderIntoDocument(<Attachments attachments={ videoAttachments } />);

    const attachmentImage = findRenderedDOMComponentWithClass(instance, 'test--attachment-image');
    attachmentImage.style.backgroundSize.should.eql('auto');
  });
});

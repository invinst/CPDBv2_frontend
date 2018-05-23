import React from 'react';
import { findDOMNode } from 'react-dom';

import OutboundLink from 'components/common/outbound-link';
import Attachment from 'components/officer-page/tabbed-pane-section/attachments-tab/complaint/attachment';
import {
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  renderIntoDocument
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';


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
    findDOMNode(outboundLink).style.backgroundColor.should.eql('inherit');

    const previewImage = findRenderedDOMComponentWithClass(instance, 'test--attachment-preview-image');
    previewImage.style.backgroundImage.should.eql(
      'url("https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif")'
    );
    previewImage.style.border.should.eql('1px solid rgb(219, 219, 219)');

    const title = findRenderedDOMComponentWithClass(instance, 'test--attachment-title');
    title.textContent.should.eql('CRID 1071970 OCIR 2 of 3');
    title.style.color.should.eql('rgb(143, 143, 143)');
  });

  it('should change style when hovered', function () {
    instance = renderIntoDocument(
      <Attachment attachment={ attachment } hovering={ true } />
    );

    const outboundLink = findDOMNode(findRenderedComponentWithType(instance, OutboundLink));
    outboundLink.style.backgroundColor.should.eql('white');

    const previewImage = findRenderedDOMComponentWithClass(instance, 'test--attachment-preview-image');
    previewImage.style.border.should.eql('1px solid rgb(0, 94, 244)');

    const title = findRenderedDOMComponentWithClass(instance, 'test--attachment-title');
    title.style.color.should.eql('rgb(0, 94, 244)');
  });
});

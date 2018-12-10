import React from 'react';
import {
  findRenderedDOMComponentWithClass,
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import { Link } from 'react-router';

import Cr from 'components/officer-page/tabbed-pane-section/timeline/item/showings/cr';
import { unmountComponentSuppressError } from 'utils/test';


describe('Cr component', function () {
  let instance;
  const item = {
    crid: 123,
    date: 'Jan 01',
    kind: 'Complaint',
    unitName: '001',
    rank: 'Police Officer',
    isFirstRank: true,
    isLastRank: true,
    isFirstUnit: true,
    isLastUnit: true,
    finding: 'Sustained',
    category: 'Use of Force',
    outcome: 'Unknown',
    coaccused: 4,
    attachments: [{
      url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-1-of-3.html',
      previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif'
    }, {
      url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-2-of-3.html',
      previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p2-normal.gif'
    }, {
      url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-3-of-3.html',
      previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p3-normal.gif'
    }],
  };

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });


  it('should render item correctly', function () {
    instance = renderIntoDocument(<Cr item={ item } />);

    const kind = findRenderedDOMComponentWithClass(instance, 'cr-item-kind');
    const category = findRenderedDOMComponentWithClass(instance, 'cr-item-category');
    const finding = findRenderedDOMComponentWithClass(instance, 'cr-item-finding');
    const coaccused = findRenderedDOMComponentWithClass(instance, 'cr-item-coaccused');
    const date = findRenderedDOMComponentWithClass(instance, 'cr-item-date');
    const attachmentImage = findRenderedDOMComponentWithClass(instance, 'attachment-image');
    const attachmentImageHref = findRenderedDOMComponentWithClass(instance, 'attachment-image-href');
    const moreAttachment = findRenderedDOMComponentWithClass(instance, 'more-attachment');
    const link = findRenderedComponentWithType(instance, Link);

    kind.textContent.should.eql('Complaint');
    category.textContent.should.eql('Use of Force');
    finding.textContent.should.eql('Sustained, Unknown');
    coaccused.textContent.should.eql('1 of 4 coaccused');
    date.textContent.should.eql('Jan 01');
    moreAttachment.textContent.should.eql('+2');

    attachmentImage.style.backgroundImage.should.eql(
      'url("https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif")');
    attachmentImageHref.getAttribute('href').should.eql(
      'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-1-of-3.html');
    link.props.to.should.eql('/complaint/123/');
  });
});

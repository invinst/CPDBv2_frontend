import * as baseStyles from 'components/officer-page/tabbed-pane-section/timeline/item/baseItem.style';
import Cr from 'components/officer-page/tabbed-pane-section/timeline/item/showings/cr/index';
import React from 'react';
import { findRenderedDOMComponentWithClass, renderIntoDocument, Simulate, } from 'react-addons-test-utils';
import { stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test/index';


describe('Cr component', function () {
  let instance;
  const item = {
    crid: 123,
    date: 'Jan 01',
    kind: 'Complaint',
    unitName: '001',
    unitDisplay: '001 Display',
    rank: 'Police Officer',
    rankDisplay: 'Police Officer Display',
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
    instance = renderIntoDocument(<Cr item={ item } baseStyles={ baseStyles }/>);

    const kind = findRenderedDOMComponentWithClass(instance, 'test--cr-item-kind');
    const category = findRenderedDOMComponentWithClass(instance, 'test--cr-item-category');
    const finding = findRenderedDOMComponentWithClass(instance, 'test--cr-item-finding');
    const coaccused = findRenderedDOMComponentWithClass(instance, 'test--cr-item-coaccused');
    const date = findRenderedDOMComponentWithClass(instance, 'test--cr-item-date');
    const attachmentImage = findRenderedDOMComponentWithClass(instance, 'test--attachment-image');
    const attachmentImageHref = findRenderedDOMComponentWithClass(instance, 'test--attachment-image-href');
    const moreAttachment = findRenderedDOMComponentWithClass(instance, 'test--more-attachment');

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
  });

  it('should open the cr page when being clicked', function () {
    const openComplaintPageStub = stub();

    instance = renderIntoDocument(
      <Cr
        officerId={ 1 }
        item={ item }
        baseStyles={ baseStyles }
        openComplaintPage={ openComplaintPageStub }/>
    );

    const crItem = findRenderedDOMComponentWithClass(instance, 'test--cr-item');
    Simulate.click(crItem);

    openComplaintPageStub.should.be.calledWith({ crid: 123, officerId: 1 });
  });
});

import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Cr from 'components/officer-page/tabbed-pane-section/timeline/item/showings/cr';
import * as baseStyles from 'components/officer-page/tabbed-pane-section/timeline/item/item.style';


describe('Cr component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });


  it('should render item correctly', function () {
    const item = {
      date: 'Jan 01',
      kind: 'AWARD',
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
      attachments: [
        { url: 'first url', previewImageUrl: 'first image url' },
        { url: 'second url', previewImageUrl: 'second image url' },
        { url: 'third url', previewImageUrl: 'third image url' },
      ],
    };

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

    attachmentImage.getAttribute('src').should.eql('first image url');
    attachmentImageHref.getAttribute('href').should.eql('first url');
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import Cr from 'components/officer-page/tabbed-pane-section/timeline/item/showings/cr';
import Attachments from 'components/officer-page/tabbed-pane-section/timeline/item/showings/cr/attachments';


describe('Cr component', function () {
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
      previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif',
    }, {
      url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-2-of-3.html',
      previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p2-normal.gif',
    }, {
      url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-3-of-3.html',
      previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p3-normal.gif',
    }],
  };

  it('should render item correctly', function () {
    const wrapper = shallow(<Cr item={ item } />);

    const kind = wrapper.find('.cr-item-kind');
    const category = wrapper.find('.cr-item-category');
    const finding = wrapper.find('.cr-item-finding');
    const coaccused = wrapper.find('.cr-item-coaccused');
    const date = wrapper.find('.cr-item-date');
    const attachments = wrapper.find(Attachments).dive();
    const attachmentImage = attachments.find('.attachment-image');
    const attachmentImageHref = attachments.find('.attachment-image-href');
    const moreAttachment = attachments.find('.more-attachment');
    const link = wrapper.find(Link);

    kind.text().should.equal('Complaint');
    category.text().should.equal('Use of Force');
    finding.text().should.equal('Sustained, Unknown');
    coaccused.text().should.equal('1 of 4 coaccused');
    date.text().should.equal('Jan 01');
    moreAttachment.text().should.equal('+2');

    attachmentImage.prop('style').backgroundImage.should.eql(
      'url(https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif)');
    attachmentImageHref.prop('href').should.eql(
      'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-1-of-3.html');
    link.prop('to').should.equal('/complaint/123/');
  });
});

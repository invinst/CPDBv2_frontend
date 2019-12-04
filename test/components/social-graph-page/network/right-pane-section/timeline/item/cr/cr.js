import React from 'react';
import { shallow } from 'enzyme';

import Cr from 'components/social-graph-page/network/right-pane-section/timeline/item/cr';
import Attachments from 'components/social-graph-page/network/right-pane-section/timeline/item/cr/attachments';


describe('Cr component', function () {
  const allegationItem = {
    kind: 'CR',
    crid: '123456',
    incidentDate: 'OCT 8',
    year: 2006,
    category: 'Use of Force',
    subcategory: 'Excessive Force - Use Of Firearm / Off Duty - No Injury',
    attachments: [{
      url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-1-of-3.pdf',
      previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif',
      fileType: 'document',
    }, {
      url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-2-of-3.pdf',
      previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p2-normal.gif',
      fileType: 'document',
    }, {
      url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-3-of-3.pdf',
      previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p3-normal.gif',
      fileType: 'document',
    }],
    key: '123456',
  };

  it('should render correctly', function () {
    const wrapper = shallow(<Cr item={ allegationItem }/>);
    const kind = wrapper.find('.kind');
    const date = wrapper.find('.date');
    const category = wrapper.find('.category');
    const finding = wrapper.find('.subcategory');
    kind.text().should.equal('C');
    date.text().should.equal('OCT 8');
    category.text().should.equal('Use of Force');
    finding.text().should.equal('Excessive Force - Use Of Firearm / Off Duty - No Injury');
    const attachments = wrapper.find(Attachments);
    attachments.should.have.length(1);
  });
});

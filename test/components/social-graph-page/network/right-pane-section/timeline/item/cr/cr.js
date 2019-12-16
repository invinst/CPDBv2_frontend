import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Cr from 'components/social-graph-page/network/right-pane-section/timeline/item/cr';
import Attachments from 'components/social-graph-page/network/right-pane-section/timeline/item/cr/attachments';


describe('Cr component', function () {
  let instance;
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

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    instance = renderIntoDocument(<Cr item={ allegationItem }/>);
    const kind = findRenderedDOMComponentWithClass(instance, 'kind');
    const date = findRenderedDOMComponentWithClass(instance, 'date');
    const category = findRenderedDOMComponentWithClass(instance, 'category');
    const finding = findRenderedDOMComponentWithClass(instance, 'subcategory');
    kind.textContent.should.eql('C');
    date.textContent.should.eql('OCT 8');
    category.textContent.should.eql('Use of Force');
    finding.textContent.should.eql('Excessive Force - Use Of Firearm / Off Duty - No Injury');
    const attachments = scryRenderedComponentsWithType(instance, Attachments);
    attachments.should.have.length(1);
  });
});

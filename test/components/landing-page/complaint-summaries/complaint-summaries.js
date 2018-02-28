import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';
import { findDOMNode } from 'react-dom';
import { stub } from 'sinon';

import ComplaintSummaryCard from 'components/landing-page/complaint-summaries/complaint-summary-card';
import ComplaintSummaries from 'components/landing-page/complaint-summaries';


describe('Complaint Summaries components', function () {
  let instance, consoleStub;
  const data = [{
    'crid': '111',
    'categoryNames': ['Illegal Search'],
    'summary': 'This is summary 1',
    'incidentDate': new Date(2017, 6, 6)
  }, {
    'crid': '112',
    'categoryNames': ['Use of Force'],
    'summary': 'This is summary 2',
    'incidentDate': new Date(2017, 1, 6)
  }];

  beforeEach(function () {
    consoleStub = stub(console, 'error'); // suppress console.error `Carousel`
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
    consoleStub.restore();
  });

  it('should render appropriately', function () {

    instance = renderIntoDocument(
      <ComplaintSummaries cards={ data } />
    );

    const complaintSummaryCards = scryRenderedComponentsWithType(instance, ComplaintSummaryCard);
    complaintSummaryCards.should.have.length(2);
    const complaintSummaryCard1 = findDOMNode(complaintSummaryCards[0]);
    complaintSummaryCard1.textContent.should.containEql('Illegal Search');
    complaintSummaryCard1.textContent.should.containEql('Jul 6, 2017');
    complaintSummaryCard1.textContent.should.containEql('This is summary 1');

    const complaintSummaryCard2 = findDOMNode(complaintSummaryCards[1]);
    complaintSummaryCard2.textContent.should.containEql('Use of Force');
    complaintSummaryCard2.textContent.should.containEql('Feb 6, 2017');
    complaintSummaryCard2.textContent.should.containEql('This is summary 2');
  });
});

import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';
import { findDOMNode } from 'react-dom';
import { stub } from 'sinon';

import ComplaintSummaryCard from 'components/landing-page/complaint-summaries/complaint-summary-card';
import ComplaintSummaries from 'components/landing-page/complaint-summaries';
import { PINNED_ITEM_TYPES } from 'utils/constants';
import ItemPinButton from 'components/common/item-pin-button';
import pinButtonStyles from 'components/common/item-pin-button.sass';


describe('Complaint Summaries components', function () {
  let instance, consoleStub;
  const addOrRemoveItemInPinboard = stub();

  const data = [{
    'crid': '111',
    'categoryNames': ['Illegal Search'],
    'summary': 'This is summary 1',
    'incidentDate': new Date(2017, 6, 6),
    isPinned: true,
  }, {
    'crid': '112',
    'categoryNames': ['Use of Force'],
    'summary': 'This is summary 2',
    'incidentDate': new Date(2017, 1, 6),
    isPinned: false,
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
      <ComplaintSummaries
        cards={ data }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
      />,
    );

    const complaintSummaryCards = scryRenderedComponentsWithType(instance, ComplaintSummaryCard);
    complaintSummaryCards.should.have.length(2);
    const complaintSummaryCard1 = findDOMNode(complaintSummaryCards[0]);
    complaintSummaryCard1.textContent.should.containEql('Illegal Search');
    complaintSummaryCard1.textContent.should.containEql('Jul 6, 2017');
    complaintSummaryCard1.textContent.should.containEql('This is summary 1');
    findRenderedDOMComponentWithClass(complaintSummaryCards[0], 'complaint-summary-card-summary-gradient');

    const complaintSummaryCard2 = findDOMNode(complaintSummaryCards[1]);
    complaintSummaryCard2.textContent.should.containEql('Use of Force');
    complaintSummaryCard2.textContent.should.containEql('Feb 6, 2017');
    complaintSummaryCard2.textContent.should.containEql('This is summary 2');
    findRenderedDOMComponentWithClass(complaintSummaryCards[1], 'complaint-summary-card-summary-gradient');

    complaintSummaryCards.forEach((card, index) => {
      const button = findRenderedComponentWithType(card, ItemPinButton);
      button.props.className.should.eql(pinButtonStyles.cardPinnedButton);
      button.props.addOrRemoveItemInPinboard.should.eql(addOrRemoveItemInPinboard);
      button.props.showHint.should.be.false();
      button.props.item.should.eql({
        type: PINNED_ITEM_TYPES.CR,
        id: data[index].crid,
        isPinned: data[index].isPinned,
      });
    });
  });
});

import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';
import { findDOMNode } from 'react-dom';
import { stub } from 'sinon';

import OfficerCard from 'components/landing-page/activity-grid/officer-card';
import RecentActivity from 'components/landing-page/recent-activity';


describe('Recent Activity components', function () {
  let instance, consoleStub;
  const data = [{
    'id': 1,
    'visualTokenBackgroundColor': '#c6d4ec',
    'fullName': 'Manuel Guzman',
    'complaintCount': 13,
    'sustainedCount': 0,
    'birthYear': 1974,
    'complaintPercentile': 84.5,
    'race': 'Hispanic',
    'gender': 'Male'
  }, {
    'id': 2,
    'fullName': 'Jerome Finnagan',
    'complaintCount': 55,
    'sustainedCount': 22,
    'birthYear': 1979,
    'complaintPercentile': 94.5,
    'race': 'White',
    'gender': 'Male'
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
      <RecentActivity cards={ data }/>
    );

    findRenderedDOMComponentWithClass(instance, 'test--landing--carousel-activity');
    const officerCards = scryRenderedComponentsWithType(instance, OfficerCard);
    officerCards.should.have.length(2);

    const officerCard1 = findDOMNode(officerCards[0]);
    officerCard1.textContent.should.containEql('Manuel Guzman');
    officerCard1.textContent.should.containEql('More than 84% of other officers');
    officerCard1.textContent.should.containEql('13 Complaints');

    const officerCard2 = findDOMNode(officerCards[1]);
    officerCard2.textContent.should.containEql('Jerome Finnagan');
    officerCard2.textContent.should.containEql('55 Complaints, 22 Sustained');
    officerCard2.textContent.should.containEql('More than 94% of other officers');
  });
});

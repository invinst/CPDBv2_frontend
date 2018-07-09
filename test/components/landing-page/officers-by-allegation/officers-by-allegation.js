import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';
import { findDOMNode } from 'react-dom';
import { stub } from 'sinon';

import OfficerCard from 'components/landing-page/common/officer-card';
import OfficersByAllegation from 'components/landing-page/officers-by-allegation';


describe('Officers By Allegation components', function () {
  let instance;
  let consoleStub;
  const data = [{
    'id': 1,
    'visualTokenBackgroundColor': '#c6d4ec',
    'fullName': 'Manuel Guzman',
    'complaintCount': 56,
    'sustainedCount': 30,
    'birthYear': 1974,
    'complaintPercentile': 99.5,
    'race': 'Hispanic',
    'gender': 'Male'
  }, {
    'id': 2,
    'fullName': 'Jerome Finnagan',
    'complaintCount': 55,
    'sustainedCount': 22,
    'birthYear': 1979,
    'complaintPercentile': 99.1,
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
      <OfficersByAllegation cards={ data } />
    );

    findRenderedDOMComponentWithClass(instance, 'test--landing-carousel-allegation');

    const officerCards = scryRenderedComponentsWithType(instance, OfficerCard);
    officerCards.should.have.length(2);
    const officerCard1 = findDOMNode(officerCards[0]);
    officerCard1.textContent.should.containEql('Manuel Guzman');
    officerCard1.textContent.should.containEql('More than 99.5% of other officers');
    officerCard1.textContent.should.containEql('56 Complaints, 30 Sustained');

    const officerCard2 = findDOMNode(officerCards[1]);
    officerCard2.textContent.should.containEql('Jerome Finnagan');
    officerCard2.textContent.should.containEql('55 Complaints, 22 Sustained');
    officerCard2.textContent.should.containEql('More than 99.1% of other officers');
  });
});

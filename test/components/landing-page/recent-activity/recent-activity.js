import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType,
  findRenderedComponentWithType
} from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';
import { findDOMNode } from 'react-dom';
import { stub } from 'sinon';

import OfficerCard from 'components/common/officer-card';
import RecentActivity from 'components/landing-page/recent-activity';
import PairingCard from 'components/landing-page/common/pairing-card';
import Carousel from 'components/common/carousel';
import * as GATracking from 'utils/google_analytics_tracking';


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
    'gender': 'Male',
    'rank': 'Police Officer',
    'type': 'single_officer',
  }, {
    'id': 2,
    'fullName': 'Jerome Finnagan',
    'complaintCount': 55,
    'sustainedCount': 22,
    'birthYear': 1979,
    'complaintPercentile': 94.5,
    'race': 'White',
    'gender': 'Male',
    'rank': 'Police Officer',
    'type': 'single_officer',
  }];
  const pairCardData = [{
    'type': 'coaccused_pair',
    'coaccusalCount': 23,
    'officer1': {
      'id': 8562,
      'fullName': 'Jerome Finnigan',
      'age': 54,
      'race': 'White',
      'gender': 'Male',
      'rank': 'Police Officer',
      'percentile': {
        'percentileAllegation': '99.987',
        'percentileAllegationCivilian': '99.984',
        'percentileAllegationInternal': '99.675',
        'percentileTrr': '70.069'
      },
      'backgroundColor': '#f0201e'
    },
    'officer2': {
      'id': 3454,
      'fullName': 'John Burzinski',
      'age': 56,
      'race': 'White',
      'gender': 'Male',
      'rank': 'Police Officer',
      'percentile': {
        'percentileAllegation': '99.924',
        'percentileAllegationCivilian': '99.908',
        'percentileAllegationInternal': '99.566',
        'percentileTrr': '74.440'
      },
      'backgroundColor': '#f0201e'
    }
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
      <RecentActivity cards={ data } />
    );

    findRenderedDOMComponentWithClass(instance, 'test--landing-carousel-activity');
    const officerCards = scryRenderedComponentsWithType(instance, OfficerCard);
    officerCards.should.have.length(2);

    const officerCard1 = findDOMNode(officerCards[0]);
    officerCard1.textContent.should.containEql('Police Officer');
    officerCard1.textContent.should.containEql('Manuel Guzman');
    officerCard1.textContent.should.containEql('More than 84% of other officers');
    officerCard1.textContent.should.containEql('13 Allegations');

    const officerCard2 = findDOMNode(officerCards[1]);
    officerCard2.textContent.should.containEql('Jerome Finnagan');
    officerCard2.textContent.should.containEql('55 Allegations 22 Sustained');
    officerCard2.textContent.should.containEql('More than 94% of other officers');
  });

  it('should render the pair card of two officers', function () {
    instance = renderIntoDocument(
      <RecentActivity cards={ pairCardData } />
    );

    const pairingCard = findDOMNode(findRenderedComponentWithType(instance, PairingCard));
    pairingCard.textContent.should.containEql('Police Officer');
    pairingCard.textContent.should.containEql('Jerome Finnigan');
    pairingCard.textContent.should.containEql('54-year-old White Male');
    pairingCard.textContent.should.containEql('John Burzinski');
    pairingCard.textContent.should.containEql('56-year-old White Male');
    pairingCard.textContent.should.containEql('Coaccused 23 times');
  });

  it('should send ga event when navigate on carousel', function () {
    stub(GATracking, 'trackSwipeLanddingPageCarousel');
    instance = renderIntoDocument(
      <RecentActivity cards={ [1, 2, 3] } />
    );
    const carousel = findRenderedComponentWithType(instance, Carousel);
    carousel.props.onNavigate('left');
    GATracking.trackSwipeLanddingPageCarousel.should.be.calledWith('left', 'ACTIVITY');
    GATracking.trackSwipeLanddingPageCarousel.restore();
  });
});

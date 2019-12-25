import React from 'react';
import { mount } from 'enzyme';
import { stub } from 'sinon';

import OfficerCard from 'components/common/officer-card';
import RecentActivity from 'components/landing-page/recent-activity';
import PairingCard from 'components/landing-page/common/pairing-card';
import Carousel from 'components/common/carousel';
import * as GATracking from 'utils/google_analytics_tracking';
import { OfficerCardFactory } from 'utils/test/factories/activity-grid';


describe('Recent Activity components', function () {
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
    'kind': 'single_officer',
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
    'kind': 'single_officer',
  }];
  const pairCardData = [{
    'kind': 'coaccused_pair',
    'coaccusalCount': 23,
    'officer1': {
      'id': 8562,
      'fullName': 'Jerome Finnigan',
      'age': '54-year-old',
      'race': 'White',
      'gender': 'Male',
      'rank': 'Police Officer',
      'percentile': {
        'percentileAllegation': '99.987',
        'percentileAllegationCivilian': '99.984',
        'percentileAllegationInternal': '99.675',
        'percentileTrr': '70.069',
      },
      'backgroundColor': '#f0201e',
    },
    'officer2': {
      'id': 3454,
      'fullName': 'John Burzinski',
      'age': '56-year-old',
      'race': 'White',
      'gender': 'Male',
      'rank': 'Police Officer',
      'percentile': {
        'percentileAllegation': '99.924',
        'percentileAllegationCivilian': '99.908',
        'percentileAllegationInternal': '99.566',
        'percentileTrr': '74.440',
      },
      'backgroundColor': '#f0201e',
    },
  }];

  it('should render appropriately', function () {
    const wrapper = mount(
      <RecentActivity cards={ data } />
    );

    wrapper.find('.test--landing-carousel-activity').exists().should.be.true();
    const officerCards = wrapper.find(OfficerCard);
    officerCards.should.have.length(2);

    const officerCard1 = officerCards.at(0);
    officerCard1.text().should.containEql('Police Officer');
    officerCard1.text().should.containEql('Manuel Guzman');
    officerCard1.text().should.containEql('More than 84% of other officers');
    officerCard1.text().should.containEql('13 Allegations');

    const officerCard2 = officerCards.at(1);
    officerCard2.text().should.containEql('Jerome Finnagan');
    officerCard2.text().should.containEql('55 Allegations');
    officerCard2.text().should.containEql('22 Sustained');
    officerCard2.text().should.containEql('More than 94% of other officers');
  });

  it('should render the pair card of two officers', function () {
    const wrapper = mount(
      <RecentActivity cards={ pairCardData } />
    );

    const pairingCard = wrapper.find(PairingCard);
    pairingCard.text().should.containEql('Police Officer');
    pairingCard.text().should.containEql('Jerome Finnigan');
    pairingCard.text().should.containEql('54-year-old White Male');
    pairingCard.text().should.containEql('John Burzinski');
    pairingCard.text().should.containEql('56-year-old White Male');
    pairingCard.text().should.containEql('Coaccused 23 times');
  });

  it('should send ga event when navigate on carousel', function () {
    stub(GATracking, 'trackSwipeLanddingPageCarousel');
    const wrapper = mount(
      <RecentActivity cards={ [
        OfficerCardFactory.build({ kind: 'single_officer' }),
        OfficerCardFactory.build({ kind: 'single_officer' }),
        OfficerCardFactory.build({ kind: 'single_officer' }),
      ] }/>
    );
    const carousel = wrapper.find(Carousel);
    carousel.prop('onNavigate')('left');
    GATracking.trackSwipeLanddingPageCarousel.should.be.calledWith('left', 'ACTIVITY');
    GATracking.trackSwipeLanddingPageCarousel.restore();
  });
});

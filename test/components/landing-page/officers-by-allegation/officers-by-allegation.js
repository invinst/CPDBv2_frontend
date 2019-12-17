import React from 'react';
import { mount } from 'enzyme';

import OfficerCard from 'components/common/officer-card';
import OfficersByAllegation from 'components/landing-page/officers-by-allegation';


describe('Officers By Allegation components', function () {
  const data = [{
    'id': 1,
    'visualTokenBackgroundColor': '#c6d4ec',
    'fullName': 'Manuel Guzman',
    'complaintCount': 56,
    'sustainedCount': 30,
    'birthYear': 1974,
    'complaintPercentile': 99.5,
    'race': 'Hispanic',
    'gender': 'Male',
  }, {
    'id': 2,
    'fullName': 'Jerome Finnagan',
    'complaintCount': 55,
    'sustainedCount': 22,
    'birthYear': 1979,
    'complaintPercentile': 99.1,
    'race': 'White',
    'gender': 'Male',
  }];

  it('should render appropriately', function () {
    const wrapper = mount(
      <OfficersByAllegation cards={ data } />
    );

    wrapper.find('.test--landing-carousel-allegation').exists().should.be.true();

    const officerCards = wrapper.find(OfficerCard);
    officerCards.should.have.length(2);
    const officerCard1 = officerCards.at(0);
    officerCard1.text().should.containEql('Manuel Guzman');
    officerCard1.text().should.containEql('More than 99.5% of other officers');
    officerCard1.text().should.containEql('56 Allegations');
    officerCard1.text().should.containEql('30 Sustained');

    const officerCard2 = officerCards.at(1);
    officerCard2.text().should.containEql('Jerome Finnagan');
    officerCard2.text().should.containEql('55 Allegations');
    officerCard2.text().should.containEql('22 Sustained');
    officerCard2.text().should.containEql('More than 99.1% of other officers');
  });
});

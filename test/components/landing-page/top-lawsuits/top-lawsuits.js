import React from 'react';

import { mountWithRouter } from 'utils/test';
import TopLawsuits from 'components/landing-page/top-lawsuits';
import TopLawsuitCard from 'components/landing-page/top-lawsuits/top-lawsuit-card';


describe('Top Lawsuits components', function () {
  const data = [{
    'caseNo': '111',
    'summary': 'summary 1',
    'incidentDate': 'Dec 31, 1999',
    'primaryCause': 'Excessive Force/Serious',
  }, {
    'caseNo': '112',
    'summary': 'summary 2',
    'incidentDate': 'Jan 1, 2010',
    'primaryCause': 'Excessive Force/Minor',
  }];

  it('should render appropriately', function () {
    const wrapper = mountWithRouter(
      <TopLawsuits cards={ data } />
    );

    const topLawsuitCard = wrapper.find(TopLawsuitCard);
    topLawsuitCard.should.have.length(2);
    const topLawsuitCard1 = topLawsuitCard.at(0);
    topLawsuitCard1.text().should.containEql('Dec 31, 1999');
    topLawsuitCard1.text().should.containEql('Excessive Force/Serious');

    const topLawsuitCard2 = topLawsuitCard.at(1);
    topLawsuitCard2.text().should.containEql('Jan 1, 2010');
    topLawsuitCard2.text().should.containEql('Excessive Force/Minor');
  });
});

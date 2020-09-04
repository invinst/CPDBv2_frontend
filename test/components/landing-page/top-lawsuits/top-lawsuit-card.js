import React from 'react';

import { mountWithRouter } from 'utils/test';
import TopLawsuitCard from 'components/landing-page/top-lawsuits/top-lawsuit-card';
import TopLawsuits from 'components/landing-page/top-lawsuits';


describe('Top Lawsuits components', function () {
  const data = [{
    'caseNo': '00-L-1234',
    'primaryCause': 'Excessive Force/Serious',
    'summary': 'This is summary 1',
    'incidentDate': 'Jun 6, 2017',
  }, {
    'caseNo': '00-L-1234',
    'primaryCause': 'Illegal Search/Seizure',
    'summary': 'This is summary 2',
    'incidentDate': 'Jan 6, 2017',
  }];

  it('should render appropriately', function () {
    const wrapper = mountWithRouter(
      <TopLawsuits
        cards={ data }
      />
    );

    const topLawsuitCards = wrapper.find(TopLawsuitCard);
    topLawsuitCards.should.have.length(2);
    const topLawsuitCard1 = topLawsuitCards.at(0);
    topLawsuitCard1.text().should.containEql('Excessive Force/Serious');
    topLawsuitCard1.text().should.containEql('Jun 6, 2017');
    topLawsuitCard1.text().should.containEql('This is summary 1');
    topLawsuitCard1.find('.top-lawsuit-card-summary-gradient').exists().should.be.true();

    const topLawsuitCard2 = topLawsuitCards.at(1);
    topLawsuitCard2.text().should.containEql('Illegal Search/Seizure');
    topLawsuitCard2.text().should.containEql('Jan 6, 2017');
    topLawsuitCard2.text().should.containEql('This is summary 2');
    topLawsuitCard2.find('.top-lawsuit-card-summary-gradient').exists().should.be.true();
  });
});

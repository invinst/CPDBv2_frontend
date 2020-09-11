import React from 'react';
import { mount } from 'enzyme';
import { Link, MemoryRouter } from 'react-router-dom';

import { mountWithRouter } from 'utils/test';
import CoaccusedCard from 'components/cr-page/accused-officers/coaccused-card';
import SmallRadarChartOfficerCard from 'components/common/small-radar-chart-officer-card';
import { PrintModeContext } from 'contexts';


describe('CoaccusedCard component', function () {
  it('should render correctly', function () {
    const wrapper = mountWithRouter(
      <CoaccusedCard
        officerId={ 1 }
        fullName='Jerome Finnigan'
        visualTokenBackgroundColor='red'
        complaintCount={ 10 }
        sustainedCount={ 5 }
        allegationPercentile={ 20 }
        age='37-year-old'
        race='white'
        gender='male'
        rank='Police Officer'
        percentile={ {
          items: [{ 'axis': 'a', value: 1 }],
        } }
      />
    );
    const link = wrapper.find(Link);
    link.prop('to').should.equal('/officer/1/jerome-finnigan/');

    const radarChartElement = wrapper.find('.test--radar');
    radarChartElement.prop('width').should.equal('100%');
    radarChartElement.prop('height').should.equal('100%');
    radarChartElement.find('.test--radar-radar-area').should.not.be.null();

    const smallRadarChartOfficerCard = wrapper.find(SmallRadarChartOfficerCard);
    smallRadarChartOfficerCard.exists().should.be.true();
    smallRadarChartOfficerCard.prop('officerId').should.equal(1);
    smallRadarChartOfficerCard.prop('fullName').should.equal('Jerome Finnigan');
    smallRadarChartOfficerCard.prop('age').should.equal('37-year-old');

    const text = wrapper.text();
    text.should.containEql('Police Officer');
    text.should.containEql('Jerome Finnigan');
    text.should.containEql('10 allegations');
    text.should.containEql('5 sustained');
    text.should.containEql('More than 20% of other officers');

    text.should.containEql('37-year-old white male');
  });

  it('should render category and outcome correctly', function () {
    const wrapper = mountWithRouter(
      <CoaccusedCard
        finding='Sustained'
        disciplined={ true }
        category='Operations/Personnel Violation'
        findingOutcomeMix='Reprimand'
      />
    );
    const category = wrapper.find('.accused-card-category');
    const outcome = wrapper.find('.accused-card-outcome');
    category.text().should.equal('Operations/Personnel Violation');
    outcome.text().should.equal('Reprimand');
  });

  it('should render disciplined if both printMode and disciplined are true', function () {
    const context = { printMode: true };
    const wrapper = mount(
      <PrintModeContext.Provider value={ context }>
        <MemoryRouter>
          <CoaccusedCard
            finding='Sustained'
            disciplined={ true }
            category='Operations/Personnel Violation'
            findingOutcomeMix='Reprimand'
          />
        </MemoryRouter>
      </PrintModeContext.Provider>
    );
    const findingOutcome = wrapper.find('.finding-outcome-mix');
    findingOutcome.text().should.equal('Reprimand, Disciplined');
  });

  it('should only render disciplined if printMode & disciplined are true and findingOutcomeMix is null', function () {
    const context = { printMode: true };
    const wrapper = mount(
      <PrintModeContext.Provider value={ context }>
        <MemoryRouter>
          <CoaccusedCard
            finding='Sustained'
            disciplined={ true }
            category='Operations/Personnel Violation'
            findingOutcomeMix={ null }
          />
        </MemoryRouter>
      </PrintModeContext.Provider>
    );
    const findingOutcome = wrapper.find('.finding-outcome-mix');
    findingOutcome.text().should.equal('Disciplined');
  });
});

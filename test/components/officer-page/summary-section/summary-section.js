import React from 'react';
import { shallow } from 'enzyme';

import { mountWithRouter } from 'utils/test';
import SummarySection from 'components/officer-page/summary-section';
import SummaryField from 'components/officer-page/summary-section/summary-field';
import ViewUnitProfileButton from 'components/officer-page/summary-section/view-unit-profile-button';
import Salary from 'components/officer-page/summary-section/salary';
import YearOld from 'components/officer-page/summary-section/year-old';


describe('SummarySection component', function () {
  it('should render summary fields, YearOld, Salary and ViewUnitProfileButton', function () {
    const wrapper = mountWithRouter(<SummarySection/>);

    wrapper.find(YearOld).exists().should.be.true();
    wrapper.find(Salary).exists().should.be.true();
    wrapper.find(ViewUnitProfileButton).exists().should.be.true();

    const summaryFields = wrapper.find(SummaryField);
    summaryFields.should.have.length(7);
    summaryFields.map(field => field.prop('label')).should.eql([
      'Year of Birth', 'Race', 'Sex', 'Badge', 'Rank', 'Unit', 'Career',
    ]);
  });

  it('should render correct badge row', function () {
    const officerSummary = {
      badge: '1234',
      historicBadges: ['4321, 5678'],
    };
    const wrapper = shallow(<SummarySection officerSummary={ officerSummary }/>);
    const summaryFields = wrapper.find(SummaryField);
    summaryFields.at(3).dive().text().should.containEql('1234, 4321, 5678');
  });

  it('should only render historic badge when badge is empty', function () {
    const officerSummary = {
      badge: '',
      historicBadges: ['4321, 5678'],
    };
    const wrapper = shallow(<SummarySection officerSummary={ officerSummary }/>);
    const summaryFields = wrapper.find(SummaryField);
    summaryFields.at(3).dive().text().should.containEql('4321, 5678');
  });

  it('should only render badge when historic badge is empty', function () {
    const officerSummary = {
      badge: '1234',
      historicBadges: [],
    };
    const wrapper = shallow(<SummarySection officerSummary={ officerSummary }/>);
    const summaryFields = wrapper.find(SummaryField);
    summaryFields.at(3).dive().text().should.containEql('1234');
  });

  it('should render Unknown when both badge and historic badge are empty', function () {
    const officerSummary = {
      badge: '',
      historicBadges: [],
    };
    const wrapper = shallow(<SummarySection officerSummary={ officerSummary }/>);
    const summaryFields = wrapper.find(SummaryField);
    summaryFields.at(3).dive().text().should.containEql('Unknown');
  });
});

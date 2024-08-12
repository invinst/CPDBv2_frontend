import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import CitySummary from 'components/landing-page/heat-map/summary-panel/city-summary';

describe('CitySummary component', function () {
  it('should render enough section', function () {
    const citySummary = {
      startYear: 1999,
      endYear: 2017,
      allegationCount: 123456,
      totalLawsuitSettlements: '10.0 billion',
      disciplinePercentage: '7',
    };

    const wrapper = shallow(<CitySummary citySummary={ citySummary } />);

    wrapper.find('.city-summary-header').text().should.equal(
      'Civic Police Data Project collects and publishes data about police misconduct in Chicago.'
    );
    wrapper.find('.lawsuit-info-summary').text().should.containEql(
      'Between 2014 and 2019'
    );
    wrapper.find('.total-lawsuit-settlements').text().should.equal('$10.0 billion');
    wrapper.find('.allegation-count').text().should.equal('123,456');
    wrapper.find('.complaint-info-summary').text().should.containEql(`Since ${citySummary.startYear}`);
  });

  it('should scroll to top lawsuit row when click on read lawsuit stories', function () {
    const scrollToTopLawsuitSpy = spy();
    const wrapper = shallow(
      <CitySummary scrollToTopLawsuit={ scrollToTopLawsuitSpy }/>
    );
    const readLawsuitStories = wrapper.find('.lawsuit-info .info-stories');
    readLawsuitStories.simulate('click');
    scrollToTopLawsuitSpy.should.be.called();
  });
});

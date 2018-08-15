import React from 'react';
import { spy } from 'sinon';
import should from 'should';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import SuggestedCards from 'components/search-page/search-no-input/suggested-cards';
import OfficerCard from 'components/landing-page/common/officer-card';
import RadarChart from 'components/common/radar-chart/radar-chart';


describe('SuggestedCards component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should request activity grid when there is no cards', function () {
    let spyRequestActivityGrid = spy();
    renderIntoDocument(
      <SuggestedCards cards={ [] } requestActivityGrid={ spyRequestActivityGrid }/>
    );

    spyRequestActivityGrid.calledOnce.should.be.true();
  });

  it('should render OfficerCards when there are cards', function () {
    instance = renderIntoDocument(
      <SuggestedCards cards={ ['one', 'two', 'three', 'four'] }/>
    );

    let cards = scryRenderedComponentsWithType(instance, OfficerCard);
    cards.should.have.length(4);
  });

  it('should should NoDataRadarChart when cards has no percentiles ', () => {
    instance = renderIntoDocument(
      <SuggestedCards cards={ ['one', 'two', 'three', 'four'] }/>
    );
    const noDataRadarCharts = scryRenderedComponentsWithType(instance, RadarChart);
    noDataRadarCharts.should.have.length(4);

    should(noDataRadarCharts[0].props.data).be.undefined();
    should(noDataRadarCharts[1].props.data).be.undefined();
    should(noDataRadarCharts[2].props.data).be.undefined();
    should(noDataRadarCharts[3].props.data).be.undefined();
  });

  it('should render radar chart when cards has percentile', () => {
    const cards = [{
      percentile: {
        items: [
          { axis: 'a', value: 10 },
          { axis: 'b', value: 20 },
          { axis: 'c', value: 50 }
        ]
      }
    }];
    instance = renderIntoDocument(<SuggestedCards cards={ cards }/>);
    const svg = findRenderedDOMComponentWithClass(instance, 'test--radar');
    svg.getAttribute('style').should.eql('background-color: rgb(253, 250, 242);');
    findRenderedDOMComponentWithClass(instance, 'test--radar-radar-area');
  });
});

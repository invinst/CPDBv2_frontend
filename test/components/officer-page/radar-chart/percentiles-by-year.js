import React from 'react';
import {
  renderIntoDocument, scryRenderedDOMComponentsWithClass, scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import PercentilesByYear from 'components/officer-page/radar-chart/explainer/percentiles-by-year';
import StaticRadarChart from 'components/common/radar-chart';
import { unmountComponentSuppressError } from 'utils/test';


describe('PercentilesByYear components', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    PercentilesByYear.should.be.renderable();
  });

  it('should render RadarChart by year (with reverse order)', function () {
    const data = [{
      year: 2015,
      visualTokenBackground: 'white',
      items: [
        { 'axis': 'Use of Force Report', value: 20 },
        { 'axis': 'Internal Complaints', value: 30 },
        { 'axis': 'Civilian Complaint', value: 40 }
      ]
    }, {
      year: 2016,
      visualTokenBackground: 'yellow',
      items: [
        { 'axis': 'Use of Force Report', value: 40 },
        { 'axis': 'Internal Complaints', value: 50 },
        { 'axis': 'Civilian Complaint', value: 60 }
      ]
    }];
    instance = renderIntoDocument(
      <PercentilesByYear yearlyRadarChartData={ data }/>
    );

    const rows = scryRenderedDOMComponentsWithClass(instance, 'test--radar-explainer-percentiles-row');
    rows.should.have.length(2);
    rows[0].textContent.should.containEql('2016506040');
    rows[1].textContent.should.containEql('2015304020');

    scryRenderedComponentsWithType(instance, StaticRadarChart).should.have.length(2);
  });

  it('should not show 0 and NaN values in the cumulative percentiles per year table', function () {
    const data = [{
      year: 2015,
      visualTokenBackground: 'white',
      items: [
        { 'axis': 'Use of Force Report', value: 20 },
        { 'axis': 'Internal Complaints', value: 0 },
        { 'axis': 'Civilian Complaint', value: NaN }
      ]
    }, {
      year: 2016,
      visualTokenBackground: 'yellow',
      items: [
        { 'axis': 'Use of Force Report', value: NaN },
        { 'axis': 'Internal Complaints', value: 40 },
        { 'axis': 'Civilian Complaint', value: 0 }
      ]
    }];
    instance = renderIntoDocument(
      <PercentilesByYear yearlyRadarChartData={ data }/>
    );
    const rows = scryRenderedDOMComponentsWithClass(instance, 'test--radar-explainer-percentiles-row');
    rows[0].textContent.should.containEql('201640');
    rows[1].textContent.should.containEql('201520');
  });
});

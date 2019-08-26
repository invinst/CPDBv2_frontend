import React from 'react';
import should from 'should';
import { Link } from 'react-router';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError, renderWithContext } from 'utils/test';
import CoaccusedCard from 'components/cr-page/accused-officers/coaccused-card';
import RadarChart from 'components/common/radar-chart/radar-chart';


describe('CoaccusedCard component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    instance = renderIntoDocument(
      <CoaccusedCard
        officerId={ 1 }
        fullName='Jerome Finnigan'
        visualTokenBackgroundColor='red'
        complaintCount={ 10 }
        sustainedCount={ 5 }
        complaintPercentile={ 20 }
        birthYear={ 1980 }
        race='white'
        gender='male'
        rank='Police Officer'
        percentile={ {
          items: [{ 'axis': 'a', value: 1 }],
        } }
      />
    );
    const link = findRenderedComponentWithType(instance, Link);
    link.props.to.should.eql('/officer/1/jerome-finnigan/');

    const radarChartElement = findRenderedDOMComponentWithClass(instance, 'test--radar');
    radarChartElement.getAttribute('width').should.eql('100%');
    radarChartElement.getAttribute('height').should.eql('100%');
    should(radarChartElement.querySelector('.test--radar-radar-area')).not.be.null();

    const text = findDOMNode(instance).innerText;
    text.should.containEql('Police Officer');
    text.should.containEql('Jerome Finnigan');
    text.should.containEql('10 allegations');
    text.should.containEql('5 sustained');
    text.should.containEql('More than 20% of other officers');

    text.should.containEql('37-year-old white male');
  });

  it('should show NoDataRadarChart when no percentile', () => {
    instance = renderIntoDocument(<CoaccusedCard officerId={ 3 }/>);
    const noDataRadarChart = findRenderedComponentWithType(instance, RadarChart);
    should(noDataRadarChart.props.data).be.undefined();
  });

  it('should render link with target _blank when openCardInNewPage is true', () => {
    instance = renderIntoDocument(<CoaccusedCard officerId={ 3 } openCardInNewPage={ true }/>);

    const link = findRenderedComponentWithType(instance, Link);
    link.props.target.should.eql('_blank');
  });

  it('should render category and outcome correctly', function () {
    instance = renderIntoDocument(
      <CoaccusedCard
        finding='Sustained'
        disciplined={ true }
        category='Operations/Personnel Violation'
        findingOutcomeMix='Reprimand'
      />
    );
    const category = findRenderedDOMComponentWithClass(instance, 'accused-card-category');
    const outcome = findRenderedDOMComponentWithClass(instance, 'accused-card-outcome');
    category.textContent.should.eql('Operations/Personnel Violation');
    outcome.textContent.should.eql('Reprimand');
  });

  it('should render disciplined if both printMode and disciplined are true', function () {
    const context = { printMode: true };
    instance = renderWithContext(context,
      <CoaccusedCard
        finding='Sustained'
        disciplined={ true }
        category='Operations/Personnel Violation'
        findingOutcomeMix='Reprimand'
      />);
    const findingOutcome = findRenderedDOMComponentWithClass(instance, 'finding-outcome-mix');
    findingOutcome.textContent.should.eql('Reprimand, Disciplined');
  });

  it('should only render disciplined if printMode & disciplined are true and findingOutcomeMix is null', function () {
    const context = { printMode: true };
    instance = renderWithContext(context,
      <CoaccusedCard
        finding='Sustained'
        disciplined={ true }
        category='Operations/Personnel Violation'
        findingOutcomeMix={ null }
      />);
    const findingOutcome = findRenderedDOMComponentWithClass(instance, 'finding-outcome-mix');
    findingOutcome.textContent.should.eql('Disciplined');
  });
});

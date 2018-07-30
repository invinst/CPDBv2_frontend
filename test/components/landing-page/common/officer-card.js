import React from 'react';
import should from 'should';
import { Link } from 'react-router';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';

import OfficerCard from 'components/landing-page/common/officer-card';
import { getThisYear } from 'utils/date';
import NoDataRadarChart from 'components/common/radar-chart/no-data-radar-chart';


describe('OfficerCard component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    instance = renderIntoDocument(
      <OfficerCard
        officerId={ 1 }
        fullName='someone'
        visualTokenBackgroundColor='red'
        complaintCount={ 10 }
        sustainedCount={ 5 }
        complaintPercentile={ 20 }
        birthYear={ 1980 }
        race='white'
        gender='male'
        percentile={ {
          items: [{ 'axis': 'a', value: 1 }]
        } }
      />
    );
    const link = findRenderedComponentWithType(instance, Link);
    link.props.to.should.eql('/officer/1/');

    const radarChartElement = findRenderedDOMComponentWithClass(instance, 'test--radar');
    radarChartElement.getAttribute('width').should.eql('100%');
    radarChartElement.getAttribute('height').should.eql('100%');
    should(radarChartElement.querySelector('.test--radar-radar-area')).not.be.null();

    const text = findDOMNode(instance).innerText;
    text.should.containEql('Officersomeone');
    text.should.containEql('10 Allegations, 5 Sustained');
    text.should.containEql('More than 20% of other officers');

    const age = getThisYear() - 1980 - 1;
    text.should.containEql(`${age} year old white male`);
  });

  it('should show NoDataRadarChart when no percentile', () => {
    instance = renderIntoDocument(<OfficerCard officerId={ 3 }/>);
    findRenderedComponentWithType(instance, NoDataRadarChart);
  });
});

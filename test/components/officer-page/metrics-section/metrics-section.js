import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';

import MetricsSection from 'components/officer-page/metrics-section';
import MetricPane from 'components/officer-page/metrics-section/metric-pane';
import MetricsColumn from 'components/officer-page/metrics-section/metrics-column';
import { unmountComponentSuppressError } from 'utils/test';
import Popup from 'components/common/popup';


const checkMetricPaneDataInfo = (metricPane, value, name, description) => {
  const _value = findRenderedDOMComponentWithClass(metricPane, 'test--metrics-pane-value');
  const _name = findRenderedDOMComponentWithClass(metricPane, 'test--metrics-pane-name');
  const _description = findRenderedDOMComponentWithClass(metricPane, 'test--metrics-pane-description');

  _value.textContent.should.eql(value);
  _name.textContent.should.eql(name);
  _description.textContent.should.eql(description);
};

describe('MetricsSection', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render with correct information', function () {
    const metrics = {
      allegationCount: 90,
      allegationPercentile: 99.994,
      honorableMentionCount: 1,
      sustainedCount: 4,
      disciplineCount: 0,
      honorableMentionPercentile: 3.000,
      useOfForceCount: 4,
      majorAwardCount: 5,
      useOfForcePercentile: 6.000,
      civilianComplimentCount: 0,
    };
    instance = renderIntoDocument(<MetricsSection metrics={ metrics }/>);

    scryRenderedComponentsWithType(instance, MetricsColumn).should.have.length(3);
    scryRenderedComponentsWithType(instance, MetricPane).should.have.length(6);

    const metricsPanes = scryRenderedComponentsWithType(instance, MetricPane);
    checkMetricPaneDataInfo(metricsPanes[0], '90', 'Allegations', 'More than 99.9% of other officers');
    checkMetricPaneDataInfo(metricsPanes[1], '4', 'Sustained', '0 Disciplined');
    checkMetricPaneDataInfo(metricsPanes[2], '4', 'Use of Force Reports', 'More than 6% of other officers');
    checkMetricPaneDataInfo(metricsPanes[3], '0', 'Civilian Compliments', '');
    checkMetricPaneDataInfo(metricsPanes[4], '5', 'Major Awards', '');
    checkMetricPaneDataInfo(metricsPanes[5], '1', 'Honorable Mention', 'More than 3% of other officers');
  });

  it('should render popups for each cell', function () {
    const popup = {
      'allegation': {
        title: 'Allegations',
        text: 'Some allegation explanation',
      },
      'sustained': {
        title: 'Sustained',
        text: 'Some sustained explanation',
      },
      'trr': {
        title: 'Use of Force Report',
        text: 'Some use of force report explanation',
      },
      'majorAward': {
        title: 'Major Award',
        text: 'Some major award explanation',
      },
      'civilianCompliment': {
        title: 'Civilian Compliments',
        text: 'Some civilian compliment explanation',
      },
      'honorableMention': {
        title: 'Honorable Mention',
        text: 'Some honorable mention explanation',
      },
    };
    instance = renderIntoDocument(<MetricsSection popup={ popup }/>);
    const metricPopup = scryRenderedComponentsWithType(instance, Popup);
    metricPopup[0].props.title.should.eql('Allegations');
    metricPopup[0].props.text.should.eql('Some allegation explanation');
    metricPopup[1].props.title.should.eql('Sustained');
    metricPopup[1].props.text.should.eql('Some sustained explanation');
    metricPopup[2].props.title.should.eql('Use of Force Report');
    metricPopup[2].props.text.should.eql('Some use of force report explanation');
    metricPopup[3].props.title.should.eql('Civilian Compliments');
    metricPopup[3].props.text.should.eql('Some civilian compliment explanation');
    metricPopup[4].props.title.should.eql('Major Award');
    metricPopup[4].props.text.should.eql('Some major award explanation');
    metricPopup[5].props.title.should.eql('Honorable Mention');
    metricPopup[5].props.text.should.eql('Some honorable mention explanation');
  });
});

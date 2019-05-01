import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError } from 'utils/test/index';
import { OfficerPane } from 'components/search-page/preview-pane/index';
import {
  VisualTokenWidget,
  OfficerInfoWidget,
  MetricWidget,
} from 'components/search-page/preview-pane/widgets/index';


describe('OfficerPane component', () => {
  let instance;
  const officer = {
    fullName: 'John Watts',
    appointedDate: '05-08-2018',
    resignationDate: '05-12-2019',
    age: 28,
    unit: {
      id: 1,
      unitName: '001',
      description: 'Unit 001',
    },
    rank: 'Police Officer',
    badge: '012',
    race: 'black',
    gender: 'Male',
    complaintCount: 1,
    complaintPercentile: 10,
    disciplineCount: 0,
    trrCount: 5,
    trrPercentile: 78,
    civilianComplimentCount: 2,
    majorAwardCount: 1,
    honorableMentionCount: 3,
    honorableMentionPercentile: 99.3,
    to: 'some_url',
    lastPercentile: {
      items: [
        { axis: 'a', value: 10 },
        { axis: 'b', value: 20 },
        { axis: 'c', value: 30 },
      ],
      visualTokenBackground: '#ffffff'
    },
  };

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should contain the sub components', () => {
    instance = renderIntoDocument(
      <OfficerPane
        { ...officer }
      />
    );

    const visualToken = findRenderedComponentWithType(instance, VisualTokenWidget);
    const officerInfo = findRenderedComponentWithType(instance, OfficerInfoWidget);
    const metric = findRenderedComponentWithType(instance, MetricWidget);


    visualToken.props.items.should.eql([
      { axis: 'a', value: 10 },
      { axis: 'b', value: 20 },
      { axis: 'c', value: 30 },
    ]);
    visualToken.props.visualTokenBackground.should.eql('#ffffff');

    officerInfo.props.fullName.should.eql('John Watts');
    officerInfo.props.appointedDate.should.eql('05-08-2018');
    officerInfo.props.resignationDate.should.eql('05-12-2019');
    officerInfo.props.age.should.eql(28);
    officerInfo.props.unit.should.eql({
      id: 1,
      unitName: '001',
      description: 'Unit 001',
    });
    officerInfo.props.rank.should.eql('Police Officer');
    officerInfo.props.badge.should.eql('012');
    officerInfo.props.race.should.eql('black');
    officerInfo.props.gender.should.eql('Male');

    metric.props.metrics.should.containEql({
      name: 'Allegations',
      value: 1,
      description: 'More than 10% of other officers',
    });
    metric.props.metrics.should.containEql({
      name: 'Sustained',
      value: 'N/A',
      isHighlight: true,
      description: '0 Disciplined',
    });
    metric.props.metrics.should.containEql({
      name: 'Use of Force Reports',
      value: 5,
      description: 'More than 78% of other officers',
    });
    metric.props.metrics.should.containEql({
      name: 'Major Awards',
      value: 1,
    });
    metric.props.metrics.should.containEql({
      name: 'Honorable Mentions',
      value: 3,
      description: 'More than 99.3% of other officers',
    });
    findDOMNode(metric).textContent.should.containEql('2CivilianCompliments');
  });

  it('should hide percentile description if its value is zero', function () {
    instance = renderIntoDocument(
      <OfficerPane
        { ...officer }
        complaintPercentile={ 0 }
        honorableMentionPercentile={ 0 }
        trrPercentile={ 0 }
      />
    );

    const metric = findRenderedComponentWithType(instance, MetricWidget);

    metric.props.metrics.should.containEql({
      name: 'Allegations',
      value: 1,
      description: '',
    });
    metric.props.metrics.should.containEql({
      name: 'Honorable Mentions',
      value: 3,
      description: '',
    });
    metric.props.metrics.should.containEql({
      name: 'Honorable Mentions',
      value: 3,
      description: '',
    });
  });

  it('should hide percentile description if its value is null', function () {
    instance = renderIntoDocument(
      <OfficerPane
        { ...officer }
        complaintPercentile={ null }
        honorableMentionPercentile={ null }
        trrPercentile={ null }
      />
    );

    const metric = findRenderedComponentWithType(instance, MetricWidget);

    metric.props.metrics.should.containEql({
      name: 'Allegations',
      value: 1,
      description: '',
    });
    metric.props.metrics.should.containEql({
      name: 'Honorable Mentions',
      value: 3,
      description: '',
    });
    metric.props.metrics.should.containEql({
      name: 'Honorable Mentions',
      value: 3,
      description: '',
    });
  });
});

import React from 'react';
import {
  Simulate,
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { stub } from 'sinon';
import { browserHistory } from 'react-router';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import { OfficerPane as OfficerPane } from 'components/common/preview-pane';
import {
  NewVisualTokenWidget as VisualTokenWidget,
  NewOfficerInfoWidget as OfficerInfoWidget,
  NewMetricWidget as MetricWidget,
} from 'components/common/preview-pane/widgets';


describe('OfficerPane component', () => {
  let instance;
  const officer = {
    id: 123456,
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
    isPinned: true,
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

  it('should render pin and view officer profile buttons', function () {
    instance = renderIntoDocument(
      <OfficerPane
        { ...officer }
        complaintPercentile={ null }
        honorableMentionPercentile={ null }
        trrPercentile={ null }
      />
    );

    findRenderedDOMComponentWithClass(instance, 'pin-button').should.be.ok();
    findRenderedDOMComponentWithClass(instance, 'view-officer-profile-button').should.be.ok();
  });

  it('should not render pin button if not pinnable', function () {
    instance = renderIntoDocument(
      <OfficerPane
        { ...officer }
        complaintPercentile={ null }
        honorableMentionPercentile={ null }
        trrPercentile={ null }
        pinnable={ false }
      />
    );

    scryRenderedDOMComponentsWithClass(instance, 'pin-button').should.have.length(0);
    findRenderedDOMComponentWithClass(instance, 'view-officer-profile-button').should.be.ok();
  });

  it('should add or remove item to/from pinboard when click on pin button', function () {
    const addOrRemoveItemInPinboardStub = stub();

    instance = renderIntoDocument(
      <OfficerPane
        { ...officer }
        complaintPercentile={ null }
        honorableMentionPercentile={ null }
        trrPercentile={ null }
        type={ 'OFFICER' }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardStub }
        isPinned={ false }
      />
    );

    let pinButton = findRenderedDOMComponentWithClass(instance, 'pin-button');
    Simulate.click(pinButton);

    addOrRemoveItemInPinboardStub.calledWith({
      type: 'OFFICER',
      id: 123456,
      isPinned: false,
    }).should.be.true();

    reRender(
      <OfficerPane
        { ...officer }
        complaintPercentile={ null }
        honorableMentionPercentile={ null }
        trrPercentile={ null }
        type={ 'OFFICER' }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardStub }
        isPinned={ true }
      />, instance
    );

    pinButton = findRenderedDOMComponentWithClass(instance, 'pin-button');
    Simulate.click(pinButton);

    addOrRemoveItemInPinboardStub.calledWith({
      type: 'OFFICER',
      id: 123456,
      isPinned: true,
    }).should.be.true();
  });

  it('should redirect to officer page when click on View officer profile button', function () {
    const browserHistoryPush = stub(browserHistory, 'push');

    instance = renderIntoDocument(
      <OfficerPane
        { ...officer }
        complaintPercentile={ null }
        honorableMentionPercentile={ null }
        trrPercentile={ null }
        type={ 'OFFICER' }
        isPinned={ false }
      />
    );

    const viewProfileButton = findRenderedDOMComponentWithClass(instance, 'view-officer-profile-button');
    Simulate.click(viewProfileButton);

    browserHistoryPush.calledWith('some_url').should.be.true();

    browserHistoryPush.restore();
  });
});

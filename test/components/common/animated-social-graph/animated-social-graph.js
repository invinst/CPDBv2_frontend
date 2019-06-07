import React from 'react';
import { useFakeTimers, spy, stub } from 'sinon';
import {
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  renderIntoDocument,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';
import Slider from 'rc-slider';

import { unmountComponentSuppressError } from 'utils/test';
import AnimatedSocialGraph from 'components/common/animated-social-graph';
import SocialGraph from 'components/common/animated-social-graph/social-graph';
import * as intercomUtils from 'utils/intercom';


describe('AnimatedSocialGraph component', function () {
  let instance;
  const officers = [
    {
      fullName: 'Jerome Finnigan',
      id: 1
    },
    {
      fullName: 'Edward May',
      id: 2
    }
  ];
  const coaccusedData = [
    {
      officerId1: 1,
      officerId2: 2,
      incidentDate: '1988-10-03',
      accussedCount: 1,
    }
  ];
  const listEvent = [
    '1988-10-03',
    '1989-12-11',
    '1990-01-09',
    '1990-12-13',
    '1991-01-02',
    '1991-01-06',
    '1991-01-15',
    '1991-02-18',
    '1991-02-20',
    '1991-03-06'
  ];


  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render all sections correctly', function () {
    instance = renderIntoDocument(
      <AnimatedSocialGraph
        timelineIdx={ 1 }
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    scryRenderedComponentsWithType(instance, SocialGraph).should.have.length(1);

    const slider = findRenderedComponentWithType(instance, Slider);
    const currentDate = findRenderedDOMComponentWithClass(instance, 'current-date-label');
    findRenderedDOMComponentWithClass(instance, 'start-date-label').textContent.should.eql('1988-10-03');
    findRenderedDOMComponentWithClass(instance, 'end-date-label').textContent.should.eql('1991-03-06');
    currentDate.textContent.should.eql('1989-12-11');
    slider.props.step.should.eql(1);
    slider.props.min.should.eql(0);
    slider.props.max.should.eql(9);
    slider.props.defaultValue.should.eql(0);
    slider.props.value.should.eql(1);
  });

  it('should start timeline from beginning when mounted', function () {
    const clock = useFakeTimers();
    const updateTimelineIdxSpy = spy();
    instance = renderIntoDocument(
      <AnimatedSocialGraph
        officers={ officers }
        timelineIdx={ 0 }
        refreshIntervalId={ null }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        updateTimelineIdx={ updateTimelineIdxSpy }
      />
    );

    clock.tick(150);
    updateTimelineIdxSpy.calledWith(1).should.be.true();
    clock.restore();
  });

  it('should not render graph control panel if there is no event', function () {
    instance = renderIntoDocument(<AnimatedSocialGraph/>);
    scryRenderedDOMComponentsWithClass(instance, 'graph-control-panel').should.have.length(0);
  });

  it('should pause timeline when click on toggle timeline button when timeline is running', function () {
    const updateRefreshIntervalIdSpy = spy();
    instance = renderIntoDocument(
      <AnimatedSocialGraph
        officers={ officers }
        timelineIdx={ 1 }
        refreshIntervalId={ 1234 }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        updateRefreshIntervalId={ updateRefreshIntervalIdSpy }
      />
    );

    const toggleTimelineButton = findRenderedDOMComponentWithClass(instance, 'toggle-timeline-btn');

    toggleTimelineButton.className.should.containEql('pause-icon');

    Simulate.click(toggleTimelineButton);
    updateRefreshIntervalIdSpy.calledWith(null).should.be.true();
  });

  it('should start timeline when click on toggle timeline button when timeline is not running', function () {
    const updateRefreshIntervalIdSpy = spy();
    instance = renderIntoDocument(
      <AnimatedSocialGraph
        officers={ officers }
        timelineIdx={ 1 }
        refreshIntervalId={ null }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        updateRefreshIntervalId={ updateRefreshIntervalIdSpy }
      />
    );

    const toggleTimelineButton = findRenderedDOMComponentWithClass(instance, 'toggle-timeline-btn');

    toggleTimelineButton.className.should.containEql('play-icon');

    Simulate.click(toggleTimelineButton);
    updateRefreshIntervalIdSpy.called.should.be.true();
    updateRefreshIntervalIdSpy.args[0][0].should.not.be.null();
  });

  it('should start timeline from beginning when click on toggle timeline button at the end of timeline', function () {
    const updateTimelineIdxSpy = spy();
    const updateRefreshIntervalIdSpy = spy();
    instance = renderIntoDocument(
      <AnimatedSocialGraph
        officers={ officers }
        timelineIdx={ listEvent.length - 1 }
        refreshIntervalId={ null }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        updateTimelineIdx={ updateTimelineIdxSpy }
        updateRefreshIntervalId={ updateRefreshIntervalIdSpy }
      />
    );

    const toggleTimelineButton = findRenderedDOMComponentWithClass(instance, 'toggle-timeline-btn');

    toggleTimelineButton.className.should.containEql('play-icon');

    Simulate.click(toggleTimelineButton);
    updateTimelineIdxSpy.calledWith(0).should.be.true();
    updateRefreshIntervalIdSpy.called.should.be.true();
    updateRefreshIntervalIdSpy.args[0][0].should.not.be.null();
  });

  it('should update timelineIdx value when click on specific part of the timeline ', function () {
    const updateTimelineIdxSpy = spy();
    instance = renderIntoDocument(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        updateTimelineIdx={ updateTimelineIdxSpy }
      />
    );

    const coaccusalsThresholdSlider = findRenderedComponentWithType(instance, Slider);
    coaccusalsThresholdSlider.props.onChange(5);
    updateTimelineIdxSpy.calledWith(5).should.be.true();
  });

  it('should update refreshIntervalId and timelineIdx values when startTimelineFromBeginning', function () {
    const updateTimelineIdxSpy = spy();
    const updateRefreshIntervalIdSpy = spy();
    instance = renderIntoDocument(
      <AnimatedSocialGraph
        officers={ officers }
        timelineIdx={ 1 }
        refreshIntervalId={ 1234 }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        updateTimelineIdx={ updateTimelineIdxSpy }
        updateRefreshIntervalId={ updateRefreshIntervalIdSpy }
      />
    );

    const socialGraph = findRenderedComponentWithType(instance, SocialGraph);
    socialGraph.props.startTimelineFromBeginning();

    updateTimelineIdxSpy.calledWith(0).should.be.true();
    updateRefreshIntervalIdSpy.called.should.be.true();
  });

  it('should update refreshIntervalId value when stop timeline ', function () {
    const updateRefreshIntervalIdSpy = spy();
    instance = renderIntoDocument(
      <AnimatedSocialGraph
        officers={ officers }
        refreshIntervalId={ 1234 }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        updateRefreshIntervalId={ updateRefreshIntervalIdSpy }
      />
    );

    const socialGraph = findRenderedComponentWithType(instance, SocialGraph);

    socialGraph.props.stopTimeline();
    updateRefreshIntervalIdSpy.calledWith(null).should.be.true();
  });

  it('should call stopTimeline when componentWillUnmount', function () {
    instance = renderIntoDocument(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    const stopTimelineSpy = spy(instance, 'stopTimeline');
    unmountComponentSuppressError(instance);
    stopTimelineSpy.called.should.be.true();
  });

  it('should call toggleFullscreen when click on fullscreen button', function () {
    stub(intercomUtils, 'showIntercomLauncher');
    instance = renderIntoDocument(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        hasIntercom={ true }
      />
    );

    const fullscreenButton = findRenderedDOMComponentWithClass(instance, 'fullscreen-btn');
    fullscreenButton.className.should.containEql('expand-icon');
    instance.state.fullscreen.should.be.false();
    Simulate.click(fullscreenButton);

    fullscreenButton.className.should.containEql('compress-icon');
    intercomUtils.showIntercomLauncher.calledWith(false).should.be.true();
    instance.state.fullscreen.should.be.true();
    Simulate.click(fullscreenButton);

    fullscreenButton.className.should.containEql('expand-icon');
    intercomUtils.showIntercomLauncher.calledWith(true).should.be.true();
    instance.state.fullscreen.should.be.false();
    intercomUtils.showIntercomLauncher.restore();
  });

  it('should render fullscreen-btn with a link when expandedLink is present', function () {
    instance = renderIntoDocument(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        expandedLink={ 'expanded_link' }
      />
    );

    const fullscreenButton = findRenderedDOMComponentWithClass(instance, 'fullscreen-btn');
    fullscreenButton.getAttribute('href').should.eql('expanded_link');
  });
});

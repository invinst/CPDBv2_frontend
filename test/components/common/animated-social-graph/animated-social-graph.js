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
import should from 'should';

import { unmountComponentSuppressError, reRender } from 'utils/test';
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
    currentDate.textContent.should.eql('1988-10-03');
    slider.props.step.should.eql(1);
    slider.props.min.should.eql(0);
    slider.props.max.should.eql(9);
    slider.props.defaultValue.should.eql(0);
    slider.props.value.should.eql(0);

    instance.setState({ timelineIdx: 1 });
    currentDate.textContent.should.eql('1989-12-11');
    slider.props.value.should.eql(1);
  });

  it('should not render graph control panel if there is no event', function () {
    instance = renderIntoDocument(<AnimatedSocialGraph/>);
    scryRenderedDOMComponentsWithClass(instance, 'graph-control-panel').should.have.length(0);
  });

  it('should call toggle timeline', function () {
    const clock = useFakeTimers();
    instance = renderIntoDocument(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    const toggleTimelineButton = findRenderedDOMComponentWithClass(instance, 'toggle-timeline-btn');

    instance.state.refreshIntervalId.should.not.be.null();
    instance.state.timelineIdx.should.equal(0);
    clock.tick(150);
    instance.state.timelineIdx.should.equal(1);
    toggleTimelineButton.className.should.containEql('pause-icon');

    Simulate.click(toggleTimelineButton);
    should(instance.state.refreshIntervalId).be.null();
    instance.state.timelineIdx.should.equal(1);
    toggleTimelineButton.className.should.containEql('play-icon');

    Simulate.click(toggleTimelineButton);
    instance.state.refreshIntervalId.should.not.be.null();
    instance.state.timelineIdx.should.equal(1);
    toggleTimelineButton.className.should.containEql('pause-icon');

    clock.tick(1350);
    instance.state.timelineIdx.should.equal(9);
    should(instance.state.refreshIntervalId).be.null();

    Simulate.click(toggleTimelineButton);
    instance.state.timelineIdx.should.equal(0);
    instance.state.refreshIntervalId.should.not.be.null();
    clock.restore();
  });

  it('should update timelineIdx value when click on specific part of the timeline ', function () {
    instance = renderIntoDocument(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    instance.state.timelineIdx.should.equal(0);
    const coaccusalsThresholdSlider = findRenderedComponentWithType(instance, Slider);
    coaccusalsThresholdSlider.props.onChange(5);
    instance.state.timelineIdx.should.equal(5);
  });

  it('should update refreshIntervalId and timelineIdx values when startTimelineFromBeginning', function () {
    const clock = useFakeTimers();
    instance = renderIntoDocument(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    const socialGraph = findRenderedComponentWithType(instance, SocialGraph);
    clock.tick(150);
    instance.state.timelineIdx.should.equal(1);
    const oldRefreshInterval = instance.state.refreshIntervalId;
    socialGraph.props.startTimelineFromBeginning();

    instance.state.timelineIdx.should.equal(0);
    instance.state.refreshIntervalId.should.not.be.null();
    instance.state.refreshIntervalId.should.not.eql(oldRefreshInterval);
    clock.restore();
  });

  it('should update refreshIntervalId value when stop timeline ', function () {
    const clock = useFakeTimers();
    instance = renderIntoDocument(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    const socialGraph = findRenderedComponentWithType(instance, SocialGraph);

    clock.tick(150);
    instance.state.timelineIdx.should.equal(1);

    socialGraph.props.stopTimeline();
    should(instance.state.refreshIntervalId).be.null();
    instance.state.timelineIdx.should.equal(1);
    clock.restore();
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

  it('should called startTimeline when visible', function () {
    instance = renderIntoDocument(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        expandedLink={ 'expanded_link' }
      />
    );

    const startTimelineSpy = spy(instance, 'startTimeline');

    instance.setState({ isFirstTime: false });
    instance = reRender(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        expandedLink={ 'expanded_link' }
        isVisible={ true }
      />,
      instance
    );

    startTimelineSpy.should.be.called();
  });

  it('should called stopTimeline when invisible', function () {
    instance = renderIntoDocument(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        expandedLink={ 'expanded_link' }
      />
    );

    const stopTimelineSpy = spy(instance, 'stopTimeline');

    instance.setState({ isFirstTime: false });
    instance = reRender(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        expandedLink={ 'expanded_link' }
        isVisible={ false }
      />,
      instance
    );

    stopTimelineSpy.should.be.called();
  });
});

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
import AnimatedSocialGraph, { AnimatedSocialGraphWithSpinner } from 'components/common/animated-social-graph';
import SocialGraph from 'components/common/animated-social-graph/social-graph';
import LoadingSpinner from 'components/common/loading-spinner';
import graphStyles from 'components/common/animated-social-graph/animated-social-graph.sass';


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
        isVisible={ true }
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

  context('withLoadingSpinner', function () {
    it('should render LoadingSpinner only if requesting is true', function () {
      instance = renderIntoDocument(
        <AnimatedSocialGraphWithSpinner
          officers={ officers }
          coaccusedData={ coaccusedData }
          listEvent={ listEvent }
          requesting={ true }
        />
      );

      scryRenderedComponentsWithType(instance, SocialGraph).should.have.length(0);
      scryRenderedDOMComponentsWithClass(instance, 'graph-control-panel').should.have.length(0);

      const loadingSpinner = findRenderedComponentWithType(instance, LoadingSpinner);
      loadingSpinner.props.className.should.equal(graphStyles.socialGraphLoading);
    });
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

  it('should render expanded-mode-btn with a link when expandedLink is present', function () {
    instance = renderIntoDocument(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        expandedLink='expanded_link'
      />
    );

    const expandedModeButton = findRenderedDOMComponentWithClass(instance, 'expanded-mode-btn');
    expandedModeButton.getAttribute('href').should.eql('expanded_link');
  });

  it('should render customRightControlButton if present', function () {
    const onClickStub = stub();
    const customRightControlButton = (
      <div className='toggle-sidebars-btn' onClick={ onClickStub }/>
    );
    instance = renderIntoDocument(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        customRightControlButton={ customRightControlButton }
      />
    );

    const toggleSidebarsButton = findRenderedDOMComponentWithClass(instance, 'toggle-sidebars-btn');
    Simulate.click(toggleSidebarsButton);
    onClickStub.should.be.called();
  });
});

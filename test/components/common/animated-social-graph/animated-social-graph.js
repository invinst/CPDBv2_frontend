import React from 'react';
import { shallow, mount } from 'enzyme';
import { useFakeTimers, spy, stub } from 'sinon';
import Slider from 'rc-slider';

import AnimatedSocialGraph, { AnimatedSocialGraphWithSpinner } from 'components/common/animated-social-graph';
import SocialGraph from 'components/common/animated-social-graph/social-graph';
import LoadingSpinner from 'components/common/loading-spinner';
import graphStyles from 'components/common/animated-social-graph/animated-social-graph.sass';


describe('AnimatedSocialGraph component', function () {
  const officers = [
    {
      fullName: 'Jerome Finnigan',
      id: 1,
    },
    {
      fullName: 'Edward May',
      id: 2,
    },
  ];
  const coaccusedData = [
    {
      officerId1: 1,
      officerId2: 2,
      incidentDate: '1988-10-03',
      accussedCount: 1,
    },
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
    '1991-03-06',
  ];

  it('should render all sections correctly', function () {
    const wrapper = shallow(
      <AnimatedSocialGraph
        timelineIdx={ 1 }
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    wrapper.find(SocialGraph).exists().should.be.true();
    wrapper.find('.graph-control-panel').exists().should.be.true();

    const slider = wrapper.find(Slider);
    const currentDate = wrapper.find('.current-date-label');
    wrapper.find('.start-date-label').text().should.equal('1988-10-03');
    wrapper.find('.end-date-label').text().should.equal('1991-03-06');
    currentDate.text().should.equal('1989-12-11');
    slider.prop('step').should.equal(1);
    slider.prop('min').should.equal(0);
    slider.prop('max').should.equal(9);
    slider.prop('defaultValue').should.equal(0);
    slider.prop('value').should.equal(1);
  });

  it('should start timeline from beginning when mounted', function () {
    const clock = useFakeTimers();
    const updateTimelineIdxSpy = spy();
    mount(
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
    updateTimelineIdxSpy.should.be.calledWith(1);
    clock.restore();
  });

  it('should not render graph control panel if there is no event', function () {
    const wrapper = shallow(<AnimatedSocialGraph/>);
    wrapper.find('.graph-control-panel').exists().should.be.false();
  });

  it('should not render graph control panel if showGraphControlPanel is false', function () {
    const wrapper = shallow(<AnimatedSocialGraph showGraphControlPanel={ false }/>);
    wrapper.find('.graph-control-panel').exists().should.be.false();
  });

  context('withLoadingSpinner', function () {
    it('should render LoadingSpinner only if requesting is true', function () {
      const wrapper = shallow(
        <AnimatedSocialGraphWithSpinner
          officers={ officers }
          coaccusedData={ coaccusedData }
          listEvent={ listEvent }
          requesting={ true }
        />
      );

      wrapper.find(AnimatedSocialGraph).exists().should.be.false();

      const loadingSpinner = wrapper.find(LoadingSpinner);
      loadingSpinner.prop('className').should.equal(graphStyles.socialGraphLoading);
    });

    it('should not render LoadingSpinner only if requesting is false', function () {
      const wrapper = shallow(
        <AnimatedSocialGraphWithSpinner
          timelineIdx={ 0 }
          officers={ officers }
          coaccusedData={ coaccusedData }
          listEvent={ listEvent }
          requesting={ false }
        />
      );

      wrapper.find(AnimatedSocialGraph).exists().should.be.true();
      wrapper.find(LoadingSpinner).exists().should.be.false();
    });
  });

  it('should pause timeline when click on toggle timeline button when timeline is running', function () {
    const updateRefreshIntervalIdSpy = spy();
    const wrapper = shallow(
      <AnimatedSocialGraph
        officers={ officers }
        timelineIdx={ 1 }
        refreshIntervalId={ 1234 }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        updateRefreshIntervalId={ updateRefreshIntervalIdSpy }
      />
    );

    const toggleTimelineButton = wrapper.find('.toggle-timeline-btn');

    toggleTimelineButton.hasClass('pause-icon').should.be.true();

    toggleTimelineButton.simulate('click');
    updateRefreshIntervalIdSpy.should.be.calledWith(null);
  });

  it('should start timeline when click on toggle timeline button when timeline is not running', function () {
    const updateRefreshIntervalIdSpy = spy();
    const wrapper = shallow(
      <AnimatedSocialGraph
        officers={ officers }
        timelineIdx={ 1 }
        refreshIntervalId={ null }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        updateRefreshIntervalId={ updateRefreshIntervalIdSpy }
      />
    );

    const toggleTimelineButton = wrapper.find('.toggle-timeline-btn');

    toggleTimelineButton.hasClass('play-icon').should.be.true();

    toggleTimelineButton.simulate('click');
    updateRefreshIntervalIdSpy.should.be.called();
    updateRefreshIntervalIdSpy.args[0][0].should.not.be.null();
  });

  it('should start timeline from beginning when click on toggle timeline button at the end of timeline', function () {
    const updateTimelineIdxSpy = spy();
    const updateRefreshIntervalIdSpy = spy();
    const wrapper = shallow(
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

    const toggleTimelineButton = wrapper.find('.toggle-timeline-btn');

    toggleTimelineButton.hasClass('play-icon').should.be.true();

    toggleTimelineButton.simulate('click');
    updateTimelineIdxSpy.should.be.calledWith(0);
    updateRefreshIntervalIdSpy.should.be.called();
    updateRefreshIntervalIdSpy.args[0][0].should.not.be.null();
  });

  it('should update timelineIdx value when click on specific part of the timeline ', function () {
    const updateTimelineIdxSpy = spy();
    const wrapper = shallow(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        updateTimelineIdx={ updateTimelineIdxSpy }
      />
    );

    const coaccusalsThresholdSlider = wrapper.find(Slider);
    coaccusalsThresholdSlider.prop('onChange')(5);
    updateTimelineIdxSpy.should.be.calledWith(5);
  });

  it('should update refreshIntervalId and timelineIdx values when startTimelineFromBeginning', function () {
    const updateTimelineIdxSpy = spy();
    const updateRefreshIntervalIdSpy = spy();
    const wrapper = shallow(
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

    const socialGraph = wrapper.find(SocialGraph);
    socialGraph.prop('startTimelineFromBeginning')();

    updateTimelineIdxSpy.should.be.calledWith(0);
    updateRefreshIntervalIdSpy.should.be.called();
  });

  it('should update refreshIntervalId value when stop timeline ', function () {
    const updateRefreshIntervalIdSpy = spy();
    const wrapper = shallow(
      <AnimatedSocialGraph
        officers={ officers }
        refreshIntervalId={ 1234 }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        updateRefreshIntervalId={ updateRefreshIntervalIdSpy }
      />
    );

    const socialGraph = wrapper.find(SocialGraph);

    socialGraph.prop('stopTimeline')();
    updateRefreshIntervalIdSpy.should.be.calledWith(null);
  });

  it('should call stopTimeline when componentWillUnmount', function () {
    const stopTimelineSpy = spy(AnimatedSocialGraph.prototype, 'stopTimeline');
    const wrapper = shallow(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );
    wrapper.unmount();
    stopTimelineSpy.should.be.called();
    stopTimelineSpy.restore();
  });

  it('should render customRightControlButton if present', function () {
    const onClickStub = stub();
    const customRightControlButton = (
      <div className='toggle-sidebars-btn' onClick={ onClickStub }/>
    );
    const wrapper = shallow(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        customRightControlButton={ customRightControlButton }
      />
    );

    const toggleSidebarsButton = wrapper.find('.toggle-sidebars-btn');
    toggleSidebarsButton.simulate('click');
    onClickStub.should.be.called();
  });
});

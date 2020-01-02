import React from 'react';
import { shallow, mount } from 'enzyme';
import should from 'should';
import { stub, useFakeTimers } from 'sinon';

import AnimatedRadarChart from 'components/officer-page/radar-chart';
import RadarExplainer from 'components/officer-page/radar-chart/explainer';
import StaticRadarChart from 'components/common/radar-chart';
import RadarChart from 'components/common/radar-chart/radar-chart';
import * as tracking from 'utils/tracking';
import * as IntercomTracking from 'utils/intercom-tracking';


describe('AnimatedRadarChart components', function () {
  const data = [{
    year: 2015,
    items: [
      { axis: 'Use of Force Reports', value: 20 },
      { axis: 'Civilian Complaints', value: 0 },
      { axis: 'Internal Complaints', value: 10 },
    ],
    textColor: 'black',
    visualTokenBackground: 'white',
  }, {
    year: 2016,
    items: [
      { axis: 'Use of Force Reports', value: 40 },
      { axis: 'Civilian Complaints', value: 50 },
      { axis: 'Internal Complaints', value: 60 },
    ],
    textColor: 'black',
    visualTokenBackground: 'white',
  }, {
    year: 2017,
    items: [
      { axis: 'Use of Force Reports', value: 80 },
      { axis: 'Civilian Complaints', value: 70 },
      { axis: 'Internal Complaints', value: 60 },
    ],
    textColor: 'black',
    visualTokenBackground: 'white',
  }];

  it('should render NoDataRadarChart if no data', function () {
    const wrapper = shallow(<AnimatedRadarChart officerId={ 123 }/>);
    const noDataRadarChart = wrapper.find(StaticRadarChart).dive().find(RadarChart);
    should(noDataRadarChart.prop('data')).be.undefined();
  });

  it('should render NoDataRadarChart if some data is missing', function () {
    const missingData = [{
      year: 2015,
      items: [
        { axis: 'Use of Force Reports', value: NaN },
        { axis: 'Civilian Complaints', value: 0 },
        { axis: 'Internal Complaints', value: 10 },
      ],
      textColor: 'black',
      visualTokenBackground: 'white',
    }, {
      year: 2016,
      items: [
        { axis: 'Use of Force Reports', value: 40 },
        { axis: 'Civilian Complaints', value: NaN },
        { axis: 'Internal Complaints', value: 60 },
      ],
      textColor: 'black',
      visualTokenBackground: 'white',
    }];
    const wrapper = shallow(<AnimatedRadarChart officerId={ 123 } data={ missingData }/>);
    const noDataRadarChart = wrapper.find(StaticRadarChart).dive().find(RadarChart);
    should(noDataRadarChart.prop('data')).be.undefined();
  });

  it('should render if data provided', function () {
    const wrapper = shallow(<AnimatedRadarChart officerId={ 123 } data={ data }/>);
    wrapper.find(StaticRadarChart).exists().should.be.true();
    wrapper.find('.open-explainer-button').exists().should.be.true();
    wrapper.find(RadarExplainer).exists().should.be.false();
  });

  it('should rerender if data change', function () {
    const wrapper = mount(<AnimatedRadarChart officerId={ 123 } data={ [data[0]] }/>);

    wrapper.setProps({ officerId: 123, data: data });
    should(wrapper.instance().timer).not.be.null();
  });

  it('should open the explainer clicking on the radar chart and track this event', function () {
    stub(tracking, 'trackOpenExplainer');
    stub(IntercomTracking, 'trackOpenExplainer');

    const wrapper = shallow(<AnimatedRadarChart officerId={ 123 } data={ data }/>);
    wrapper.find(RadarExplainer).exists().should.be.false();

    wrapper.find('.officer-radar-chart-placeholder').simulate('click');

    wrapper.find(RadarExplainer).exists().should.be.true();
    tracking.trackOpenExplainer.should.be.calledWith(123);
    IntercomTracking.trackOpenExplainer.should.be.calledWith(123);

    tracking.trackOpenExplainer.restore();
    IntercomTracking.trackOpenExplainer.restore();
  });

  it('should not render StaticRadarChart if content is being requested', function () {
    const wrapper = shallow(<AnimatedRadarChart officerId={ 123 } isRequesting={ true }/>);
    wrapper.find(StaticRadarChart).exists().should.be.false();
  });

  describe('test animate', function () {
    let clock;
    beforeEach(function () {
      clock = useFakeTimers();

    });

    afterEach(function () {
      clock.restore();
    });

    it('should not animate if data length is 1', function () {
      const compactData = [data[0]];
      const wrapper = shallow(
        <AnimatedRadarChart officerId={ 123 } data={ compactData }/>
      );
      const instance = wrapper.instance();

      should(instance.timer).be.null();
      clock.tick(30);
      should(instance.timer).be.null();
      wrapper.state('transitionValue').should.equal(0);
    });

    it('should change transition value after mounting', function () {
      const wrapper = mount(
        <AnimatedRadarChart officerId={ 123 } data={ data }/>
      );

      wrapper.state('transitionValue').should.equal(0);

      clock.tick(25);
      wrapper.state('transitionValue').should.equal(wrapper.instance().velocity);

      clock.tick(500);
      wrapper.state('transitionValue').should.equal(2);

    });

    it('should end animation and start animation again when the explainer is closed', function () {
      const wrapper = mount(<AnimatedRadarChart officerId={ 123 } data={ data }/>);
      wrapper.find(RadarExplainer).exists().should.be.false();

      wrapper.find('.officer-radar-chart-placeholder').simulate('click');

      wrapper.state('transitionValue').should.equal(2);

      const explainer = wrapper.find(RadarExplainer);
      const closeButton = explainer.find('.radar-explainer-close-button');

      closeButton.simulate('click');

      wrapper.state('transitionValue').should.equal(0);
      wrapper.find(RadarExplainer).exists().should.be.false();

      clock.tick(25);
      wrapper.state('transitionValue').should.equal(wrapper.instance().velocity);
    });

    it('should not animate to years that data is missing', function () {
      const missingData = [{
        year: 2013,
        items: [
          { axis: 'Use of Force Reports', value: 20 },
          { axis: 'Civilian Complaints', value: NaN },
          { axis: 'Internal Complaints', value: 10 },
        ],
        textColor: 'black',
        visualTokenBackground: 'white',
      }, {
        year: 2014,
        items: [
          { axis: 'Use of Force Reports', value: 20 },
          { axis: 'Civilian Complaints', value: 0 },
          { axis: 'Internal Complaints', value: 10 },
        ],
        textColor: 'black',
        visualTokenBackground: 'white',
      }, {
        year: 2015,
        items: [
          { axis: 'Use of Force Reports', value: NaN },
          { axis: 'Civilian Complaints', value: 0 },
          { axis: 'Internal Complaints', value: 10 },
        ],
        textColor: 'black',
        visualTokenBackground: 'white',
      }, {
        year: 2016,
        items: [
          { axis: 'Use of Force Reports', value: 40 },
          { axis: 'Civilian Complaints', value: 50 },
          { axis: 'Internal Complaints', value: 60 },
        ],
        textColor: 'black',
        visualTokenBackground: 'white',
      }, {
        year: 2017,
        items: [
          { axis: 'Use of Force Reports', value: 80 },
          { axis: 'Civilian Complaints', value: 70 },
          { axis: 'Internal Complaints', value: NaN },
        ],
        textColor: 'black',
        visualTokenBackground: 'white',
      }];
      const wrapper = mount(<AnimatedRadarChart officerId={ 123 } data={ missingData }/>);
      const instance = wrapper.instance();

      wrapper.state('transitionValue').should.equal(0);
      instance.animatedData.should.have.length(2);
      instance.animatedData[0].year.should.equal(2014);

      clock.tick(25);
      wrapper.state('transitionValue').should.equal(instance.velocity);
      wrapper.find(StaticRadarChart).prop('legendText').should.equal(2016);
      wrapper.find(StaticRadarChart).prop('fadeOutLegend').should.be.false();

      clock.tick(200);
      wrapper.find(StaticRadarChart).prop('legendText').should.equal(2016);
      wrapper.find(StaticRadarChart).prop('fadeOutLegend').should.be.true();
    });
  });
});

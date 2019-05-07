import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  Simulate,
} from 'react-addons-test-utils';
import { Link } from 'react-router';
import { stub } from 'sinon';
import should from 'should';

import { unmountComponentSuppressError } from 'utils/test';
import RelevantCoaccusalCard from 'components/pinboard-page/relevant/relevant-coaccusals/relevant-coaccusal-card';
import StaticRadarChart from 'components/common/radar-chart';
import PlusButton from 'components/pinboard-page/relevant/common/plus-button';


describe('RelevantCoaccusalCard component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render enough content correctly', function () {
    const addItemInPinboardPageStub = stub();

    instance = renderIntoDocument(
      <RelevantCoaccusalCard
        addItemInPinboardPage={ addItemInPinboardPageStub }
        id={ 123 }
        fullName='Jerome Finnigan'
        rank='Officer'
        coaccusalCount={ 11 }
        percentile={ {
          officerId: 123,
          year: 2015,
          items: [
            { axis: 'Use of Force Reports', value: 20.6, },
            { axis: 'Officer Allegations', value: 10.1, },
            { axis: 'Civilian Allegations', value: 52.5, },
          ],
          visualTokenBackground: '#ed7467',
        } }
      />
    );

    const link = findRenderedComponentWithType(instance, Link);
    link.props.to.should.eql('/officer/123/jerome-finnigan/');

    const radarChart = findRenderedComponentWithType(instance, StaticRadarChart);
    radarChart.props.data.should.eql([
      { axis: 'Use of Force Reports', value: 20.6, },
      { axis: 'Officer Allegations', value: 10.1, },
      { axis: 'Civilian Allegations', value: 52.5, },
    ]);
    radarChart.props.width.should.eql(148);
    radarChart.props.height.should.eql(60);
    radarChart.props.radius.should.eql(28);
    radarChart.props.offsetTop.should.eql(2);
    radarChart.props.backgroundColor.should.eql('#ed7467');

    findRenderedDOMComponentWithClass(instance, 'light-text officer-card-rank').textContent.should.eql('Officer');
    findRenderedDOMComponentWithClass(
      instance, 'bold-text officer-card-name'
    ).textContent.should.eql('Jerome Finnigan');
    findRenderedDOMComponentWithClass(instance, 'coaccusal-count').textContent.should.eql('11 coaccusals');

    const plusButton = findRenderedComponentWithType(instance, PlusButton);
    Simulate.click(findDOMNode(plusButton));

    addItemInPinboardPageStub.should.calledOnce();
    addItemInPinboardPageStub.should.calledWith({ type: 'OFFICER', id: '123' });
  });

  it('should render pluralize coaccusalCount and handle no percentile data', function () {
    const addItemInPinboardPageStub = stub();

    instance = renderIntoDocument(
      <RelevantCoaccusalCard
        addItemInPinboardPage={ addItemInPinboardPageStub }
        id={ 123 }
        fullName='Jerome Finnigan'
        rank='Officer'
        coaccusalCount={ 1 }
        percentile={ {} }
      />
    );

    const link = findRenderedComponentWithType(instance, Link);
    link.props.to.should.eql('/officer/123/jerome-finnigan/');

    const radarChart = findRenderedComponentWithType(instance, StaticRadarChart);
    should(radarChart.props.data).be.undefined();
    radarChart.props.width.should.eql(148);
    radarChart.props.height.should.eql(60);
    radarChart.props.radius.should.eql(28);
    radarChart.props.offsetTop.should.eql(2);
    should(radarChart.props.backgroundColor).be.undefined();

    findRenderedDOMComponentWithClass(instance, 'light-text officer-card-rank').textContent.should.eql('Officer');
    findRenderedDOMComponentWithClass(
      instance, 'bold-text officer-card-name'
    ).textContent.should.eql('Jerome Finnigan');
    findRenderedDOMComponentWithClass(instance, 'coaccusal-count').textContent.should.eql('1 coaccusal');
  });
});

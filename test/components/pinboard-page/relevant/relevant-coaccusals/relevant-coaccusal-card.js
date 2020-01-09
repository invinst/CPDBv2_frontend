import React from 'react';
import { mount } from 'enzyme';
import { stub, useFakeTimers, spy } from 'sinon';
import should from 'should';

import RelevantCoaccusalCard, { RelevantCoaccusalCardWithUndo }
  from 'components/pinboard-page/relevant/relevant-coaccusals/relevant-coaccusal-card';
import StaticRadarChart from 'components/common/radar-chart';
import PlusButton from 'components/pinboard-page/relevant/common/plus-button';
import { UNDO_CARD_VISIBLE_TIME } from 'utils/constants';


describe('RelevantCoaccusalCard component', function () {
  it('should render enough content correctly', function () {
    const addItemInPinboardPageStub = stub();

    const wrapper = mount(
      <RelevantCoaccusalCard
        addItemInPinboardPage={ addItemInPinboardPageStub }
        id={ 123 }
        fullName='Jerome Finnigan'
        rank='Officer'
        coaccusalCount={ 11 }
        complaintCount={ 22 }
        percentile={ {
          officerId: 123,
          year: 2015,
          items: [
            { axis: 'Use of Force Reports', value: 20.6 },
            { axis: 'Officer Allegations', value: 10.1 },
            { axis: 'Civilian Allegations', value: 52.5 },
          ],
          visualTokenBackground: '#ed7467',
        } }
        rawData={ {
          'id': 123,
          'full_name': 'Jerome Finnigan',
          'rank': 'Officer',
          'complaint_count': 22,
          'percentile': {
            'percentile_trr': 20.6,
            'percentile_allegation_internal': 10.1,
            'percentile_allegation_civilian': 52.5,
          },
        } }
      />
    );

    const radarChart = wrapper.find(StaticRadarChart);
    radarChart.prop('data').should.eql([
      { axis: 'Use of Force Reports', value: 20.6 },
      { axis: 'Officer Allegations', value: 10.1 },
      { axis: 'Civilian Allegations', value: 52.5 },
    ]);
    radarChart.prop('width').should.equal(148);
    radarChart.prop('height').should.equal(60);
    radarChart.prop('radius').should.equal(28);
    radarChart.prop('offsetTop').should.equal(2);
    radarChart.prop('backgroundColor').should.equal('#ed7467');

    wrapper.find('.light-text.officer-card-rank').text().should.equal('Officer');
    wrapper.find('.bold-text.officer-card-name').text().should.equal('Jerome Finnigan');
    wrapper.find('.coaccusal-count').text().should.equal('11 coaccusals');

    const plusButton = wrapper.find(PlusButton);
    plusButton.simulate('click');

    addItemInPinboardPageStub.should.calledOnce();
    addItemInPinboardPageStub.should.calledWith({
      type: 'OFFICER',
      id: 123,
      rawData: {
        'id': 123,
        'full_name': 'Jerome Finnigan',
        'rank': 'Officer',
        'complaint_count': 22,
        'percentile': {
          'percentile_trr': 20.6,
          'percentile_allegation_internal': 10.1,
          'percentile_allegation_civilian': 52.5,
        },
      },
    });
  });

  it('should render pluralize coaccusalCount and handle no percentile data', function () {
    const addItemInPinboardPageStub = stub();

    const wrapper = mount(
      <RelevantCoaccusalCard
        addItemInPinboardPage={ addItemInPinboardPageStub }
        id={ 123 }
        fullName='Jerome Finnigan'
        rank='Officer'
        coaccusalCount={ 1 }
        percentile={ {} }
      />
    );

    const radarChart = wrapper.find(StaticRadarChart);
    should(radarChart.props.data).be.undefined();
    radarChart.prop('width').should.equal(148);
    radarChart.prop('height').should.equal(60);
    radarChart.prop('radius').should.equal(28);
    radarChart.prop('offsetTop').should.equal(2);
    should(radarChart.props.backgroundColor).be.undefined();

    wrapper.find('.light-text.officer-card-rank').text().should.equal('Officer');
    wrapper.find('.bold-text.officer-card-name').text().should.equal('Jerome Finnigan');
    wrapper.find('.coaccusal-count').text().should.equal('1 coaccusal');
  });

  it('should trigger addItemInPinboardPage when clicked on PlusButton', function () {
    const addItemInPinboardPageStub = stub();

    const wrapper = mount(
      <RelevantCoaccusalCard
        addItemInPinboardPage={ addItemInPinboardPageStub }
        id={ 123 }
        fullName='Jerome Finnigan'
        rank='Officer'
        coaccusalCount={ 1 }
        percentile={ {} }
        rawData={ {
          'id': 123,
          'full_name': 'Jerome Finnigan',
          'rank': 'Officer',
          'complaint_count': 22,
          'percentile': {
            'percentile_trr': 20.6,
            'percentile_allegation_internal': 10.1,
            'percentile_allegation_civilian': 52.5,
          },
        } }
      />
    );

    const plusButton = wrapper.find(PlusButton);
    plusButton.simulate('click');

    addItemInPinboardPageStub.calledWith({
      type: 'OFFICER',
      id: 123,
      rawData: {
        'id': 123,
        'full_name': 'Jerome Finnigan',
        'rank': 'Officer',
        'complaint_count': 22,
        'percentile': {
          'percentile_trr': 20.6,
          'percentile_allegation_internal': 10.1,
          'percentile_allegation_civilian': 52.5,
        },
      },
    });
  });

  describe('RelevantCoaccusalCardWithUndo component', function () {
    let clock;

    beforeEach(function () {
      clock = useFakeTimers();
    });

    afterEach(function () {
      clock.restore();
    });

    it('should render remove text correctly', function () {
      const wrapper = mount(
        <RelevantCoaccusalCardWithUndo
          id={ 123 }
          fullName='Jerome Finnigan'
          rank='Officer'
          coaccusalCount={ 1 }
          percentile={ {} }
        />
      );
      const plusButton = wrapper.find(PlusButton);

      plusButton.simulate('click');

      wrapper.find('.text').text().should.equal('Jerome Finnigan added.');
    });

    it('should not be reversed after the undo card disappears', function () {
      const wrapper = mount(
        <RelevantCoaccusalCardWithUndo
          id={ 123 }
          fullName='Jerome Finnigan'
          rank='Officer'
          coaccusalCount={ 1 }
          percentile={ {} }
        />
      );

      const plusButton = wrapper.find(PlusButton);

      plusButton.simulate('click');

      clock.tick(UNDO_CARD_VISIBLE_TIME + 50);

      wrapper.find(RelevantCoaccusalCard).exists().should.be.false();
    });
  });

  it('should handle on focus', function () {
    const focusItem = spy();

    const wrapper = mount(
      <RelevantCoaccusalCardWithUndo
        id={ 123 }
        focusItem={ focusItem }
      />
    );

    const div = wrapper.find('.officer-name-wrapper');

    div.simulate('click');

    focusItem.should.be.calledWith({ type: 'OFFICER', 'id': 123 });
  });

  it('should remove item if pin status changed', function () {
    const addItemInPinboardPage = spy();
    const wrapper = mount(
      <RelevantCoaccusalCard
        id={ 123 }
        fullName='Jerome Finnigan'
        rank='Officer'
        coaccusalCount={ 1 }
        complaintCount={ 1 }
        percentile={ {} }
        addItemInPinboardPage={ addItemInPinboardPage }
        rawData={ {
          'id': 123,
          'full_name': 'Jerome Finnigan',
          'rank': 'Officer',
          'complaint_count': 22,
          'percentile': {
            'percentile_trr': 20.6,
            'percentile_allegation_internal': 10.1,
            'percentile_allegation_civilian': 52.5,
          },
        } }
      />
    );

    wrapper.setProps({
      id: 123,
      fullName: 'Jerome Finnigan',
      rank: 'Officer',
      coaccusalCount: 1,
      complaintCount: 1,
      percentile: {},
      addItemInPinboardPage: addItemInPinboardPage,
      isPinStatusChanging: true,
      rawData: {
        'id': 123,
        'full_name': 'Jerome Finnigan',
        'rank': 'Officer',
        'complaint_count': 22,
        'percentile': {
          'percentile_trr': 20.6,
          'percentile_allegation_internal': 10.1,
          'percentile_allegation_civilian': 52.5,
        },
      },
    });

    addItemInPinboardPage.should.be.calledWith({
      type: 'OFFICER',
      id: 123,
      rawData: {
        'id': 123,
        'full_name': 'Jerome Finnigan',
        'rank': 'Officer',
        'complaint_count': 22,
        'percentile': {
          'percentile_trr': 20.6,
          'percentile_allegation_internal': 10.1,
          'percentile_allegation_civilian': 52.5,
        },
      },
    });
  });
});

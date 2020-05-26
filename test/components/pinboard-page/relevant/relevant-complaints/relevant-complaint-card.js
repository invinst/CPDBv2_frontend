import React from 'react';
import { mount } from 'enzyme';
import should from 'should';
import { stub, useFakeTimers } from 'sinon';

import RelevantComplaintCard, { RelevantComplaintCardWithUndo }
  from 'components/pinboard-page/relevant/relevant-complaints/relevant-complaint-card';
import BaseComplaintCard from 'components/pinboard-page/relevant/common/base-complaint-card';
import PlusButton from 'components/pinboard-page/relevant/common/plus-button';
import { UNDO_CARD_VISIBLE_TIME } from 'utils/constants';


describe('RelevantComplaintCard component', function () {
  const addItemInPinboardPageStub = stub();
  const officers = [{
    fullName: 'Scott Mc Kenna',
    id: 32172,
    shortName: 'S. Kenna',
    percentile: {
      textColor: '#DFDFDF',
      visualTokenBackground: '#f0201e',
      items: [
        { axis: 'Use of Force Reports', value: 63.0035 },
        { axis: 'Officer Allegations', value: 88.3297 },
        { axis: 'Civilian Allegations', value: 98.7841 },
      ],
    },
  }, {
    fullName: 'Edwin Utreras',
    id: 32384,
    shortName: 'E. Utreras',
    percentile: {
      textColor: '#DFDFDF',
      visualTokenBackground: '#f0201e',
      items: [
        { axis: 'Use of Force Reports', value: 78.2707 },
        { axis: 'Officer Allegations', value: 0 },
        { axis: 'Civilian Allegations', value: 98.5549 },
      ],
    },
  }, {
    fullName: 'Joy Mcclain',
    id: 32176,
    shortName: 'J. Mcclain',
    percentile: {
      textColor: '#DFDFDF',
      visualTokenBackground: '#F52524',
      items: [
        { axis: 'Use of Force Reports', value: 84.1654 },
        { axis: 'Officer Allegations', value: 0 },
        { axis: 'Civilian Allegations', value: 97.0899 },
      ],
    },
  }];

  it('should render enough content correctly', function () {
    const wrapper = mount(
      <RelevantComplaintCard
        crid='123'
        incidentDate='Feb 1, 2018'
        category='False Arrest'
        officers={ officers }
        point={ { lat: 41.7924183, lon: -87.668458 } }
        addItemInPinboardPage={ addItemInPinboardPageStub }
      />
    );

    const baseComplaintCard = wrapper.find(BaseComplaintCard);
    baseComplaintCard.prop('crid').should.equal('123');
    baseComplaintCard.prop('incidentDate').should.equal('Feb 1, 2018');
    baseComplaintCard.prop('category').should.equal('False Arrest');
    baseComplaintCard.prop('officers').should.eql(officers);
    baseComplaintCard.prop('point').should.eql({ lat: 41.7924183, lon: -87.668458 });
    baseComplaintCard.prop('addItemInPinboardPage').should.eql(addItemInPinboardPageStub);
    baseComplaintCard.prop('leftChild').props.style.should.eql({
      background: 'url("https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/' +
        'url-https%3A%2F%2Fcpdbv21777.blob.core.windows.net%2Fassets%2Fmap-marker.png' +
        '(-87.668458,41.7924183)/-87.668458,41.7924183,12,0,0/130x176@2x?access_token' +
        '=pk.eyJ1IjoiaW52aXNpYmxlaW5zdGl0dXRlIiwiYSI6ImNpZ256bXRqMDAwMDBzeGtud3VoZGpl' +
        'NHMifQ.ky2VSGEYU5KritRMArHY-w") no-repeat center/cover',
    });
  });

  it('should render when no point', function () {
    const addItemInPinboardPageStub = stub();

    const wrapper = mount(
      <RelevantComplaintCard
        crid='123'
        incidentDate='Feb 1, 2018'
        category='False Arrest'
        officers={ [] }
        point={ null }
        addItemInPinboardPage={ addItemInPinboardPageStub }
      />
    );

    const baseComplaintCard = wrapper.find(BaseComplaintCard);
    baseComplaintCard.prop('crid').should.equal('123');
    baseComplaintCard.prop('incidentDate').should.equal('Feb 1, 2018');
    baseComplaintCard.prop('category').should.equal('False Arrest');
    baseComplaintCard.prop('officers').should.eql([]);
    should(baseComplaintCard.prop('point')).be.null();
    baseComplaintCard.prop('addItemInPinboardPage').should.eql(addItemInPinboardPageStub);
    should(baseComplaintCard.prop('leftChild').props.style).be.null();
  });

  describe('RelevantComplaintCardWithUndo component', function () {
    let clock;

    beforeEach(function () {
      clock = useFakeTimers();
    });

    it('should render remove text correctly', function () {
      const wrapper = mount(
        <RelevantComplaintCardWithUndo
          crid='123'
          incidentDate='Feb 1, 2018'
          category='False Arrest'
          officers={ officers }
          point={ { lat: 41.7924183, lon: -87.668458 } }
          addItemInPinboardPage={ addItemInPinboardPageStub }
        />
      );
      const plusButton = wrapper.find(PlusButton);

      plusButton.simulate('click');

      wrapper.find('.text').text().should.equal('Complaint added.');
    });

    it('should not be reversed after the undo card disappears', function () {
      const wrapper = mount(
        <RelevantComplaintCardWithUndo
          crid='123'
          incidentDate='Feb 1, 2018'
          category='False Arrest'
          officers={ officers }
          point={ { lat: 41.7924183, lon: -87.668458 } }
          addItemInPinboardPage={ addItemInPinboardPageStub }
        />
      );

      const plusButton = wrapper.find(PlusButton);

      plusButton.simulate('click');

      clock.tick(UNDO_CARD_VISIBLE_TIME + 50);

      wrapper.find(RelevantComplaintCard).exists().should.be.false();
    });
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { stub } from 'sinon';

import Item from 'components/social-graph-page/network/right-pane-section/timeline/item';
import Cr from 'components/social-graph-page/network/right-pane-section/timeline/item/cr';
import Year from 'components/social-graph-page/network/right-pane-section/timeline/item/year';


describe('Item component', function () {
  const allegationItem = {
    kind: 'CR',
    crid: '123456',
    incidentDate: 'OCT 8',
    year: 2006,
    category: 'Use of Force',
    attachments: [],
    key: '123456',
    timelineIdx: 0,
  };
  const yearItem = {
    kind: 'YEAR',
    year: 2005,
    hasData: true,
    key: '123456',
  };

  it('should render allegation item correctly', function () {
    const wrapper = shallow(
      <Item
        item={ allegationItem }
      />
    );
    const allegationRow = wrapper.find(Cr);
    allegationRow.exists().should.be.true();
  });

  it('should render year item correctly', function () {
    const wrapper = shallow(
      <Item
        item={ yearItem }
      />
    );
    const yearRow = wrapper.find(Year);
    yearRow.exists().should.be.true();
  });

  describe('shouldComponentUpdate', function () {
    it('should return true if item is changed', function () {
      const wrapper = shallow(
        <Item
          item={ allegationItem }
        />
      );
      wrapper.instance().shouldComponentUpdate({ item: yearItem }).should.be.true();
    });

    it('should return true if timelineIdx is changed and item is active', function () {
      const wrapper = shallow(
        <Item
          item={ allegationItem }
          timelineIdx={ 0 }
        />
      );
      wrapper.instance().shouldComponentUpdate({ item: allegationItem, timelineIdx: 1 }).should.be.true();
    });

    it('should return true if timelineIdx is changed and item will be active', function () {
      const wrapper = shallow(
        <Item
          item={ allegationItem }
          timelineIdx={ 1 }
        />
      );
      wrapper.instance().shouldComponentUpdate({ item: allegationItem, timelineIdx: 0 }).should.be.true();
    });

    it('should return false if item and timelineIdx is not changed', function () {
      const wrapper = shallow(
        <Item
          item={ allegationItem }
          timelineIdx={ 1 }
        />
      );
      wrapper.instance().shouldComponentUpdate({ item: allegationItem, timelineIdx: 1 }).should.be.false();
    });

    it('should return false if timelineIdx is changed and item is not active and will not be active', function () {
      const wrapper = shallow(
        <Item
          item={ allegationItem }
          timelineIdx={ 1 }
        />
      );
      wrapper.instance().shouldComponentUpdate({ item: allegationItem, timelineIdx: 2 }).should.be.false();
    });

    it('should call updateSelectedCrid when clicking if kind is CR', function () {
      const updateSelectedCridStub = stub();
      const wrapper = shallow(
        <Item
          item={ allegationItem }
          updateSelectedCrid={ updateSelectedCridStub }
        />
      );
      wrapper.simulate('click');
      updateSelectedCridStub.should.be.calledWith('123456');
    });

    it('should not call updateSelectedCrid when clicking if kind is not CR', function () {
      const updateSelectedCridStub = stub();
      const wrapper = shallow(
        <Item
          item={ yearItem }
          updateSelectedCrid={ updateSelectedCridStub }
        />
      );
      wrapper.simulate('click');
      updateSelectedCridStub.should.not.be.called();
    });
  });
});

import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  Simulate,
} from 'react-addons-test-utils';
import { stub } from 'sinon';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError } from 'utils/test';
import Item from 'components/social-graph-page/network/right-pane-section/timeline/item';
import Cr from 'components/social-graph-page/network/right-pane-section/timeline/item/cr';
import Year from 'components/social-graph-page/network/right-pane-section/timeline/item/year';


describe('Item component', function () {
  let instance;
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

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render allegation item correctly', function () {
    instance = renderIntoDocument(
      <Item
        item={ allegationItem }
      />
    );
    const allegationRow = scryRenderedComponentsWithType(instance, Cr);
    allegationRow.should.have.length(1);
  });

  it('should render year item correctly', function () {
    instance = renderIntoDocument(
      <Item
        item={ yearItem }
      />
    );
    const yearRow = scryRenderedComponentsWithType(instance, Year);
    yearRow.should.have.length(1);
  });

  describe('shouldComponentUpdate', function () {
    it('should return true if item is changed', function () {
      instance = renderIntoDocument(
        <Item
          item={ allegationItem }
        />
      );
      instance.shouldComponentUpdate({ item: yearItem }).should.be.true();
    });

    it('should return true if timelineIdx is changed and item is active', function () {
      instance = renderIntoDocument(
        <Item
          item={ allegationItem }
          timelineIdx={ 0 }
        />
      );
      instance.shouldComponentUpdate({ item: allegationItem, timelineIdx: 1 }).should.be.true();
    });

    it('should return true if timelineIdx is changed and item will be active', function () {
      instance = renderIntoDocument(
        <Item
          item={ allegationItem }
          timelineIdx={ 1 }
        />
      );
      instance.shouldComponentUpdate({ item: allegationItem, timelineIdx: 0 }).should.be.true();
    });

    it('should return false if item and timelineIdx is not changed', function () {
      instance = renderIntoDocument(
        <Item
          item={ allegationItem }
          timelineIdx={ 1 }
        />
      );
      instance.shouldComponentUpdate({ item: allegationItem, timelineIdx: 1 }).should.be.false();
    });

    it('should return false if timelineIdx is changed and item is not active and will not be active', function () {
      instance = renderIntoDocument(
        <Item
          item={ allegationItem }
          timelineIdx={ 1 }
        />
      );
      instance.shouldComponentUpdate({ item: allegationItem, timelineIdx: 2 }).should.be.false();
    });

    it('should call updateSelectedCrid when clicking if kind is CR', function () {
      const updateSelectedCridStub = stub();
      instance = renderIntoDocument(
        <Item
          item={ allegationItem }
          updateSelectedCrid={ updateSelectedCridStub }
        />
      );
      Simulate.click(findDOMNode(instance));
      updateSelectedCridStub.should.be.calledWith('123456');
    });

    it('should not call updateSelectedCrid when clicking if kind is not CR', function () {
      const updateSelectedCridStub = stub();
      instance = renderIntoDocument(
        <Item
          item={ yearItem }
          updateSelectedCrid={ updateSelectedCridStub }
        />
      );
      Simulate.click(findDOMNode(instance));
      updateSelectedCridStub.should.not.be.called();
    });
  });
});

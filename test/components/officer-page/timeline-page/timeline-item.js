import React from 'react';
import {
  renderIntoDocument, findRenderedComponentWithType, scryRenderedComponentsWithType
} from 'react-addons-test-utils';
import { spy, stub } from 'sinon';
import { Motion } from 'react-motion';

import { TimelineItemType } from 'utils/constants';
import { unmountComponentSuppressError, reRender } from 'utils/test';
import CrItem from 'components/officer-page/timeline-page/cr-item';
import YearItem from 'components/officer-page/timeline-page/year-item';
import UnitItem from 'components/officer-page/timeline-page/unit-item';
import JoinedItem from 'components/officer-page/timeline-page/joined-item';
import { TimelineItem } from 'components/officer-page/timeline-page/timeline-item';


describe('TimelineItem component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    TimelineItem.should.be.renderable();
  });

  it('should render cr item when received a cr item', function () {
    instance = renderIntoDocument(
      <TimelineItem item={ { kind: TimelineItemType.CR } }/>
    );
    findRenderedComponentWithType(instance, CrItem);
  });

  it('should render joined item when received a cr item', function () {
    instance = renderIntoDocument(
      <TimelineItem item={ { kind: TimelineItemType.JOINED } }/>
    );
    findRenderedComponentWithType(instance, JoinedItem);
  });

  it('should render cr item when received a cr item', function () {
    instance = renderIntoDocument(
      <TimelineItem item={ { kind: TimelineItemType.YEAR } }/>
    );
    findRenderedComponentWithType(instance, YearItem);
  });

  it('should render cr item when received a cr item', function () {
    instance = renderIntoDocument(
      <TimelineItem item={ { kind: TimelineItemType.UNIT } }/>
    );
    findRenderedComponentWithType(instance, UnitItem);
  });

  it('should trigger openBottomSheetWithComplaint if click on a CR item', function () {
    const func = spy();
    instance = renderIntoDocument(
      <TimelineItem openBottomSheetWithComplaint={ func } item={ { kind: TimelineItemType.CR } } officerId={ 456 }/>
    );
    const crItem = findRenderedComponentWithType(instance, CrItem);
    crItem.props.onClick(123);
    func.calledWith({ crid: 123, officerId: 456 }).should.be.true();
  });

  describe('selected prop', function () {
    beforeEach(function () {
      stub(TimelineItem.prototype, 'handleContentRef').callsFake(function () {
        this.element = {
          getBoundingClientRect: () => ({ top: 10 })
        };
      });
    });

    afterEach(function () {
      TimelineItem.prototype.handleContentRef.restore();
    });

    it('should invoke onSelected with top when just mounted and selected', function () {
      const onSelected = spy();
      instance = renderIntoDocument(
        <TimelineItem onSelected={ onSelected } selected={ true }/>
      );
      onSelected.calledWith(10).should.be.true();
    });

    it('should invoke onSelected with top when selected become true', function () {
      const onSelected = spy();
      instance = renderIntoDocument(
        <TimelineItem onSelected={ onSelected } selected={ false }/>
      );
      instance = reRender(
        <TimelineItem onSelected={ onSelected } selected={ true }/>,
        instance
      );
      onSelected.calledWith(10).should.be.true();
    });
  });

  it('should render Motion component when flash is true', function () {
    instance = renderIntoDocument(
      <TimelineItem flash={ true }/>
    );
    findRenderedComponentWithType(instance, Motion);
  });

  it('should not render Motion component when flash is false', function () {
    instance = renderIntoDocument(
      <TimelineItem flash={ false }/>
    );
    scryRenderedComponentsWithType(instance, Motion).should.have.length(0);
  });
});

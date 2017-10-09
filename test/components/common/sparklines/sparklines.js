import React from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  scryRenderedDOMComponentsWithTag,
  scryRenderedComponentsWithType,
  findRenderedComponentWithType
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import SimpleSparklines, { width } from 'components/common/sparklines';
import HoverPoint from 'components/common/sparklines/hover-point';


describe('Sparkline components', function () {
  let instance;
  const data = [{
    year: 2001,
    count: 1,
    'sustained_count': 0
  }, {
    year: 2002,
    count: 2,
    'sustained_count': 0
  }, {
    year: 2003,
    count: 3,
    'sustained_count': 1
  }];

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render', function () {
    SimpleSparklines.should.be.renderable();
  });

  it('should draw sparkline with 3 points, 2 line', function () {
    instance = renderIntoDocument(
      <SimpleSparklines data={ data } />
    );
    scryRenderedDOMComponentsWithClass(instance, 'test--sparkline').length.should.eql(1);
    scryRenderedDOMComponentsWithTag(instance, 'circle').length.should.eql(3);
    scryRenderedDOMComponentsWithTag(instance, 'polyline').length.should.eql(2);
  });

  it('should render HoverPoint', function () {
    instance = renderIntoDocument(
      <SimpleSparklines data={ data } />
    );
    scryRenderedComponentsWithType(instance, HoverPoint).length.should.eql(3);
  });

  it('should render a single hover point with 100% width if there is only 1 item', function () {
    const singleData = [{
      year: 2001,
      count: 1,
      'sustained_count': 0
    }];
    instance = renderIntoDocument(
      <SimpleSparklines
        data={ singleData }
      />
    );

    const hoverPoint = findRenderedComponentWithType(instance, HoverPoint);
    hoverPoint.props.width.should.eql(width);
  });

  describe('hoverPointClickHandler()', function () {
    it('should redirect to officer timeline and focus on the selected year', function () {
      const router = { push: spy() };
      const selectMinimapItem = spy();
      const minimapItems = [{ year: 2010, items: [{ index: 1 }] }, { year: 2011, items: [{ index: 2 }] }];
      instance = renderIntoDocument(
        <SimpleSparklines
          data={ data }
          router={ router }
          selectMinimapItem={ selectMinimapItem }
          minimapItems={ minimapItems }
          officerId={ 111 }
        />
      );

      instance.hoverPointClickHandler(2011);
      router.push.calledWith('/officer/111/timeline/').should.be.true();
      selectMinimapItem.calledWith(2).should.be.true();
    });

  });
});

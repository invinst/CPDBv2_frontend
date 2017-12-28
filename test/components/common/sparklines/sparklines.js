import React from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  scryRenderedComponentsWithType,
  findRenderedComponentWithType
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import { getThisYear } from 'utils/date';
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

  it('should render HoverPoint and svg', function () {
    instance = renderIntoDocument(
      <SimpleSparklines data={ data } startYear={ 2001 }/>
    );

    const yearCount = getThisYear() - 2001 + 1;
    scryRenderedComponentsWithType(instance, HoverPoint).length.should.eql(yearCount);
    scryRenderedDOMComponentsWithTag(instance, 'circle').length.should.eql(yearCount);
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
        startYear={ getThisYear() }
      />
    );

    const hoverPoint = findRenderedComponentWithType(instance, HoverPoint);
    hoverPoint.props.width.should.eql(width);
  });

  describe('hoverPointClickHandler()', function () {
    it('should redirect to officer timeline', function () {
      const router = { push: spy() };
      const getTimelineLink = year => `/officer/111/timeline/?race=Black&year=${year}`;
      instance = renderIntoDocument(
        <SimpleSparklines
          data={ data }
          router={ router }
          officerId={ 111 }
          getTimelineLink={ getTimelineLink }
        />
      );

      instance.hoverPointClickHandler(2000);
      router.push.calledWith('/officer/111/timeline/?race=Black&year=2000').should.be.true();
    });

  });

  describe('fillEmptyDataYear', function () {
    it('should fill data', function () {
      const data = [{
        count: 2,
        'sustained_count': 0,
        name: 'Unknown',
        year: 2001
      }, {
        count: 4,
        'sustained_count': 1,
        name: 'Unknown',
        year: 2003
      }, {
        count: 11,
        'sustained_count': 1,
        name: 'Unknown',
        year: 2004
      }];

      SimpleSparklines.prototype.fillEmptyDataYear(data, 2000, 2005).should.eql(
        [{
          count: 0,
          aggCount: 0,
          'sustained_count': 0,
          name: 'Unknown',
          year: 2000,
        }, {
          count: 2,
          aggCount: 2,
          'sustained_count': 0,
          name: 'Unknown',
          year: 2001
        }, {
          count: 0,
          aggCount: 2,
          'sustained_count': 0,
          name: 'Unknown',
          year: 2002
        }, {
          count: 4,
          aggCount: 6,
          'sustained_count': 1,
          name: 'Unknown',
          year: 2003
        }, {
          count: 11,
          aggCount: 17,
          'sustained_count': 1,
          name: 'Unknown',
          year: 2004
        }, {
          count: 0,
          aggCount: 17,
          'sustained_count': 0,
          name: 'Unknown',
          year: 2005
        }]
      );
    });
  });
});

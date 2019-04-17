import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test/index';
import Legend from 'components/common/allegations-map/legend';
import Row from 'components/common/allegations-map/legend/row';


describe('Legend component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render rows correctly', function () {
    const legend = {
      allegationCount: 23,
      unsustainedCount: 20,
      sustainedCount: 3,
      useOfForceCount: 0,
    };
    instance = renderIntoDocument(<Legend legend={ legend } />);
    const legendRow = scryRenderedComponentsWithType(instance, Row);
    legendRow.should.have.length(4);
    legendRow[0].props.number.should.eql(23);
    legendRow[1].props.number.should.eql(20);
    legendRow[2].props.number.should.eql(3);
    legendRow[3].props.number.should.eql(0);
  });

  it('should not render rows with missing value', function () {
    const legend = {
      allegationCount: 23,
      useOfForceCount: 0,
    };
    instance = renderIntoDocument(<Legend legend={ legend } />);
    const legendRow = scryRenderedComponentsWithType(instance, Row);
    legendRow.should.have.length(2);
    legendRow[0].props.number.should.eql(23);
    legendRow[1].props.number.should.eql(0);
  });
});

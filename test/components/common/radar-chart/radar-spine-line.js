import React from 'react';
import { unmountComponentSuppressError } from 'utils/test';
import RadarSpineLine from 'components/common/radar-chart/radar-spine-line';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithTag,
} from 'react-addons-test-utils';


describe('RadarSpineLine component', function () {
  let instance;

  afterEach(function () {
    if (instance) {
      unmountComponentSuppressError(instance);
    }
  });

  it('should draw 3 lines if have 3 axis titles', () => {
    const data = [
      { x: 1, y: 4 },
      { x: 2, y: 5 },
      { x: 3, y: 6 },
    ];
    instance = renderIntoDocument(<RadarSpineLine rPoints={ data }/>);
    findRenderedDOMComponentWithClass(instance, 'test--radar-spine-line');
    scryRenderedDOMComponentsWithTag(instance, 'line').should.have.length(3);
  });

  it('should draw circles if showSpineLinePoint is true', function () {
    const data = [
      { x: 1, y: 4 },
      { x: 2, y: 5 },
      { x: 3, y: 6 },
    ];
    instance = renderIntoDocument(<RadarSpineLine rPoints={ data } showSpineLinePoint={ true }/>);

    scryRenderedDOMComponentsWithTag(instance, 'circle').should.have.length(3);
  });
});

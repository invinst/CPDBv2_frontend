import React from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  findRenderedDOMComponentWithTag,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import RadarGrid from 'components/common/radar-chart/radar-grid';
import { unmountComponentSuppressError } from 'utils/test';


describe('RadarGrid components', function () {
  let instance;

  afterEach(function () {
    if (instance) {
      unmountComponentSuppressError(instance);
    }
  });

  it('should be renderable', function () {
    RadarGrid.should.be.renderable();
  });

  it('should render 5 small triangles', function () {
    instance = renderIntoDocument(
      <RadarGrid radius={ 100 } numAxis={ 3 } maxValue={ 100 } strokeWidth={ 1 }/>
    );

    scryRenderedDOMComponentsWithTag(instance, 'path').should.have.length(5);
  });

  it('should render 1 outer triangle if outerGridOnly is true', function () {
    instance = renderIntoDocument(
      <RadarGrid radius={ 100 } numAxis={ 3 } maxValue={ 100 } strokeWidth={ 1 } outerGridOnly={ true }/>
    );

    findRenderedDOMComponentWithTag(instance, 'path');
    findRenderedDOMComponentWithClass(instance, 'test--radar-grid-5');
  });
});

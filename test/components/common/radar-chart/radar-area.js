import React from 'react';
import { unmountComponentSuppressError } from 'utils/test';
import RadarArea from 'components/common/radar-chart/radar-area';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';

describe('RadarArea components', function () {
  let instance;

  const rPoints = [{
    angle: 1,
    r: 2,
  }, {
    angle: 2,
    r: 1,
  }, {
    angle: 1.5,
    r: 1.5
  }];

  afterEach(function () {
    if (instance) {
      unmountComponentSuppressError(instance);
    }
  });

  it('should be renderable', function () {
    RadarArea.should.be.renderable();
  });

  it('should render if data provided', function () {
    instance = renderIntoDocument(
      <RadarArea rPoints={ rPoints }/>
    );
    findRenderedDOMComponentWithClass(instance, 'test--radar--wrapper');
    findRenderedDOMComponentWithClass(instance, 'test--radar--radar-area');
    findRenderedDOMComponentWithClass(instance, 'test--radar--stroke');
  });

  it('should hide stroke if drawStroke is false', function () {
    instance = renderIntoDocument(
      <RadarArea rPoints={ rPoints } drawStroke={ false }/>
    );
    scryRenderedDOMComponentsWithClass(instance, 'test--radar--stroke').should.have.length(0);
  });

  it('should add extra style if extraStyle is defined', function () {
    instance = renderIntoDocument(
      <RadarArea rPoints={ rPoints } drawStroke={ false }/>
    );
    scryRenderedDOMComponentsWithClass(instance, 'test--radar--stroke').should.have.length(0);
  });
});

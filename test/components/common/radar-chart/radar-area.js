import React from 'react';
import { unmountComponentSuppressError } from 'utils/test';
import RadarArea from 'components/common/radar-chart/radar-area';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';


describe('RadarArea components', function () {
  let instance;

  const rPoints = [{
    angle: 1,
    r: 2,
    value: 10.99,
  }, {
    angle: 2,
    r: 1,
    value: 20.11,
  }, {
    angle: 1.5,
    r: 1.5,
    value: 30.22,
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
    findRenderedDOMComponentWithClass(instance, 'test--radar-wrapper');
    findRenderedDOMComponentWithClass(instance, 'test--radar-radar-area');
    findRenderedDOMComponentWithClass(instance, 'test--radar-stroke');
    scryRenderedDOMComponentsWithClass(instance, 'test--radar-value-text').should.have.length(0);
  });

  it('should show value text if showValueText is true', function () {
    instance = renderIntoDocument(
      <RadarArea rPoints={ rPoints } showValueText={ true }/>
    );
    const textElements = scryRenderedDOMComponentsWithClass(instance, 'test--radar-value-text');
    textElements.should.have.length(3);
    textElements[0].textContent.should.eql('11');
    textElements[1].textContent.should.eql('20');
    textElements[2].textContent.should.eql('30');
  });

  it('should hide stroke if drawStroke is false', function () {
    instance = renderIntoDocument(
      <RadarArea rPoints={ rPoints } drawStroke={ false }/>
    );
    scryRenderedDOMComponentsWithClass(instance, 'test--radar-stroke').should.have.length(0);
  });

  it('should add extra style if extraStyle is defined', function () {
    instance = renderIntoDocument(
      <RadarArea rPoints={ rPoints } drawStroke={ false }/>
    );
    scryRenderedDOMComponentsWithClass(instance, 'test--radar-stroke').should.have.length(0);
  });

  it('should not display radar area and stroke when rPoints is not valid', () => {
    instance = renderIntoDocument(
      <RadarArea rPoints={ [
        { angle: 0, r: NaN },
        { angle: 0, r: 12 },
        { angle: 12, r: 12.2 }
      ] }
      />
    );
    scryRenderedDOMComponentsWithClass(instance, 'test--radar-radar-area').should.have.length(0);
  });
});

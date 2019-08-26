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
    value: 99.99,
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

  it('should be able to render stroke with custom strokeWidth', function () {
    instance = renderIntoDocument(
      <RadarArea rPoints={ rPoints } strokeWidth={ 12 }/>
    );
    const radarStroke = findRenderedDOMComponentWithClass(instance, 'test--radar-stroke');
    radarStroke.getAttribute('style').should.containEql('stroke-width: 12');
  });

  it('should not display radar area and stroke when rPoints is not valid', () => {
    instance = renderIntoDocument(
      <RadarArea rPoints={ [
        { angle: 0, r: NaN },
        { angle: 0, r: 12 },
        { angle: 12, r: 12.2 },
      ] }
      />
    );
    scryRenderedDOMComponentsWithClass(instance, 'test--radar-radar-area').should.have.length(0);
  });

  it('should render radar area with custom radarMainAreaOpacity', function () {
    instance = renderIntoDocument(<RadarArea rPoints={ rPoints } radarMainAreaOpacity={ 0.5 }/>);
    const radarArea = findRenderedDOMComponentWithClass(instance, 'test--radar-radar-area');
    radarArea.getAttribute('style').should.containEql('fill-opacity: 0.5');
  });
});

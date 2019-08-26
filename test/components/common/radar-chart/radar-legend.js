import React from 'react';
import { Motion } from 'react-motion';
import { unmountComponentSuppressError } from 'utils/test';
import RadarLegend from 'components/common/radar-chart/radar-legend';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';


describe('RadarLegend components', function () {
  let instance;

  afterEach(function () {
    if (instance) {
      unmountComponentSuppressError(instance);
    }
  });

  it('should display nothing if no content provided', () => {
    instance = renderIntoDocument(<RadarLegend/>);
    instance.should.displayNothing();
  });

  it('should render if text is defined', () => {
    instance = renderIntoDocument(<RadarLegend content='legend text'/>);

    const element = findRenderedDOMComponentWithClass(instance, 'test--radar-legend-content');
    element.textContent.should.containEql('legend text');
  });

  it('should fadeOut the legend if fadeOut is true', (done) => {
    // TODO: move to selenium-test when officer-profle page is ready
    this.timeout(5000);
    instance = renderIntoDocument(
      <RadarLegend content='2017' fadeOut={ true }/>
    );
    findRenderedComponentWithType(instance, Motion);
    setTimeout(function () {
      const legendYearElement = findRenderedDOMComponentWithClass(instance, 'test--radar-legend-content');
      legendYearElement.textContent.should.be.eql('2017');
      legendYearElement.getAttribute('style').should.containEql('visibility: hidden');
      done();
    }, 1500);
  });
});

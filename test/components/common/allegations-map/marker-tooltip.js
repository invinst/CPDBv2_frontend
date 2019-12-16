import React from 'react';

import MarkerTooltip from 'components/common/allegations-map/marker-tooltip';
import {
  findRenderedDOMComponentWithClass,
  findRenderedDOMComponentWithTag,
  renderIntoDocument,
} from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';


describe('MarkerTooltip component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render marker tooltip correctly', function () {
    instance = renderIntoDocument(
      <MarkerTooltip
        date={ 'Sep, 23, 2006' }
        category={ 'test category' }
      />
    );
    const tooltipDate = findRenderedDOMComponentWithClass(instance, 'marker-tooltip-date');
    const tooltipCategory = findRenderedDOMComponentWithClass(instance, 'marker-tooltip-category');
    tooltipDate.textContent.should.eql('Sep, 23, 2006');
    tooltipCategory.textContent.should.eql('test category');
  });

  it('should go to CR detail page when clicking on', function () {
    instance = renderIntoDocument(
      <MarkerTooltip
        url='/complaint/123456/'
      />
    );
    const tooltip = findRenderedDOMComponentWithTag(instance, 'a');
    tooltip.href.should.containEql('/complaint/123456/');
  });
});

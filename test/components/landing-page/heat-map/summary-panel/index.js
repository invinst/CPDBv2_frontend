import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import SummaryPanel from 'components/landing-page/heat-map/summary-panel';
import NoNeighborhood from 'components/landing-page/heat-map/summary-panel/no-neighborhood';
import Neighborhood from 'components/landing-page/heat-map/summary-panel/neighborhood';


describe('SummaryPanel component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    SummaryPanel.should.be.renderable();
  });

  it('should render NoNeighborhood when there is no selected neighborhood', function () {
    instance = renderIntoDocument(<SummaryPanel/>);
    findRenderedComponentWithType(instance, NoNeighborhood).should.be.ok();
  });

  it('should render Neighborhood when there is selected neighborhood', function () {
    instance = renderIntoDocument(<SummaryPanel neighborhood={ {} }/>);
    findRenderedComponentWithType(instance, Neighborhood).should.be.ok();
  });
});

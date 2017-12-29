import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import SummaryPanel from 'components/landing-page/heat-map/summary-panel';
import NoCommunity from 'components/landing-page/heat-map/summary-panel/no-community';
import Community from 'components/landing-page/heat-map/summary-panel/community';


describe('SummaryPanel component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    SummaryPanel.should.be.renderable();
  });

  it('should render NoCommunity when there is no selected community', function () {
    instance = renderIntoDocument(<SummaryPanel/>);
    findRenderedComponentWithType(instance, NoCommunity).should.be.ok();
  });

  it('should render Community when there is selected community', function () {
    instance = renderIntoDocument(<SummaryPanel community={ {} }/>);
    findRenderedComponentWithType(instance, Community).should.be.ok();
  });
});

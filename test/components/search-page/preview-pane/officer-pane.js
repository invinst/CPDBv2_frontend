import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { OfficerPane } from 'components/search-page/preview-pane';
import {
  VisualTokenWidget,
  OfficerInfoWidget,
  MetricWidget,
  CallToActionWidget,
} from 'components/search-page/preview-pane/widgets';
import { unmountComponentSuppressError } from 'utils/test';


describe('OfficerPane component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should contain the sub components', () => {
    instance = renderIntoDocument(
      <OfficerPane/>
    );
    findRenderedComponentWithType(instance, VisualTokenWidget);
    findRenderedComponentWithType(instance, OfficerInfoWidget);
    findRenderedComponentWithType(instance, MetricWidget);
    findRenderedComponentWithType(instance, CallToActionWidget);
  });
});

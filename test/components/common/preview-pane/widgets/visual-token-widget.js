import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { VisualTokenWidget } from 'components/common/preview-pane/widgets';
import StaticRadarChart from 'components/common/radar-chart';
import { unmountComponentSuppressError } from 'utils/test';


describe('VisualTokenWidget component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should contain StaticRadarChart component', () => {
    instance = renderIntoDocument(
      <VisualTokenWidget/>
    );
    findRenderedComponentWithType(instance, StaticRadarChart);
  });
});

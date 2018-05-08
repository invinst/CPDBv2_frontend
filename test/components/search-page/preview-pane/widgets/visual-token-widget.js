import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { VisualTokenWidget } from 'components/search-page/preview-pane/widgets';
import StaticRadarChart from 'components/common/radar-chart';


describe('VisualTokenWidget component', () => {
  let instance;

  it('should contain StaticRadarChart component', () => {
    instance = renderIntoDocument(
      <VisualTokenWidget/>
    );
    findRenderedComponentWithType(instance, StaticRadarChart);
  });
});

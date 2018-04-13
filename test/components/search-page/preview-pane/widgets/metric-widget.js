import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';

import { MetricWidget } from 'components/search-page/preview-pane/widgets';
import MetricWidgetItem from 'components/search-page/preview-pane/widgets/metric-widget-item';


describe('MetricWidget component', () => {
  let instance;

  it('should contain number of MetricWidgetItem components', () => {
    const metrics = [
      {
        name: 'name1',
        value: 23,
        description: 'description1'
      },
      {
        name: 'name2',
        value: 12,
        description: 'description2'
      },
    ];
    instance = renderIntoDocument(
      <MetricWidget metrics={ metrics }/>
    );
    scryRenderedComponentsWithType(instance, MetricWidgetItem).should.have.lengthOf(2);
  });

  it('should split into groups with the length of 2', () => {
    const metrics = [
      {
        name: 'name1',
        value: 23,
        description: 'description1'
      },
      {
        name: 'name2',
        value: 12,
        description: 'description2'
      },
      {
        name: 'name3',
        value: 34,
        description: 'description3'
      },
    ];
    instance = renderIntoDocument(
      <MetricWidget metrics={ metrics }/>
    );
    scryRenderedDOMComponentsWithClass(instance, 'test--metric-widget-chunk').should.have.lengthOf(2);
  });
});

import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import MetricWidgetItem from 'components/search-page/preview-pane/widgets/metric-widget-item';


describe('MetricWidgetItem component', () => {
  let instance;

  it('should show correct info', () => {
    instance = renderIntoDocument(
      <MetricWidgetItem value={ 23 } name='Allegations' description='something' hightlight={ false }/>
    );

    findRenderedDOMComponentWithClass(instance, 'test--metric-widget-item-value').textContent.should.containEql('23');
    const nameElement = findRenderedDOMComponentWithClass(instance, 'test--metric-widget-item-name');
    nameElement.textContent.should.containEql('Allegations');

    const descElement = findRenderedDOMComponentWithClass(instance, 'test--metric-widget-item-description');
    descElement.textContent.should.containEql('something');
  });

});

import React from 'react';
import { shallow } from 'enzyme';

import MetricWidgetItem from 'components/common/preview-pane/widgets/new-metric-widget-item';


describe('MetricWidgetItem component', function () {
  it('should show correct info', function () {
    const wrapper = shallow(
      <MetricWidgetItem value={ 23 } name='Allegations' description='something' hightlight={ false }/>
    );

    wrapper.find('.test--metric-widget-item-value').text().should.containEql('23');
    const nameElement = wrapper.find('.test--metric-widget-item-name');
    nameElement.text().should.containEql('Allegations');

    const descElement = wrapper.find('.test--metric-widget-item-description');
    descElement.text().should.containEql('something');
  });
});

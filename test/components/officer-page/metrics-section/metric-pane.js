import React from 'react';
import { shallow } from 'enzyme';

import MetricPane from 'components/officer-page/metrics-section/metric-pane';
import Popup from 'components/common/popup';


describe('MetricPane', function () {
  it('should render correct information', function () {
    const wrapper = shallow(
      <MetricPane value={ 1 } name={ 'some name' } description={ 'some description' } />
    );
    const value = wrapper.find('.metrics-pane-value');
    const name = wrapper.find('.metrics-pane-name');
    const description = wrapper.find('.metrics-pane-description');

    value.text().should.equal('1');
    name.text().should.equal('some name');
    description.text().should.equal('some description');
  });

  it('should render popup', function () {
    const popup = {
      title: 'Allegations',
      text: 'Some allegation explanation',
    };
    const wrapper = shallow(<MetricPane popup={ popup } pathName='/officer/8562/jerome-finnigan/'/>);
    const metricPanePopup = wrapper.find(Popup);
    metricPanePopup.prop('title').should.equal('Allegations');
    metricPanePopup.prop('text').should.equal('Some allegation explanation');
    metricPanePopup.prop('url').should.equal('/officer/8562/jerome-finnigan/');
    metricPanePopup.prop('popupButtonClassName').should.equal('metric-pane-popup-button');
  });
});

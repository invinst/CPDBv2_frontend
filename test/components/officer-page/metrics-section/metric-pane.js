import React from 'react';
import {
  findRenderedDOMComponentWithClass,
  renderIntoDocument,
  findRenderedComponentWithType
} from 'react-addons-test-utils';

import MetricPane from 'components/officer-page/metrics-section/metric-pane';
import { unmountComponentSuppressError } from 'utils/test';
import Popup from 'components/common/popup';


describe('MetricPane', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correct information', function () {
    instance = renderIntoDocument(
      <MetricPane value={ 1 } name={ 'some name' } description={ 'some description' } />
    );
    const value = findRenderedDOMComponentWithClass(instance, 'test--metrics-pane-value');
    const name = findRenderedDOMComponentWithClass(instance, 'test--metrics-pane-name');
    const description = findRenderedDOMComponentWithClass(instance, 'test--metrics-pane-description');

    value.textContent.should.eql('1');
    name.textContent.should.eql('some name');
    description.textContent.should.eql('some description');
  });

  it('should render popup', function () {
    const popup = {
      title: 'Allegations',
      text: 'Some allegation explanation',
    };
    instance = renderIntoDocument(<MetricPane popup={ popup } />);
    const metricPanePopup = findRenderedComponentWithType(instance, Popup);
    metricPanePopup.props.title.should.eql('Allegations');
    metricPanePopup.props.text.should.eql('Some allegation explanation');
  });
});

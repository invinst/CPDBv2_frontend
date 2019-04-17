import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import PinboardPage from 'components/pinboard-page';
import PinboardPaneSection from 'components/pinboard-page/pinboard-pane-section';
import { unmountComponentSuppressError } from 'utils/test';


describe('PinboardPage component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render pinboard page correctly', function () {
    const pinboard = {
      title: 'This is pinboard title',
      description: 'This is pinboard description'
    };

    instance = renderIntoDocument(<PinboardPage pinboard={ pinboard } />);

    findRenderedComponentWithType(instance, PinboardPaneSection);
    findRenderedDOMComponentWithClass(instance, 'pinboard-title').textContent.should.eql(
      'This is pinboard title'
    );
    findRenderedDOMComponentWithClass(instance, 'pinboard-description').textContent.should.eql(
      'This is pinboard description'
    );
  });
});

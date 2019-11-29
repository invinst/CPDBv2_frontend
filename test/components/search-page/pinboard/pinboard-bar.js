import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError } from 'utils/test';
import PinboardBar from 'components/search-page/pinboard/pinboard-bar';
import PinboardButtonContainer from 'containers/search-page/pinboard-button-container';


describe('PinboardBar component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    const store = MockStore()({ pinboardPage: { pinboard: {} } });

    instance = renderIntoDocument(
      <Provider store={ store }>
        <PinboardBar />
      </Provider>
    );

    findDOMNode(instance).className.should.containEql('pinboard-feature');
    findRenderedDOMComponentWithClass(instance, 'pinboard-tip');
    findRenderedComponentWithType(instance, PinboardButtonContainer);
  });
});

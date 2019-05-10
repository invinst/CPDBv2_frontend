import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';

import { unmountComponentSuppressError } from 'utils/test';
import PinboardBar from 'components/search-page/pinboard/pinboard-bar';
import PinboardButtonContainer from 'containers/search-page/pinboard-button-container';


describe('PinboardBar component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    const store = MockStore()({ pinboard: {} });

    instance = renderIntoDocument(
      <Provider store={ store }>
        <PinboardBar />
      </Provider>
    );

    findRenderedDOMComponentWithClass(instance, 'pinboard-tip');
    findRenderedComponentWithType(instance, PinboardButtonContainer);
  });
});

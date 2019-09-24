import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  Simulate,
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import ManagePinboardsButtons from 'components/pinboard-page/manage-pinboards-buttons';


describe('ManagePinboardsButtons component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render show pinboards list button', function () {
    const showPinboardsListSpy = spy();

    instance = renderIntoDocument(
      <ManagePinboardsButtons showPinboardsList={ showPinboardsListSpy } />
    );

    const showPinboardsListButton = findRenderedDOMComponentWithClass(instance, 'pinboards-list-btn');
    Simulate.click(showPinboardsListButton);

    showPinboardsListSpy.should.be.called();
  });
});

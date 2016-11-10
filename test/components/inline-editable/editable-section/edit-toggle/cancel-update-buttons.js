import React from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import CancelUpdateButtons from 'components/inline-editable/editable-section/edit-toggle/cancel-update-buttons';

describe('CancelUpdateButtons component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render', function () {
    instance = renderIntoDocument(<CancelUpdateButtons/>);
    instance.should.displaySomething();
  });

  it('should trigger onCancelClick', function () {
    CancelUpdateButtons.should.triggerCallbackWhenClick('onCancelClick', 'cancel-button');
  });

  it('should trigger onUpdateClick', function () {
    CancelUpdateButtons.should.triggerCallbackWhenClick('onUpdateClick', 'update-button');
  });
});

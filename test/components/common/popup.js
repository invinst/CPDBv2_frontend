import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import Popup from 'components/common/popup';
import { unmountComponentSuppressError } from 'utils/test';


describe('Popup', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render the button', function () {
    instance = renderIntoDocument(<Popup title='Some title' text='Some text' />);
    const popupTitle = findRenderedDOMComponentWithClass(instance, 'test--popup-title-text');
    popupTitle.textContent.should.eql('Some title');
    const popupText = findRenderedDOMComponentWithClass(instance, 'test--popup-text');
    popupText.textContent.should.eql('Some text');
  });
});

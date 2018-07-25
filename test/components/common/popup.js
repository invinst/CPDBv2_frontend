import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass, Simulate } from 'react-addons-test-utils';
import { spy } from 'sinon';

import Popup from 'components/common/popup';
import { unmountComponentSuppressError } from 'utils/test';


describe('Popup', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render the button', function () {
    instance = renderIntoDocument(<Popup title='Some title' text='Some text' />);
    const popupTitle = findRenderedDOMComponentWithClass(instance, 'test--popup-title');
    popupTitle.textContent.should.eql('Some title');
    const popupText = findRenderedDOMComponentWithClass(instance, 'test--popup-text');
    popupText.textContent.should.eql('Some text');
  });

  it('should stopPropagation when being clicked ', function () {
    const dummyEvent = {
      stopPropagation: spy()
    };
    instance = renderIntoDocument(<Popup title='Some title' text='Some text' />);
    const popupButton = findRenderedDOMComponentWithClass(instance, 'popup-button');
    Simulate.click(popupButton);
    const popup = findRenderedDOMComponentWithClass(instance, 'test--popup-content');
    Simulate.click(popup, dummyEvent);
    dummyEvent.stopPropagation.should.be.called();
  });
});

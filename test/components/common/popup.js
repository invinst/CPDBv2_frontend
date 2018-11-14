import React from 'react';
import {
  renderIntoDocument, findRenderedDOMComponentWithClass, Simulate, findRenderedComponentWithType
} from 'react-addons-test-utils';
import { spy, stub } from 'sinon';
import ReactTooltip from 'react-tooltip';
import * as GATracking from 'utils/google_analytics_tracking';

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

  it('should hide other popups after shown', function () {
    const hideOtherPopups = stub(Popup.prototype, 'hideOtherPopups');
    const trackPopupButtonClick = stub(GATracking, 'trackPopupButtonClick');
    instance = renderIntoDocument(<Popup title='Some title' text='Some text' />);
    const tooltip = findRenderedComponentWithType(instance, ReactTooltip);
    tooltip.props.afterShow();
    hideOtherPopups.called.should.be.true();
    trackPopupButtonClick.called.should.be.true();
    hideOtherPopups.restore();
    trackPopupButtonClick.restore();
  });
});

import React from 'react';
import {
  renderIntoDocument, findRenderedDOMComponentWithClass, Simulate, findRenderedComponentWithType,
} from 'react-addons-test-utils';
import { spy, stub } from 'sinon';
import ReactTooltip from 'react-tooltip';
import * as GATracking from 'utils/google_analytics_tracking';

import PopupWrapper from 'components/common/popup/popup-wrapper';
import { unmountComponentSuppressError } from 'utils/test';


describe('PopupWrapper', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render children as content', function () {
    instance = renderIntoDocument(
      <PopupWrapper popupButtonClassName='custom-popup-button'>
        <div className='first-children'>First popup child</div>
        <div className='second-children'>Second popup child</div>
      </PopupWrapper>
    );

    const contentWrapper = findRenderedDOMComponentWithClass(instance, 'test--popup-content');

    contentWrapper.textContent.should.eql('First popup childSecond popup child');

    const popupButton = findRenderedDOMComponentWithClass(instance, 'popup-button');
    popupButton.className.should.containEql('custom-popup-button');
  });

  it('should stopPropagation when being clicked ', function () {
    const dummyEvent = {
      stopPropagation: spy(),
    };
    instance = renderIntoDocument(<PopupWrapper/>);

    const popupButton = findRenderedDOMComponentWithClass(instance, 'popup-button');
    Simulate.click(popupButton);
    const popup = findRenderedDOMComponentWithClass(instance, 'test--popup-content');
    Simulate.click(popup, dummyEvent);

    dummyEvent.stopPropagation.should.be.called();
  });

  it('should hide other popups after shown', function () {
    const hideOtherPopups = stub(PopupWrapper.prototype, 'hideOtherPopups');
    const trackPopupButtonClick = stub(GATracking, 'trackPopupButtonClick');
    instance = renderIntoDocument(
      <PopupWrapper trackingUrl='tracking.url.co' trackingId='testingId'/>
    );
    const tooltip = findRenderedComponentWithType(instance, ReactTooltip);
    tooltip.props.afterShow();
    hideOtherPopups.called.should.be.true();
    trackPopupButtonClick.should.be.calledWith('tracking.url.co', 'testingId');
    hideOtherPopups.restore();
    trackPopupButtonClick.restore();
  });
});

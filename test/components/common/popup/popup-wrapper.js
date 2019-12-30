import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy, stub } from 'sinon';
import ReactTooltip from 'react-tooltip';
import * as tracking from 'utils/tracking';

import PopupWrapper from 'components/common/popup/popup-wrapper';


describe('PopupWrapper', function () {
  it('should render children as content', function () {
    const wrapper = mount(
      <PopupWrapper popupButtonClassName='custom-popup-button'>
        <div className='first-children'>First popup child</div>
        <div className='second-children'>Second popup child</div>
      </PopupWrapper>
    );

    const contentWrapper = wrapper.find('.test--popup-content');

    contentWrapper.text().should.equal('First popup childSecond popup child');

    const popupButton = wrapper.find('.popup-button');
    popupButton.hasClass('custom-popup-button').should.be.true();
  });

  it('should stopPropagation when being clicked ', function () {
    const dummyEvent = {
      stopPropagation: spy(),
    };
    const wrapper = mount(<PopupWrapper/>);

    const popupButton = wrapper.find('.popup-button');
    popupButton.simulate('click');
    const popup = wrapper.find('.test--popup-content');
    popup.simulate('click', dummyEvent);

    dummyEvent.stopPropagation.should.be.called();
  });

  it('should hide other popups after shown', function () {
    const hideOtherPopups = stub(PopupWrapper.prototype, 'hideOtherPopups');
    const trackPopupButtonClick = stub(tracking, 'trackPopupButtonClick');
    const wrapper = shallow(
      <PopupWrapper trackingUrl='tracking.url.co' trackingId='testingId'/>
    );
    const tooltip = wrapper.find(ReactTooltip);
    tooltip.prop('afterShow')();
    hideOtherPopups.called.should.be.true();
    trackPopupButtonClick.should.be.calledWith('tracking.url.co', 'testingId');
    hideOtherPopups.restore();
    trackPopupButtonClick.restore();
  });
});

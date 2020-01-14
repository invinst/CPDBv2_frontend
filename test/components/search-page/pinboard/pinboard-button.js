import React from 'react';
import { shallow, mount } from 'enzyme';
import browserHistory from 'utils/history';
import should from 'should';
import { spy, stub } from 'sinon';

import PinboardButton from 'components/search-page/pinboard/pinboard-button';


describe('PinboardButton component', function () {
  it('should not display "Your pinboard is empty" when there is no pinned item and emptyText is true', function () {
    const wrapper = shallow(
      <PinboardButton
        pinboard={
          {
            itemsCount: 0,
            isPinboardRestored: true,
          }
        }
        emptyText={ true }
      />
    );

    wrapper.prop('className').should.containEql('pinboard-feature');
    wrapper.text().should.equal('Your pinboard is empty');
  });

  it('should display "Pinboard (count)" when there are pinned items', function () {
    const wrapper = shallow(
      <PinboardButton pinboard={ {
        itemsCount: 2,
        url: '/pinboard/1/title/',
        isPinboardRestored: true,
      } } />
    );

    wrapper.prop('className').should.containEql('pinboard-feature');
    wrapper.text().should.equal('Pinboard (2)');
  });

  it('should not render if isPinboardRestored is false', function () {
    const wrapper = shallow(
      <PinboardButton pinboard={ { isPinboardRestored: false } } />
    );
    should(wrapper.type()).be.null();
  });

  it('should call onEmptyPinboardButtonClick if we click on the button when pinboard id is null', function () {
    const onEmptyPinboardButtonClick = spy();
    const wrapper = mount(
      <PinboardButton
        onEmptyPinboardButtonClick={ onEmptyPinboardButtonClick }
      />
    );

    wrapper.simulate('click');
    onEmptyPinboardButtonClick.should.be.called();
  });

  it('should redirect if we click on the button when pinboard exists', function () {
    const browserHistoryPush = stub(browserHistory, 'push');

    const wrapper = mount(
      <PinboardButton pinboard={ {
        id: '5cd06f2b',
        itemsCount: 2,
        url: '/pinboard/1/title/',
        isPinboardRestored: true,
      } }/>
    );

    wrapper.simulate('click');
    browserHistoryPush.should.be.calledWith('/pinboard/1/title/');
    browserHistoryPush.restore();
  });

  it('should redirect to /pinboard/ if pinboard_id is null and hasPendingChanges when clicking on button', function () {
    const browserHistoryPush = stub(browserHistory, 'push');

    const wrapper = mount(
      <PinboardButton pinboard={ {
        id: null,
        itemsCount: 2,
        url: '/pinboard/1/title/',
        isPinboardRestored: true,
        hasPendingChanges: true,
      } }/>
    );

    wrapper.simulate('click');
    browserHistoryPush.should.be.calledWith('/pinboard/');
    browserHistoryPush.restore();
  });
});

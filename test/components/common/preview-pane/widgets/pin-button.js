import React from 'react';
import { mount } from 'enzyme';
import { stub } from 'sinon';

import PinButton from 'components/common/preview-pane/widgets/pin-button';


describe('PinButton component', () => {
  it('should display "Remove from pinboard" if isPinned', function () {
    const wrapper = mount(
      <PinButton item={ { isPinned: true } } />
    );

    wrapper.find('button').text().should.equal('Remove from pinboard');
  });

  it('should display "Add to pinboard" if not isPinned', function () {
    const wrapper = mount(
      <PinButton item={ { isPinned: false } } />
    );

    wrapper.find('button').text().should.equal('Add to pinboard');
  });

  it('should handle addOrRemoveItemInPinboard on click', function () {
    const addOrRemoveItemInPinboardStub = stub();
    const wrapper = mount(
      <PinButton
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardStub }
        item={ { type: 'OFFICER', id: 123456, isPinned: true } }
      />
    );

    const pinButton = wrapper.find('button');

    pinButton.simulate('click');

    addOrRemoveItemInPinboardStub.calledWith({
      type: 'OFFICER',
      id: 123456,
      isPinned: true,
    });
  });
});

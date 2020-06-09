import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';

import HeaderPinButton from 'components/common/pinboard/header-pin-button';
import PinboardsMenu from 'components/common/pinboard/pinboards-menu';


describe('HeaderPinButton component', function () {
  it('should render HeaderButton component if showSelectPinboards is true', function () {
    const addOrRemoveItemInPinboardSpy = spy();
    const fetchPinboardSpy = spy();
    const createPinboardSpy = spy();
    const pinboards = [
      {
        id: 1,
        title: 'Pinboard 1',
        isPinned: false,
      },
      {
        id: 2,
        title: 'Pinboard 2',
        isPinned: true,
      },
    ];
    const item = { 'id': 8562, fullName: 'Jerome Finnigan' };
    const wrapper = mount(
      <HeaderPinButton
        showSelectPinboards={ true }
        isPinned={ false }
        item={ item }
        pinboards={ pinboards }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardSpy }
        fetchPinboard={ fetchPinboardSpy }
        createPinboard={ createPinboardSpy }
      />
    );

    const headerButton = wrapper.find('HeaderButton');
    const itemPinButton = wrapper.find('ItemPinButton');
    headerButton.exists().should.be.true();
    itemPinButton.exists().should.be.false();

    headerButton.prop('name').should.eql('add-to-pinboard-btn');
    headerButton.prop('buttonClassName').should.containEql('pinboard-feature');
    headerButton.prop('Menu').should.eql(PinboardsMenu);
    headerButton.prop('menuProps').should.eql({
      pinboards,
      item,
      addOrRemoveItemInPinboard: addOrRemoveItemInPinboardSpy,
      fetchPinboard: fetchPinboardSpy,
      createPinboard: createPinboardSpy,
    });
  });

  it('should render ItemPinButton component if showSelectPinboards is false', function () {
    const addOrRemoveItemInPinboardSpy = spy();
    const wrapper = mount(
      <HeaderPinButton
        showSelectPinboards={ false }
        isPinned={ false }
        item={ { 'id': 8562, fullName: 'Jerome Finnigan' } }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardSpy }
      />
    );

    const headerButton = wrapper.find('HeaderButton');
    const itemPinButton = wrapper.find('ItemPinButton');
    headerButton.exists().should.be.false();
    itemPinButton.exists().should.be.true();

    itemPinButton.prop('addOrRemoveItemInPinboard').should.eql(addOrRemoveItemInPinboardSpy);
    itemPinButton.prop('showHint').should.be.false();
    itemPinButton.prop('item').should.eql(
      {
        'id': 8562,
        fullName: 'Jerome Finnigan',
        isPinned: false,
      }
    );
  });
});

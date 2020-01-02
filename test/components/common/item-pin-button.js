import React from 'react';
import { mount } from 'enzyme';
import { stub } from 'sinon';

import ItemPinButton from 'components/common/item-pin-button';
import styles from 'components/common/item-pin-button.sass';


describe('ItemPinButton component', function () {
  it('should render correctly', function () {
    const wrapper = mount(<ItemPinButton item={ { isPinned: true } } />);
    const pinButton = wrapper.find(`.${styles.itemPinButton}`);
    pinButton.prop('className').should.containEql('pinboard-feature');
  });

  it('should have class is-pinned if item.isPinned is true', function () {
    const wrapper = mount(<ItemPinButton item={ { isPinned: true } } />);
    wrapper.find('.is-pinned').exists().should.be.true();
  });

  it('should not have class is-pinned if item.isPinned is false', function () {
    const wrapper = mount(<ItemPinButton item={ { isPinned: false } } />);

    wrapper.find('.is-pinned').exists().should.be.false();
  });

  it('should call addOrRemoveItemInPinboard action when clicked on', function () {
    const addOrRemoveItemInPinboard = stub();
    const wrapper = mount(
      <ItemPinButton
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
        item={ { isPinned: false, type: 'CR', id: '1' } } />
    );
    wrapper.simulate('click');
    addOrRemoveItemInPinboard.calledWith({
      type: 'CR',
      id: '1',
      isPinned: false,
    }).should.be.true();
  });

  it('should have class is-pinned if all items inPinned are true', function () {
    const wrapper = mount(<ItemPinButton items={ [{ isPinned: true }, { isPinned: true }] }/>);

    wrapper.find('.is-pinned').exists().should.be.true();
  });

  it('should not have class is-pinned if not all items inPinned are true', function () {
    const wrapper = mount(<ItemPinButton items={ [{ isPinned: false }, { isPinned: true }] }/>);

    wrapper.find('.is-pinned').exists().should.be.false();
  });

  it('should render pin action hint if showHint is true', function () {
    const wrapper = mount(<ItemPinButton />);

    wrapper.find('.pin-action-hint').exists().should.be.true();
  });

  it('should not render pin action hint if showHint is false', function () {
    const wrapper = mount(<ItemPinButton showHint={ false }/>);

    wrapper.find('.pin-action-hint').exists().should.be.false();
  });
});

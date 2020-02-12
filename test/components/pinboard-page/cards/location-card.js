import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import LocationCard from 'components/pinboard-page/cards/location-card';
import ItemUnpinButton from 'components/pinboard-page/cards/item-unpin-button';
import ShortPress from 'components/common/short-press';


describe('LocationCard component', function () {
  it('should render ItemUnpinButton component and body correctly', function () {
    const item = {
      dateKey: '10-10-2010',
      category: 'Use Of Force',
    };
    const wrapper = shallow(<LocationCard item={ item } dateKey='dateKey'/>);

    wrapper.find(ItemUnpinButton).exists().should.be.true();
    wrapper.find('.location-card-date').text().should.equal('10-10-2010');
    wrapper.find('.location-card-category').text().should.equal('Use Of Force');
  });

  it('should render card map with style if point of item is not null', function () {
    const item = { point: { 'lat': 1.0, 'lon': 1.0 } };
    const wrapper = shallow(<LocationCard item={ item }/>);

    wrapper.find('.location-card-map').exists().should.be.true();
    wrapper.find('.empty-map').exists().should.be.false();
  });

  it('should not render card map with style if point of item is null', function () {
    const item = { point: null };
    const wrapper = shallow(<LocationCard item={ item }/>);

    wrapper.find('.location-card-map').exists().should.be.true();
    wrapper.find('.empty-map').exists().should.be.true();
  });

  it('should removeItemInPinboardPage when clicking on ItemUnpinButton', function () {
    const removeItemInPinboardPage = spy();

    const item = {
      type: 'CR',
      isPinned: false,
      id: '123',
      incidentDate: '10-10-2010',
      category: 'Use Of Force',
    };
    const wrapper = shallow(
      <LocationCard
        item={ item }
        removeItemInPinboardPage={ removeItemInPinboardPage }
        dateKey='incidentDate'
      />
    );
    const unpinButton = wrapper.find(ItemUnpinButton);

    unpinButton.simulate('click');

    removeItemInPinboardPage.should.be.calledOnce();
    removeItemInPinboardPage.should.be.calledWith({
      type: 'CR',
      id: '123',
    });
  });

  it('should render ShortPress if focusable', function () {
    const item = { point: null };
    const wrapper = shallow(
      <LocationCard item={ item } focusable={ true }/>
    );

    wrapper.find(ShortPress).exists().should.be.true();
    wrapper.find('.location-card-body').exists().should.be.true();
  });

  it('should not render ShortPress if not focusable', function () {
    const item = { point: null };
    const wrapper = shallow(
      <LocationCard item={ item } focusable={ false }/>
    );

    wrapper.find(ShortPress).exists().should.be.false();
    wrapper.find('.location-card-body').exists().should.be.true();
  });

  it('should trigger focusItem when card focused', function () {
    const item = { type: 'CR', id: '123456' };
    const focusItem = spy();
    const wrapper = mount(
      <LocationCard item={ item } focusable={ true } focusItem={ focusItem }/>
    );

    const card = wrapper.find('.location-card-body');

    card.simulate('mouseDown', { screenX: 0, screenY: 0 });
    card.simulate('mouseUp', { screenX: 0, screenY: 0 });

    focusItem.should.be.calledWith({ type: 'CR', id: '123456' });
  });
});

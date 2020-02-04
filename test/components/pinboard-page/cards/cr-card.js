import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import CRCard, { CRCardWithUndo } from 'components/pinboard-page/cards/cr-card';
import LocationCard from 'components/pinboard-page/cards/location-card';
import ItemUnpinButton from 'components/pinboard-page/cards/item-unpin-button';


describe('CRCard component', function () {
  it('should render LocationCard component', function () {
    const item = {
      incidentDate: '10-10-2010',
      category: 'Use Of Force',
    };

    const wrapper = shallow(<CRCard item={ item }/>);

    wrapper.find(LocationCard).exists().should.be.true();
  });
});


describe('CRCardWithUndo component', function () {
  it('should render remove text correctly', function () {
    const item = {
      incidentDate: '10-10-2010',
      category: 'Use Of Force',
    };

    const wrapper = mount(<CRCardWithUndo item={ item } />);
    const unpinButton = wrapper.find(ItemUnpinButton);

    unpinButton.simulate('click');

    wrapper.find('.text').text().should.equal('CR removed.');
  });

  it('should call action right away when user click on unpin button', function () {
    const item = {
      id: 123,
      type: 'CR',
      incidentDate: '10-10-2010',
      category: 'Use Of Force',
    };
    const removeItemInPinboardPage = sinon.spy();
    const wrapper = mount(
      <CRCardWithUndo
        item={ item }
        removeItemInPinboardPage={ removeItemInPinboardPage }
      />
    );

    const unpinButton = wrapper.find(ItemUnpinButton);
    unpinButton.simulate('click');

    removeItemInPinboardPage.should.be.calledWith({
      id: 123,
      type: 'CR',
    });
  });
});

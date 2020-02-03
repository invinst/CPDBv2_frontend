import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import TRRCard, { TRRCardWithUndo } from 'components/pinboard-page/cards/trr-card';
import LocationCard from 'components/pinboard-page/cards/location-card';
import ItemUnpinButton from 'components/pinboard-page/cards/item-unpin-button';


describe('TRRCard component', function () {
  it('should render LocationCard component', function () {
    const item = {
      trrDate: '10-10-2010',
      incidentDate: '10-10-2010',
      category: 'Use Of Force',
    };

    const wrapper = shallow(<TRRCard item={ item }/>);

    wrapper.find(LocationCard).exists().should.be.true();
  });
});


describe('TRRCardWithUndo component', function () {
  it('should render remove text correctly', function () {
    const item = {
      incidentDate: '10-10-2010',
      category: 'Use Of Force',
    };

    const wrapper = mount(<TRRCardWithUndo item={ item } />);
    const unpinButton = wrapper.find(ItemUnpinButton);
    unpinButton.simulate('click');

    wrapper.find('.text').text().should.equal('TRR removed.');
  });

  it('should call action right away when user click on unpin button', function () {
    const item = {
      id: 123456,
      type: 'TRR',
      trrDate: '10-10-2010',
      incidentDate: '10-10-2010',
      category: 'Use Of Force',
    };
    const removeItemInPinboardPage = sinon.spy();
    const wrapper = mount(
      <TRRCardWithUndo
        item={ item }
        removeItemInPinboardPage={ removeItemInPinboardPage }
      />
    );

    const unpinButton = wrapper.find(ItemUnpinButton);
    unpinButton.simulate('click');

    removeItemInPinboardPage.should.be.calledWith({
      id: 123456,
      type: 'TRR',
    });
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import sinon from 'sinon';

import PairingCard from 'components/landing-page/common/pairing-card';
import PairingChart from 'components/landing-page/common/pairing-card/pairing-chart';
import OfficerInfo from 'components/landing-page/common/pairing-card/officer-info';
import ItemPinButton from 'components/common/item-pin-button';
import pinButtonStyles from 'components/common/item-pin-button.sass';
import { PINNED_ITEM_TYPES } from 'utils/constants';

describe('PairingCard component', function () {
  const addOrRemoveItemInPinboard = sinon.stub();

  const officer1 = {
    id: '123',
    fullName: 'Jerome Finnigan',
    birthYear: 1963,
    race: 'White',
    gender: 'Male',
    isPinned: true,
  };
  const officer2 = {
    id: '456',
    fullName: 'Carl Suchocki',
    birthYear: 1973,
    race: 'White',
    gender: 'Male',
    isPinned: false,
  };

  it('should render pairing card of two officers', function () {
    const wrapper = shallow(
      <PairingCard
        officer1={ officer1 }
        officer2={ officer2 }
        coaccusalCount={ 47 }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
      />,
    );
    wrapper.find(PairingChart).exists().should.be.true();
    wrapper.find(OfficerInfo).should.have.length(2);
    const links = wrapper.find(Link);
    links.at(0).prop('to').should.eql('/officer/123/');
    links.at(1).prop('to').should.eql('/officer/456/');

    const itemPinButton = wrapper.find(ItemPinButton);

    itemPinButton.prop('className').should.eql(pinButtonStyles.cardPinnedButton);
    itemPinButton.prop('addOrRemoveItemInPinboard').should.eql(addOrRemoveItemInPinboard);
    itemPinButton.prop('showHint').should.be.false();
    itemPinButton.prop('items').should.eql([
      {
        type: PINNED_ITEM_TYPES.OFFICER,
        id: officer1.id,
        isPinned: true,
      },
      {
        type: PINNED_ITEM_TYPES.OFFICER,
        id: officer2.id,
        isPinned: false,
      },
    ]);
  });
});

import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import { Link } from 'react-router';
import { stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import PairingCard from 'components/landing-page/common/pairing-card';
import PairingChart from 'components/landing-page/common/pairing-card/pairing-chart';
import OfficerInfo from 'components/landing-page/common/pairing-card/officer-info';
import ItemPinButton from 'components/common/item-pin-button';
import pinButtonStyles from 'components/common/item-pin-button.sass';
import { PINNED_ITEM_TYPES } from 'utils/constants';

describe('PairingCard component', function () {
  let instance;
  const addOrRemoveItemInPinboard = stub();

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

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render pairing card of two officers', function () {
    instance = renderIntoDocument(
      <PairingCard
        officer1={ officer1 }
        officer2={ officer2 }
        coaccusalCount={ 47 }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
      />,
    );
    findRenderedComponentWithType(instance, PairingChart);
    scryRenderedComponentsWithType(instance, OfficerInfo).should.have.length(2);
    const links = scryRenderedComponentsWithType(instance, Link);
    links[0].props.to.should.eql('/officer/123/');
    links[1].props.to.should.eql('/officer/456/');

    const itemPinButton = findRenderedComponentWithType(instance, ItemPinButton);

    itemPinButton.props.className.should.eql(pinButtonStyles.cardPinnedButton);
    itemPinButton.props.addOrRemoveItemInPinboard.should.eql(addOrRemoveItemInPinboard);
    itemPinButton.props.showHint.should.be.false();
    itemPinButton.props.items.should.eql([
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

import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import { stub } from 'sinon';

import ItemPinButton from
  'components/search-page/search-results/suggestion-group/suggestion-item/item-pin-button';
import TRRItem from 'components/search-page/search-results/suggestion-group/suggestion-item/trr';
import { unmountComponentSuppressError } from 'utils/test';


describe('TRR component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render ItemPinButton with correct passed props', function () {
    const suggestion = { 'type': 'TRR' };
    const addItemToPinboard = stub();
    instance = renderIntoDocument(<TRRItem
      suggestion={ suggestion }
      addItemToPinboard={ addItemToPinboard }
    />);

    const itemPinButton = findRenderedComponentWithType(instance, ItemPinButton);
    itemPinButton.props.should.containEql({
      'suggestion': suggestion,
      'addItemToPinboard': addItemToPinboard,
    });
  });
});

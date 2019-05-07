import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import { stub } from 'sinon';

import ItemPinButton from
  'components/search-page/search-results/suggestion-group/suggestion-item/item-pin-button';
import OfficerItem from 'components/search-page/search-results/suggestion-group/suggestion-item/officer';
import { unmountComponentSuppressError } from 'utils/test';


describe('OfficerItem component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    OfficerItem.should.be.renderable();
  });

  it('should render ItemPinButton with correct passed props', function () {
    const suggestion = { 'type': 'OFFICER' };
    const addOrRemoveItemInPinboard = stub();
    instance = renderIntoDocument(<OfficerItem
      suggestion={ suggestion }
      addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
    />);

    const itemPinButton = findRenderedComponentWithType(instance, ItemPinButton);
    itemPinButton.props.should.containEql({
      'suggestion': suggestion,
      'addOrRemoveItemInPinboard': addOrRemoveItemInPinboard,
    });
  });
});

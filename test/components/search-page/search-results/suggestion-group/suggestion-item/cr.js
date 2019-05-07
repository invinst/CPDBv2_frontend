import React from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import { stub } from 'sinon';

import ItemPinButton from
  'components/search-page/search-results/suggestion-group/suggestion-item/item-pin-button';
import CRItem from 'components/search-page/search-results/suggestion-group/suggestion-item/cr';
import { unmountComponentSuppressError } from 'utils/test';


describe('CRItem component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render ItemPinButton with correct passed props', function () {
    const suggestion = { 'type': 'CR' };
    const addOrRemoveItemInPinboard = stub();
    instance = renderIntoDocument(<CRItem
      suggestion={ suggestion }
      addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
    />);

    const itemPinButton = findRenderedComponentWithType(instance, ItemPinButton);
    itemPinButton.props.should.containEql({
      'suggestion': suggestion,
      'addOrRemoveItemInPinboard': addOrRemoveItemInPinboard,
    });
  });

  it('should render nothing when theres no subtext', function () {
    instance = renderIntoDocument(<CRItem suggestion={ {} }/>);
    const elements = scryRenderedDOMComponentsWithClass(instance, 'test--second-row');
    elements.length.should.eql(0);
  });

  it('should display component with subtext', function () {
    instance = renderIntoDocument(<CRItem suggestion={ { subText: 'subText' } }/>);
    findRenderedDOMComponentWithClass(instance, 'test--second-row');
  });
});

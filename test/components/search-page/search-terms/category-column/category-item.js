import React from 'react';
import { stub } from 'sinon';
import {
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
  renderIntoDocument,
  Simulate,
} from 'react-addons-test-utils';
import { browserHistory } from 'react-router';
import * as GATracking from 'utils/google_analytics_tracking';
import { CALL_TO_ACTION_TYPES } from 'utils/constants';

import { unmountComponentSuppressError } from 'utils/test';
import HoverableCategoryItem, { CategoryItem } from 'components/search-page/search-terms/category-column/category-item';


describe('CategoryItem component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    HoverableCategoryItem.should.be.renderable({ hovering: true });
    HoverableCategoryItem.should.be.renderable({ isFocused: true });
  });

  context('it should handle handleItemClick', function () {
    it('should search for content type if the item type is VIEW_ALL', function () {
      const pushStub = stub(browserHistory, 'push');
      const item = {
        'call_to_action_type': CALL_TO_ACTION_TYPES.VIEW_ALL,
        'id': 'community',
      };

      instance = renderIntoDocument(
        <HoverableCategoryItem item={ item }/>
      );

      const categoryItem = findRenderedDOMComponentWithClass(instance, 'test--category-item');
      Simulate.click(categoryItem);

      pushStub.calledWith('/search/?terms=community&type=COMMUNITY').should.be.true();

      pushStub.restore();
    });

    it('should track outbound link if the item type is LINK', function () {
      const trackOutboundLinkStub = stub(GATracking, 'trackOutboundLink');
      const item = {
        'call_to_action_type': CALL_TO_ACTION_TYPES.LINK,
        'link': 'link',
      };

      instance = renderIntoDocument(
        <HoverableCategoryItem item={ item }/>
      );

      const categoryItem = findRenderedDOMComponentWithClass(instance, 'test--category-item');
      Simulate.click(categoryItem);

      trackOutboundLinkStub.calledWith('link', '_blank').should.be.true();

      trackOutboundLinkStub.restore();
    });
  });

  describe('shouldComponentUpdate', function () {
    it('should return true if props are changed', function () {
      instance = renderIntoDocument(
        <HoverableCategoryItem
          isFocused={ false }
          itemUniqueKey='police-beat'
          item={ {
            name: 'Police beat',
          } }/>
      );
      const catitem = findRenderedComponentWithType(instance, CategoryItem);
      catitem.shouldComponentUpdate({ isFocused: true }).should.be.true();
      catitem.shouldComponentUpdate({ itemUniqueKey: 'Ward' }).should.be.true();
      catitem.shouldComponentUpdate({ item: { name: 'Ward' } }).should.be.true();
    });

    it('should return false if props are unchanged', function () {
      instance = renderIntoDocument(
        <HoverableCategoryItem
          isFocused={ false }
          itemUniqueKey='police-beat'
          item={ {
            name: 'Police beat',
          } }/>
      );
      const catitem = findRenderedComponentWithType(instance, CategoryItem);
      catitem.shouldComponentUpdate({
        hovering: false,
        isFocused: false,
        itemUniqueKey: 'police-beat',
        item: {
          name: 'Police beat',
        },
      }).should.be.false();
    });
  });
});

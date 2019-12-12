import React from 'react';
import { shallow, mount } from 'enzyme';
import { stub } from 'sinon';
import { browserHistory } from 'react-router';
import * as tracking from 'utils/tracking';
import { CALL_TO_ACTION_TYPES } from 'utils/constants';

import HoverableCategoryItem, { CategoryItem } from 'components/search-page/search-terms/category-column/category-item';


describe('CategoryItem component', function () {
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

      const wrapper = mount(
        <HoverableCategoryItem item={ item }/>
      );

      const categoryItem = wrapper.find('.test--category-item');
      categoryItem.simulate('click');

      pushStub.should.be.calledWith('/search/?terms=community&type=COMMUNITY');

      pushStub.restore();
    });

    it('should track outbound link if the item type is LINK', function () {
      const trackOutboundLinkStub = stub(tracking, 'trackOutboundLink');
      const item = {
        'call_to_action_type': CALL_TO_ACTION_TYPES.LINK,
        'link': 'link',
      };

      const wrapper = mount(
        <HoverableCategoryItem item={ item }/>
      );

      const categoryItem = wrapper.find('.test--category-item');
      categoryItem.simulate('click');

      trackOutboundLinkStub.should.be.calledWith('link', '_blank');

      trackOutboundLinkStub.restore();
    });
  });

  describe('shouldComponentUpdate', function () {
    it('should return true if props are changed', function () {
      const wrapper = shallow(
        <HoverableCategoryItem
          isFocused={ false }
          itemUniqueKey='police-beat'
          item={ {
            name: 'Police beat',
          } }/>
      );
      const catitem = wrapper.find(CategoryItem).dive().instance();
      catitem.shouldComponentUpdate({ isFocused: true }).should.be.true();
      catitem.shouldComponentUpdate({ itemUniqueKey: 'Ward' }).should.be.true();
      catitem.shouldComponentUpdate({ item: { name: 'Ward' } }).should.be.true();
    });

    it('should return false if props are unchanged', function () {
      const wrapper = shallow(
        <HoverableCategoryItem
          isFocused={ false }
          itemUniqueKey='police-beat'
          item={ {
            name: 'Police beat',
          } }/>
      );
      const catitem = wrapper.find(CategoryItem).dive().instance();
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

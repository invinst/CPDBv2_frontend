import React from 'react';
import { shallow } from 'enzyme';

import CategoryColumn from 'components/search-page/search-terms/category-column';


describe('CategoryColumn component', function () {
  it('should renderable', function () {
    CategoryColumn.should.be.renderable();
  });

  describe('shouldComponentUpdate', function () {
    it('should return true if focused item was changed to the category', function () {
      const wrapper = shallow(<CategoryColumn/>);
      const instance = wrapper.instance();
      instance.shouldComponentUpdate({
        name: 'Geography',
        focusedItem: {
          uniqueKey: 'category-Geography',
        },
      }).should.be.true();

      instance.shouldComponentUpdate({
        name: 'Geography',
        items: [{
          id: 1,
        }],
        focusedItem: {
          uniqueKey: 'Geography-1',
        },
      }).should.be.true();
    });

    it('should return true if other props are changed', function () {
      const wrapper = shallow(<CategoryColumn focusedItem={ {} }/>);
      const instance = wrapper.instance();
      instance.shouldComponentUpdate({ name: 'Ward', focusedItem: {} }).should.be.true();
      instance.shouldComponentUpdate({ index: 1, focusedItem: {} }).should.be.true();
      instance.shouldComponentUpdate({ items: [], focusedItem: {} }).should.be.true();
    });

    it('should return false if focused item was changed to the other category', function () {
      const wrapper = shallow(<CategoryColumn name='Geography' items={ [{ id: 1 }] }/>);
      wrapper.instance().shouldComponentUpdate({
        name: 'Geography',
        items: [{
          id: 1,
        }],
        focusedItem: {
          uniqueKey: 'Geography-2',
        },
      }).should.be.false();
    });

    it('should return false if props are unchanged', function () {
      const wrapper = shallow(<CategoryColumn focusedItem={ {} } />);
      wrapper.instance().shouldComponentUpdate({ focusedItem: {} }).should.be.false();
    });
  });
});

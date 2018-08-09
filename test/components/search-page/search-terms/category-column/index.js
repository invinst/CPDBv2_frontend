import React from 'react';

import { unmountComponentSuppressError } from 'utils/test';
import CategoryColumn from 'components/search-page/search-terms/category-column';
import { renderIntoDocument } from 'react-addons-test-utils';


describe('CategoryColumn component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    CategoryColumn.should.be.renderable();
  });

  describe('shouldComponentUpdate', function () {
    it('should return true if focused item was changed to the category', function () {
      instance = renderIntoDocument(<CategoryColumn/>);
      instance.shouldComponentUpdate({
        name: 'Geography',
        focusedItem: {
          uniqueKey: 'category-Geography'
        }
      }).should.be.true();

      instance.shouldComponentUpdate({
        name: 'Geography',
        items: [{
          id: 1
        }],
        focusedItem: {
          uniqueKey: 'Geography-1'
        }
      }).should.be.true();
    });

    it('should return true if other props are changed', function () {
      instance = renderIntoDocument(<CategoryColumn focusedItem={ {} }/>);
      instance.shouldComponentUpdate({ name: 'Ward', focusedItem: {} }).should.be.true();
      instance.shouldComponentUpdate({ index: 1, focusedItem: {} }).should.be.true();
      instance.shouldComponentUpdate({ items: [], focusedItem: {} }).should.be.true();
    });

    it('should return false if focused item was changed to the other category', function () {
      instance = renderIntoDocument(<CategoryColumn name='Geography' items={ [{ id: 1 }] }/>);
      instance.shouldComponentUpdate({
        name: 'Geography',
        items: [{
          id: 1
        }],
        focusedItem: {
          uniqueKey: 'Geography-2'
        }
      }).should.be.false();
    });

    it('should return false if props are unchanged', function () {
      instance = renderIntoDocument(<CategoryColumn focusedItem={ {} } />);
      instance.shouldComponentUpdate({ focusedItem: {} }).should.be.false();
    });
  });
});

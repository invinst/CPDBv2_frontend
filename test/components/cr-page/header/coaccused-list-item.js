import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument, findRenderedDOMComponentWithClass, Simulate } from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import CoaccusedListItem from 'components/cr-page/header/coaccused-list-item';


describe('CoaccusedListItem component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render coaccused list item', function () {
    instance = renderIntoDocument(<CoaccusedListItem />);
  });

  context('viewing is true', function () {
    it('should not handle onClick', function () {
      const openBottomSheetWithComplaint = spy();
      instance = renderIntoDocument(
        <CoaccusedListItem viewing={ true }
          openBottomSheetWithComplaint={ openBottomSheetWithComplaint }/>
      );
      const item = findRenderedDOMComponentWithClass(instance, 'test--coaccused-list-item');
      Simulate.click(item);
      openBottomSheetWithComplaint.called.should.be.false();
    });

    it('should display viewing text', function () {
      instance = renderIntoDocument(<CoaccusedListItem viewing={ true } />);
      findDOMNode(instance).innerHTML.should.containEql('VIEWING');
    });
  });

  context('viewing is false', function () {
    it('should handle onClick', function () {
      const openBottomSheetWithComplaint = spy();
      instance = renderIntoDocument(
        <CoaccusedListItem viewing={ false } id={ 1 } crid={ '1' }
          openBottomSheetWithComplaint={ openBottomSheetWithComplaint }/>
      );
      const item = findRenderedDOMComponentWithClass(instance, 'test--coaccused-list-item');
      Simulate.click(item);
      openBottomSheetWithComplaint.calledWith({ officerId: 1, crid: '1' }).should.be.true();
    });
  });
});

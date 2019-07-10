import React from 'react';

import {
  Simulate, renderIntoDocument, findRenderedDOMComponentWithClass, findRenderedComponentWithType
} from 'react-addons-test-utils';
import { stub } from 'sinon';
import { unmountComponentSuppressError } from 'utils/test';
import SearchBox from 'components/headers/slim-header/search-box';
import * as editPath from 'utils/edit-path' ;
import MagnifyingGlass from 'components/common/icons/magnifying-glass';


describe('SearchBox component', function () {
  let instance;

  beforeEach(function () {
    this.stubPushPathPreserveEditMode = stub(editPath, 'pushPathPreserveEditMode');
  });

  afterEach(function () {
    this.stubPushPathPreserveEditMode.restore();
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    SearchBox.should.be.renderable();
  });

  it('should call pushPathPreserveEditMode with search path when user click on the search box', function () {
    instance = renderIntoDocument(
      <SearchBox />
    );
    const searchBox = findRenderedDOMComponentWithClass(instance, 'test--search-section-search-box');
    Simulate.click(searchBox);
    this.stubPushPathPreserveEditMode.calledWith('/search/terms/').should.be.true();
  });

  it('should call pushPathPreserveEditMode with search term path when user click on the search term', function () {
    instance = renderIntoDocument(
      <SearchBox />
    );

    const searchBox = findRenderedDOMComponentWithClass(instance, 'test--search-box-term');
    Simulate.click(searchBox);
    this.stubPushPathPreserveEditMode.calledWith('/search/terms/').should.be.true();
  });

  it('should render MagnifyingGlass with correct color', function () {
    instance = renderIntoDocument(<SearchBox magnifyingGlassColor={ 'white' } />);
    const magnifyingGlass = findRenderedComponentWithType(instance, MagnifyingGlass);
    magnifyingGlass.props.color.should.eql('white');
  });
});

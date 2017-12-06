import React from 'react';
import {
  Simulate, renderIntoDocument, findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';
import { stub } from 'sinon';
import { unmountComponentSuppressError } from 'utils/test';
import SearchSection from 'components/landing-page/search-section';
import * as editPath from 'utils/edit-path' ;


describe('SearchSection component', function () {
  let instance;

  beforeEach(function () {
    this.stubPushPathPreserveEditMode = stub(editPath, 'pushPathPreserveEditMode');
  });

  afterEach(function () {
    this.stubPushPathPreserveEditMode.restore();
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    SearchSection.should.be.renderable();
  });

  it('should call pushPathPreserveEditMode with search path when user click on the search box', function () {
    instance = renderIntoDocument(
      <SearchSection />
    );
    const searchBox = findRenderedDOMComponentWithClass(instance, 'test--search-section-search-box');
    Simulate.click(searchBox);
    this.stubPushPathPreserveEditMode.calledWith('/search/').should.be.true();
  });

  it('should call pushPathPreserveEditMode with search term path when user click on the search term', function () {
    instance = renderIntoDocument(
      <SearchSection />
    );

    const searchBox = findRenderedDOMComponentWithClass(instance, 'test--search-section-term');
    Simulate.click(searchBox);
    this.stubPushPathPreserveEditMode.calledWith('/search/terms/').should.be.true();
  });
});

import React from 'react';
import {
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  renderIntoDocument
} from 'react-addons-test-utils';

import SearchResults from 'components/search-page/search-results';
import SearchNoResult from 'components/search-page/search-results/search-no-result';
import { unmountComponentSuppressError } from 'utils/test';


describe('SearchResults component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    const suggestionGroups = {
      a: [{}]
    };
    SearchResults.should.be.renderable({ suggestionGroups });
  });

  it('should render Loading when isRequesting', function () {
    instance = renderIntoDocument(
      <SearchResults isRequesting={ true }/>
    );
    const contentWrapper = findRenderedDOMComponentWithClass(instance, 'content-wrapper');
    contentWrapper.textContent.should.containEql('Loading...');
  });

  it('should render SearchNoResult component when isEmpty', function () {
    instance = renderIntoDocument(
      <SearchResults isEmpty={ true }/>
    );

    findRenderedComponentWithType(instance, SearchNoResult).should.be.ok();
  });
});

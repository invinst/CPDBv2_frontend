import React from 'react';
import {
  Simulate, renderIntoDocument, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass,
  findRenderedComponentWithType
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import SearchTags from 'components/search-page/search-tags';
import SearchContent from 'components/search-page/search-content';
import { unmountComponentSuppressError } from 'utils/test';


describe('SearchContent component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    SearchContent.should.be.renderable();
  });

  it('should call api when user type in', function () {
    const getSuggestion = spy();

    instance = renderIntoDocument(
      <SearchContent getSuggestion={ getSuggestion }/>
    );
    const searchInput = findRenderedDOMComponentWithTag(instance, 'input');
    searchInput.value = 'a';
    Simulate.change(searchInput);
    getSuggestion.calledWith('a', {
      contentType: null,
      limit: 10
    });
    instance.state.value.should.equal('a');
  });

  it('should clear all tags when user remove all text', function () {
    const selectTag = spy();
    instance = renderIntoDocument(
      <SearchContent selectTag={ selectTag }/>
    );
    const searchInput = findRenderedDOMComponentWithTag(instance, 'input');
    searchInput.value = '';
    Simulate.change(searchInput);
    selectTag.calledWith(null);
    instance.state.value.should.equal('');
  });

  it('should call api when user select a tag', function () {
    const getSuggestion = spy();
    const tags = ['a'];

    instance = renderIntoDocument(
      <SearchContent getSuggestion={ getSuggestion } tags={ tags }/>
    );
    instance.setState({ value: 'a' });

    const suggestionTagsElement = findRenderedComponentWithType(instance, SearchTags);
    const tagElement = findRenderedDOMComponentWithTag(suggestionTagsElement, 'span');
    Simulate.click(tagElement);
    getSuggestion.calledWith('a', {
      contentType: 'a'
    });
  });

  it('should call api when user deselect a tag', function () {
    const getSuggestion = spy();
    const tags = ['a'];

    instance = renderIntoDocument(
      <SearchContent getSuggestion={ getSuggestion } tags={ tags } contentType='a'/>
    );
    instance.setState({ value: 'a' });

    const suggestionTagsElement = findRenderedComponentWithType(instance, SearchTags);
    const tagElement = findRenderedDOMComponentWithTag(suggestionTagsElement, 'span');
    Simulate.click(tagElement);
    getSuggestion.calledWith('a');
  });

  it('should render Loading when isRequesting', function () {
    instance = renderIntoDocument(
      <SearchContent isRequesting={ true }/>
    );
    const searchInput = findRenderedDOMComponentWithTag(instance, 'input');
    searchInput.value = 'a';
    Simulate.change(searchInput);
    const contentWrapper = findRenderedDOMComponentWithClass(instance, 'content-wrapper');
    contentWrapper.textContent.should.containEql('Loading...');
  });
});

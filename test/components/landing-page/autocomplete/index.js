import React from 'react';
import {
  Simulate, renderIntoDocument, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass,
  findRenderedComponentWithType
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import SuggestionTags from 'components/landing-page/autocomplete/suggestion-tags';
import AutoComplete from 'components/landing-page/autocomplete';
import { unmountComponentSuppressError } from 'utils/test';


describe('AutoComplete component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    AutoComplete.should.be.renderable();
  });

  it('should call api when user type in', function () {
    const getSuggestion = spy();

    instance = renderIntoDocument(
      <AutoComplete getSuggestion={ getSuggestion }/>
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
      <AutoComplete selectTag={ selectTag }/>
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
      <AutoComplete getSuggestion={ getSuggestion } tags={ tags }/>
    );
    instance.setState({ value: 'a' });

    const suggestionTagsElement = findRenderedComponentWithType(instance, SuggestionTags);
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
      <AutoComplete getSuggestion={ getSuggestion } tags={ tags } contentType='a'/>
    );
    instance.setState({ value: 'a' });

    const suggestionTagsElement = findRenderedComponentWithType(instance, SuggestionTags);
    const tagElement = findRenderedDOMComponentWithTag(suggestionTagsElement, 'span');
    Simulate.click(tagElement);
    getSuggestion.calledWith('a');
  });

  it('should render Loading when isRequesting', function () {
    instance = renderIntoDocument(
      <AutoComplete isRequesting={ true }/>
    );
    const searchInput = findRenderedDOMComponentWithTag(instance, 'input');
    searchInput.value = 'a';
    Simulate.change(searchInput);
    const contentWrapper = findRenderedDOMComponentWithClass(instance, 'content-wrapper');
    contentWrapper.textContent.should.containEql('Loading...');
  });
});

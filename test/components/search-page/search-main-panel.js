import React from 'react';
import { Provider } from 'react-redux';
import {
  Simulate, renderIntoDocument, findRenderedDOMComponentWithClass,
  findRenderedComponentWithType, scryRenderedDOMComponentsWithClass,
  scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';
import { spy, stub } from 'sinon';
import lodash from 'lodash';
import MockStore from 'redux-mock-store';

import SearchTags from 'components/search-page/search-tags';
import SearchMainPanel from 'components/search-page/search-main-panel';
import { unmountComponentSuppressError } from 'utils/test';

describe('SearchMainPanel component', function () {
  let instance;
  const store = MockStore()({
    searchPage: {
      tags: [],
      navigation: {},
      searchTerms: {
        categories: []
      },
      pagination: {}
    }
  });

  beforeEach(function () {
    stub(lodash, 'debounce').callsFake(func => func);
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
    lodash.debounce.restore();
  });

  it('should call api with content type when user select a tag', function () {
    const getSuggestionWithContentType = spy();
    const tags = ['a', 'b'];

    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchMainPanel
          getSuggestionWithContentType={ getSuggestionWithContentType }
          tags={ tags } query={ 'a' }/>
      </Provider>
    );

    const suggestionTagsElement = findRenderedComponentWithType(instance, SearchTags);
    const tagElements = scryRenderedDOMComponentsWithTag(suggestionTagsElement, 'span');
    Simulate.click(tagElements[0]);

    getSuggestionWithContentType.calledWith('a', {
      contentType: 'a'
    }).should.be.true();
  });

  it('should call api when user deselect a tag', function () {
    const getSuggestion = spy();
    const tags = ['a', 'b'];

    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchMainPanel getSuggestion={ getSuggestion } tags={ tags } contentType='a' query='c' />
      </Provider>
    );

    const suggestionTagsElement = findRenderedComponentWithType(instance, SearchTags);
    const tagElements = scryRenderedDOMComponentsWithTag(suggestionTagsElement, 'span');
    Simulate.click(tagElements[0]);
    getSuggestion.calledWith('c').should.be.true();
  });

  context('in edit mode', function () {
    it('should render "cancel" button when in alias edit mode', function () {
      instance = renderIntoDocument(
        <Provider store={ store }>
          <SearchMainPanel
            editModeOn={ true }
            aliasEditModeOn={ true }
            query='ke'
          />
        </Provider>
      );

      findRenderedDOMComponentWithClass(instance, 'test--cancel-alias-button');
    });

    it('should not render "cancel" button when not aliasEditModeOn', function () {
      instance = renderIntoDocument(
        <Provider store={ store }>
          <SearchMainPanel
            editModeOn={ true }
            aliasEditModeOn={ false }
            query='ke'
          />
        </Provider>
      );
      scryRenderedDOMComponentsWithClass(instance, 'test--cancel-alias-button').should.have.length(0);
    });
  });
});

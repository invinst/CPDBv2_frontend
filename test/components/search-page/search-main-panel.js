import React from 'react';
import { Provider } from 'react-redux';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  findRenderedComponentWithType
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';

import SearchMainPanel from 'components/search-page/search-main-panel';
import { unmountComponentSuppressError } from 'utils/test';
import SearchResults from 'components/search-page/search-results';
import SearchTerms from 'components/search-page/search-terms';


describe('SearchMainPanel component', function () {
  let instance;
  const store = MockStore()({
    searchPage: {
      tags: [],
      navigation: {},
      searchTerms: {
        categories: [],
        navigation: {
          itemIndex: 0,
        }
      },
      pagination: {}
    },
    pinboardPage: {
      pinboard: null,
    }
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render SearchResults component if query is not null', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchMainPanel query='ke' />
      </Provider>
    );

    findRenderedComponentWithType(instance, SearchResults);
  });

  it('should render SearchTerm component if query is null', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchMainPanel query='' />
      </Provider>
    );

    findRenderedComponentWithType(instance, SearchTerms);
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

      findRenderedDOMComponentWithClass(instance, 'cancel-alias-button');
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
      scryRenderedDOMComponentsWithClass(instance, 'cancel-alias-button').should.have.length(0);
    });
  });
});

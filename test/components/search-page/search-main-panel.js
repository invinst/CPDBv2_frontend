import React from 'react';
import { Provider } from 'react-redux';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';

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

  afterEach(function () {
    unmountComponentSuppressError(instance);
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

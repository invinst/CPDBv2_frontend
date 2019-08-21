import React from 'react';
import { Provider } from 'react-redux';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';

import SearchMainPanel from 'components/search-page/search-main-panel';
import SearchTags from 'components/search-page/search-tags';
import { unmountComponentSuppressError } from 'utils/test';

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
        },
      },
      pagination: {},
    },
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render SearchTags', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchMainPanel
          editModeOn={ true }
          aliasEditModeOn={ true }
          query='ke'
          tags={ ['tag'] }
          contentType='OFFICER'
          isRequesting={ true }
        />
      </Provider>
    );

    const searchTags = findRenderedComponentWithType(instance, SearchTags);
    searchTags.props.tags.should.eql(['tag']);
    searchTags.props.selected.should.equal('OFFICER');
    searchTags.props.isRequesting.should.be.true();
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

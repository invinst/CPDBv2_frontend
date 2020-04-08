import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

import SearchMainPanel from 'components/search-page/search-main-panel';
import SearchResultsContainer from 'containers/search-page/search-results-container';
import SearchTermsContainer from 'containers/search-page/search-terms-container';


describe('SearchMainPanel component', function () {
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
      recentSuggestions: [],
      pagination: {},
    },
    pinboardPage: {
      pinboard: {},
    },
  });

  it('should render SearchResults component if query is not null', function () {
    const wrapper = shallow(
      <SearchMainPanel query='ke' />
    );

    wrapper.find(SearchResultsContainer).exists().should.be.true();
  });

  it('should render SearchTerm component if query is null', function () {
    const wrapper = shallow(
      <SearchMainPanel query='' />
    );

    wrapper.find(SearchTermsContainer).exists().should.be.true();
  });

  context('in edit mode', function () {
    it('should render "cancel" button when in alias edit mode', function () {
      const wrapper = mount(
        <Provider store={ store }>
          <MemoryRouter>
            <SearchMainPanel
              editModeOn={ true }
              aliasEditModeOn={ true }
              query='ke'
            />
          </MemoryRouter>
        </Provider>
      );

      wrapper.find('.cancel-alias-button').exists().should.be.true();
    });

    it('should not render "cancel" button when not aliasEditModeOn', function () {
      const wrapper = mount(
        <Provider store={ store }>
          <MemoryRouter>
            <SearchMainPanel
              editModeOn={ true }
              aliasEditModeOn={ false }
              query='ke'
            />
          </MemoryRouter>
        </Provider>
      );
      wrapper.find('.cancel-alias-button').exists().should.be.false();
    });
  });
});

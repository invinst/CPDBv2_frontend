import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy, stub } from 'sinon';
import Mousetrap from 'mousetrap';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

import SearchTerms from 'components/search-page/search-terms';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component-without-inline-style';
import { SearchTermCategory } from 'utils/test/factories/search-terms';
import CategoryColumn from 'components/search-page/search-terms/category-column';
import * as IntercomTracking from 'utils/intercom-tracking';
import RecentSuggestion from 'components/search-page/search-results/recent-suggestion';
import PinboardBar from 'components/search-page/pinboard/pinboard-bar';


describe('SearchTerms component', function () {
  const store = MockStore()({
    pinboardPage: {
      pinboard: null,
    },
  });

  describe('componentDidMount', function () {
    describe('fetchRecentSearchItems', function () {
      it('should be called if recentSuggestionIds is not empty and recentSuggestionsRequested is false', () => {
        const fetchRecentSearchItemsSpy = spy();
        const recentSuggestionIds = {
          officerIds: [8562],
          crids: ['123456'],
          trrIds: [456789],
        };
        mount(
          <Provider store={ store }>
            <MemoryRouter>
              <SearchTerms
                recentSuggestionIds={ recentSuggestionIds }
                fetchRecentSearchItems={ fetchRecentSearchItemsSpy }
                recentSuggestionsRequested={ false }
              />
            </MemoryRouter>
          </Provider>
        );
        fetchRecentSearchItemsSpy.should.be.calledWith(
          [8562],
          ['123456'],
          [456789],
        );
      });

      it('should not be called if recentSuggestionIds is empty', () => {
        const fetchRecentSearchItemsSpy = spy();
        mount(
          <Provider store={ store }>
            <MemoryRouter>
              <SearchTerms
                recentSuggestionIds={ {} }
                fetchRecentSearchItems={ fetchRecentSearchItemsSpy }
                recentSuggestionsRequested={ false }
              />
            </MemoryRouter>
          </Provider>
        );
        fetchRecentSearchItemsSpy.should.not.be.called();
      });

      it('should not be called if recentSuggestionsRequested is true', () => {
        const fetchRecentSearchItemsSpy = spy();
        const recentSuggestionIds = {
          officerIds: [8562],
          crids: ['123456'],
          trrIds: [456789],
        };
        mount(
          <Provider store={ store }>
            <MemoryRouter>
              <SearchTerms
                recentSuggestionIds={ recentSuggestionIds }
                fetchRecentSearchItems={ fetchRecentSearchItemsSpy }
                recentSuggestionsRequested={ true }
              />
            </MemoryRouter>
          </Provider>
        );
        fetchRecentSearchItemsSpy.should.not.be.called();
      });
    });

    describe('fetchedEmptyRecentSearchItems', function () {
      it('should be called if recentSuggestionsRequested is false and recentSuggestionIds is empty', function () {
        const fetchedEmptyRecentSearchItemsSpy = spy();
        mount(
          <Provider store={ store }>
            <MemoryRouter>
              <SearchTerms
                recentSuggestionIds={ {} }
                fetchedEmptyRecentSearchItems={ fetchedEmptyRecentSearchItemsSpy }
                recentSuggestionsRequested={ false }
              />
            </MemoryRouter>
          </Provider>
        );
        fetchedEmptyRecentSearchItemsSpy.should.be.called();
      });
    });
  });

  it('should be able to render CategoryColumn', function () {
    const wrapper = shallow(
      <SearchTerms categories={ SearchTermCategory.buildList(1) } />
    );
    const categoryColumn = wrapper.find(CategoryColumn);
    categoryColumn.exists().should.be.true();
  });

  it('should render PinboardBar', function () {
    const wrapper = shallow(
      <SearchTerms />
    );

    wrapper.find(PinboardBar).exists().should.be.true();
  });

  it('should render ResponsiveFluidWidthComponent with correct props', function () {
    const wrapper = shallow(
      <SearchTerms />
    );
    const responsiveComponent = wrapper.find(ResponsiveFluidWidthComponent);
    responsiveComponent.prop('className').should.equal('content-wrapper');
    responsiveComponent.prop('minimumClassName').should.equal('minimum');
    responsiveComponent.prop('mediumClassName').should.equal('medium');
    responsiveComponent.prop('maximumClassName').should.equal('maximum');
    responsiveComponent.prop('minWidthThreshold').should.equal(1020);
    responsiveComponent.prop('maxWidthThreshold').should.equal(1760);
  });

  it('should trigger move when up key pressed', function () {
    const move = spy();
    const totalItemCount = 3;
    const direction = 'up';
    mount(
      <Provider store={ store }>
        <MemoryRouter>
          <SearchTerms move={ move } totalItemCount={ totalItemCount } />
        </MemoryRouter>
      </Provider>
    );
    Mousetrap.trigger(direction);
    move.should.be.calledWith(direction, totalItemCount);
  });

  it('should trigger move when down key pressed', function () {
    const move = spy();
    const totalItemCount = 3;
    const direction = 'down';
    mount(
      <Provider store={ store }>
        <MemoryRouter>
          <SearchTerms move={ move } totalItemCount={ totalItemCount } />
        </MemoryRouter>
      </Provider>
    );
    Mousetrap.trigger(direction);
    move.should.be.calledWith(direction, totalItemCount);
  });

  it('should resetNavigation to 0 when unmounted', function () {
    const resetNavigation = spy();
    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <SearchTerms resetNavigation={ resetNavigation }/>
        </MemoryRouter>
      </Provider>
    );

    wrapper.unmount();

    resetNavigation.should.be.calledWith(0);
  });

  describe('RecentSuggestion component', function () {
    it('should render RecentSuggestion component if recentSuggestions is not null', function () {
      const recentSuggestions = [{
        type: 'OFFICER',
        id: 1,
        name: 'Jerome Finnigan',
        badge: 'Badge #123456',
        text: 'Mark Farmer',
        to: '/officer/8257/mark-farmer/',
      }];

      const wrapper = shallow(
        <SearchTerms recentSuggestions={ recentSuggestions }/>
      );

      const recentSuggestionsComp = wrapper.find(RecentSuggestion);
      recentSuggestionsComp.prop('recentSuggestions').should.eql(recentSuggestions);
    });

    it('should not render RecentSuggestion component if recentSuggestions is null', function () {
      const wrapper = shallow(
        <SearchTerms recentSuggestions={ [] }/>
      );

      wrapper.find(RecentSuggestion).exists().should.be.false();
    });
  });

  describe('Intercom tracking', function () {
    beforeEach(function () {
      stub(IntercomTracking, 'trackSearchTerms');
    });

    it('should track Intercom with search page', function () {
      mount(
        <Provider store={ store }>
          <MemoryRouter>
            <SearchTerms/>
          </MemoryRouter>
        </Provider>
      );
      IntercomTracking.trackSearchTerms.should.be.called();
    });
  });
});

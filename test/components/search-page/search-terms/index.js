import React from 'react';
import { spy, stub } from 'sinon';
import {
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
  renderIntoDocument,
} from 'react-addons-test-utils';
import Mousetrap from 'mousetrap';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';

import { unmountComponentSuppressError } from 'utils/test';
import SearchTerms from 'components/search-page/search-terms';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component-without-inline-style';
import { SearchTermCategory } from 'utils/test/factories/search-terms';
import CategoryColumn from 'components/search-page/search-terms/category-column';
import * as IntercomTracking from 'utils/intercom-tracking';
import RecentSuggestion from 'components/search-page/search-results/recent-suggestion';
import PinboardBar from 'components/search-page/pinboard/pinboard-bar';


describe('SearchTerms component', function () {
  let instance;

  const store = MockStore()({
    pinboardPage: {
      pinboard: null,
    },
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
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
        instance = renderIntoDocument(
          <Provider store={ store }>
            <SearchTerms
              recentSuggestionIds={ recentSuggestionIds }
              fetchRecentSearchItems={ fetchRecentSearchItemsSpy }
              recentSuggestionsRequested={ false }
            />
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
        instance = renderIntoDocument(
          <Provider store={ store }>
            <SearchTerms
              recentSuggestionIds={ {} }
              fetchRecentSearchItems={ fetchRecentSearchItemsSpy }
              recentSuggestionsRequested={ false }
            />
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
        instance = renderIntoDocument(
          <Provider store={ store }>
            <SearchTerms
              recentSuggestionIds={ recentSuggestionIds }
              fetchRecentSearchItems={ fetchRecentSearchItemsSpy }
              recentSuggestionsRequested={ true }
            />
          </Provider>
        );
        fetchRecentSearchItemsSpy.should.not.be.called();
      });
    });

    describe('fetchedEmptyRecentSearchItems', function () {
      it('should be called if recentSuggestionsRequested is false and recentSuggestionIds is empty', function () {
        const fetchedEmptyRecentSearchItemsSpy = spy();
        instance = renderIntoDocument(
          <Provider store={ store }>
            <SearchTerms
              recentSuggestionIds={ {} }
              fetchedEmptyRecentSearchItems={ fetchedEmptyRecentSearchItemsSpy }
              recentSuggestionsRequested={ false }
            />
          </Provider>
        );
        fetchedEmptyRecentSearchItemsSpy.should.be.called();
      });
    });
  });

  it('should be able to render CategoryColumn', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchTerms categories={ SearchTermCategory.buildList(1) } />
      </Provider>
    );
    const categoryColumn = findRenderedComponentWithType(instance, CategoryColumn);
    categoryColumn.should.be.ok();
  });

  it('should render PinboardBar', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchTerms />
      </Provider>
    );

    findRenderedComponentWithType(instance, PinboardBar);
  });

  it('should render ResponsiveFluidWidthComponent with correct props', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchTerms />
      </Provider>
    );
    const responsiveComponent = findRenderedComponentWithType(instance, ResponsiveFluidWidthComponent);
    responsiveComponent.props.className.should.eql('content-wrapper');
    responsiveComponent.props.minimumClassName.should.eql('minimum');
    responsiveComponent.props.mediumClassName.should.eql('medium');
    responsiveComponent.props.maximumClassName.should.eql('maximum');
    responsiveComponent.props.minWidthThreshold.should.eql(1020);
    responsiveComponent.props.maxWidthThreshold.should.eql(1760);
  });

  it('should trigger move when up key pressed', function () {
    const move = spy();
    const totalItemCount = 3;
    const direction = 'up';
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchTerms move={ move } totalItemCount={ totalItemCount } />
      </Provider>
    );
    Mousetrap.trigger(direction);
    move.calledWith(direction, totalItemCount).should.be.true();
  });

  it('should trigger move when down key pressed', function () {
    const move = spy();
    const totalItemCount = 3;
    const direction = 'down';
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchTerms move={ move } totalItemCount={ totalItemCount } />
      </Provider>
    );
    Mousetrap.trigger(direction);
    move.calledWith(direction, totalItemCount).should.be.true();
  });

  it('should resetNavigation to 0 when unmounted', function () {
    const resetNavigation = spy();
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchTerms resetNavigation={ resetNavigation }/>
      </Provider>
    );
    unmountComponentSuppressError(instance);

    resetNavigation.calledWith(0).should.be.true();
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

      instance = renderIntoDocument(
        <Provider store={ store }>
          <SearchTerms recentSuggestions={ recentSuggestions }/>
        </Provider>
      );

      const recentSuggestionsComp = findRenderedComponentWithType(instance, RecentSuggestion);
      recentSuggestionsComp.props.recentSuggestions.should.eql(recentSuggestions);
    });

    it('should not render RecentSuggestion component if recentSuggestions is null', function () {
      instance = renderIntoDocument(
        <Provider store={ store }>
          <SearchTerms recentSuggestions={ [] }/>
        </Provider>
      );

      scryRenderedComponentsWithType(instance, RecentSuggestion).should.have.length(0);
    });
  });

  describe('Intercom tracking', function () {
    beforeEach(function () {
      stub(IntercomTracking, 'trackSearchTerms');
    });

    afterEach(function () {
      IntercomTracking.trackSearchTerms.restore();
    });

    it('should track Intercom with search page', function () {
      instance = renderIntoDocument(
        <Provider store={ store }>
          <SearchTerms/>
        </Provider>
      );
      IntercomTracking.trackSearchTerms.called.should.be.true();
    });
  });
});

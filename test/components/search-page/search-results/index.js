import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy, stub } from 'sinon';
import Mousetrap from 'mousetrap';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';

import PreviewPane from 'components/common/preview-pane';
import SearchResults from 'components/search-page/search-results';
import SearchNoResult from 'components/search-page/search-results/search-no-result';
import SuggestionGroup from 'components/search-page/search-results/suggestion-group';
import SearchTags from 'components/search-page/search-tags';
import PinboardButton from 'components/search-page/pinboard/pinboard-button';
import ScrollIntoView from 'components/common/scroll-into-view';
import * as tracking from 'utils/tracking';


describe('SearchResults component', function () {
  const store = MockStore()({
    pinboardPage: {
      pinboard: {},
    },
  });

  context('isRequesting', function () {
    it('should render Loading', function () {
      const wrapper = shallow(
        <SearchResults isRequesting={ true }/>
      );
      wrapper.text().should.containEql('Loading...');
    });

    it('should not render PinboardIntroduction', function () {
      const wrapper = shallow(
        <SearchResults isRequesting={ true }/>
      );
      wrapper.find('PinboardIntroduction').exists().should.be.false();
    });
  });


  context('isRequesting is false', function () {
    it('should render SearchNoResult component when isEmpty', function () {
      const wrapper = shallow(
        <SearchResults isEmpty={ true }/>
      );

      wrapper.find(SearchNoResult).exists().should.be.true();
    });

    it('should render suggestionGroup components when data is available', function () {
      const suggestionGroups = [{ header: '1' }, { header: '2' }];
      const pinboardUrl = '/pinboard/12f453/untitled-title';
      const visitPinButtonIntroductionSpy = spy();
      const wrapper = shallow(
        <SearchResults
          isEmpty={ false }
          pinboardUrl={ pinboardUrl }
          suggestionGroups={ suggestionGroups }
          hide={ true }
          visitPinButtonIntroduction={ visitPinButtonIntroductionSpy }
        />
      );

      const renderedGroups = wrapper.find(SuggestionGroup);
      renderedGroups.should.have.length(2);
      renderedGroups.at(0).prop('header').should.equal('1');
      renderedGroups.at(0).prop('pinboardUrl').should.equal(pinboardUrl);
      renderedGroups.at(0).prop('hide').should.be.true();
      renderedGroups.at(0).prop('visitPinButtonIntroduction').should.equal(visitPinButtonIntroductionSpy);

      renderedGroups.at(1).prop('header').should.equal('2');
      renderedGroups.at(1).prop('pinboardUrl').should.equal(pinboardUrl);
      renderedGroups.at(1).prop('hide').should.be.true();
      renderedGroups.at(1).prop('visitPinButtonIntroduction').should.equal(visitPinButtonIntroductionSpy);
    });

    it('should render SearchTags component', function () {
      const onSelect = spy();

      const wrapper = shallow(
        <SearchResults
          tags={ [] }
          onSelect={ onSelect }
          contentType='community'
          isRequesting={ false }
        />
      );

      const searchTags = wrapper.find(SearchTags);
      searchTags.prop('tags').should.eql([]);
      searchTags.prop('onSelect').should.eql(onSelect);
      searchTags.prop('selected').should.equal('community');
      searchTags.prop('isRequesting').should.eql(false);
    });

    it('should render PinboardButton component', function () {
      const wrapper = mount(
        <Provider store={ store }>
          <SearchResults />
        </Provider>
      );

      wrapper.find(PinboardButton).exists().should.be.true();
    });
  });

  context('in edit mode', function () {
    it('should render [+] sign when not aliasEditModeOn', function () {
      const wrapper = shallow(
        <SearchResults editModeOn={ true } aliasEditModeOn={ false }/>
      );

      wrapper.find('.plus-sign-wrapper').exists().should.be.true();
      wrapper.find('.action-bar').exists().should.be.false();
    });

    it('should not render [+] sign when in aliasEditModeOn', function () {
      const wrapper = shallow(
        <SearchResults editModeOn={ true } aliasEditModeOn={ true }/>
      );

      wrapper.find('.plus-sign-wrapper').exists().should.be.false();
      wrapper.find('.action-bar').exists().should.be.true();
    });
  });

  it('should trigger move when up key pressed', function () {
    const move = spy();
    const totalItemCount = 3;
    const direction = 'up';
    mount(
      <Provider store={ store }>
        <SearchResults move={ move } totalItemCount={ totalItemCount }/>
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
        <SearchResults move={ move } totalItemCount={ totalItemCount }/>
      </Provider>
    );
    Mousetrap.trigger(direction);
    move.should.be.calledWith(direction, totalItemCount);
  });

  it('should resetNavigation to 0 when unmounted', function () {
    const resetNavigation = spy();
    const wrapper = mount(
      <Provider store={ store }>
        <SearchResults resetNavigation={ resetNavigation }/>
      </Provider>
    );

    wrapper.unmount();

    resetNavigation.should.be.calledWith(0);
  });

  it('should be renderable when there is not single content', function () {
    const wrapper = shallow(
      <SearchResults singleContent={ false }/>
    );

    wrapper.find('.content-wrapper').exists().should.be.true();
  });

  it('should be renderable if it is single content', function () {
    const suggestionGroups = [{
      canLoadMore: true,
      header: 'OFFICER',
    }];
    const getSuggestionWithContentType = stub().returns({ catch: stub() });

    const wrapper = shallow(
      <SearchResults
        singleContent={ true }
        isEmpty={ false }
        suggestionGroups={ suggestionGroups }
        getSuggestionWithContentType={ getSuggestionWithContentType }
      />
    );

    wrapper.find('.content-wrapper').exists().should.be.true();
  });


  describe('tracking focused item', function () {
    beforeEach(function () {
      stub(tracking, 'trackSearchFocusedItem');
    });

    function testTrackingFocusedItem(type, itemId) {
      const wrapper = mount(
        <Provider store={ store }>
          <SearchResults/>
        </Provider>,
      );

      wrapper.setProps({
        children: (
          <SearchResults
            focusedItem={ { type, uniqueKey: 'CR-1001', [itemId]: '123', itemRank: 2 } }
            searchText='searchText'
          />
        ),
      });

      tracking.trackSearchFocusedItem.should.be.calledOnce();
      tracking.trackSearchFocusedItem.should.be.calledWith(type, 'searchText', '123', 2);
      tracking.trackSearchFocusedItem.resetHistory();
    }

    it('should track the focused item', function () {
      testTrackingFocusedItem('SEARCH-TERMS', 'text');
      testTrackingFocusedItem('DATE > CR', 'id');
      testTrackingFocusedItem('DATE > TRR', 'id');
      testTrackingFocusedItem('DATE > OFFICERS', 'id');
      testTrackingFocusedItem('UNIT > OFFICERS', 'id');
      testTrackingFocusedItem('OFFICER', 'id');
      testTrackingFocusedItem('CR', 'id');
      testTrackingFocusedItem('TRR', 'id');
      testTrackingFocusedItem('COMMUNITY', 'text');
      testTrackingFocusedItem('NEIGHBORHOOD', 'text');
      testTrackingFocusedItem('WARD', 'text');
      testTrackingFocusedItem('POLICE-DISTRICT', 'text');
      testTrackingFocusedItem('BEAT', 'text');
      testTrackingFocusedItem('SCHOOL-GROUND', 'text');
      testTrackingFocusedItem('RANK', 'text');
      testTrackingFocusedItem('INVESTIGATOR > CR', 'id');
      testTrackingFocusedItem('UNIT', 'text');
    });

    it('should not send GA tracking if the focused item is not changed', function () {
      const focusedItem = { type: 'OFFICER', uniqueKey: 'CR-1001', id: '123' };
      const wrapper = mount(
        <Provider store={ store }>
          <SearchResults focusedItem={ focusedItem }/>
        </Provider>,
      );

      wrapper.setProps({
        children: (
          <SearchResults focusedItem={ focusedItem } searchText='searchText' />
        ),
      });

      tracking.trackSearchFocusedItem.should.not.be.called();
    });
  });

  describe('Preview Pane', function () {
    it('should render PreviewPane when an officer is focused', function () {
      const previewPaneInfo = {
        data: {
          unit: '001',
          rank: null,
          '2017 salary': '$99,999',
          race: 'White',
          sex: 'Male',
        },
        title: 'John Wang',
        visualTokenBackgroundColor: '#fafafa',
        visualTokenImg: 'http://test.img',
      };

      const wrapper = shallow(
        <SearchResults isEmpty={ false } previewPaneInfo={ previewPaneInfo }/>
      );

      const previewPane = wrapper.find(PreviewPane);

      previewPane.prop('data').should.eql({
        unit: '001',
        rank: null,
        '2017 salary': '$99,999',
        race: 'White',
        sex: 'Male',
      });
      previewPane.prop('visualTokenImg').should.equal('http://test.img');
      previewPane.prop('visualTokenBackgroundColor').should.equal('#fafafa');
      previewPane.prop('title').should.equal('John Wang');
    });
  });

  describe('ScrollIntoView', function () {
    it('should render ScrollIntoView with focusedItem changes', function () {
      const wrapper = shallow(
        <SearchResults/>
      );

      wrapper.setProps({
        focusedItem: { uniqueKey: 'CR-1001' },
      });

      const scrollIntoView = wrapper.find(ScrollIntoView);
      scrollIntoView.prop('focusedItemClassName').should.equal('suggestion-item-CR-1001');
    });

    it('should render ScrollIntoView with focusedItem does not change', function () {
      const wrapper = shallow(
        <SearchResults focusedItem={ { uniqueKey: 'CR-1001' } } />
      );

      wrapper.setProps({
        focusedItem: { uniqueKey: 'CR-1001' },
      });

      const scrollIntoView = wrapper.find(ScrollIntoView);
      scrollIntoView.prop('focusedItemClassName').should.equal('');
    });

    it('should render ScrollIntoView with focusedItem changes to empty', function () {
      const wrapper = shallow(
        <SearchResults focusedItem={ { uniqueKey: 'CR-1001' } } />
      );

      wrapper.setProps({});
      const scrollIntoView = wrapper.find(ScrollIntoView);
      scrollIntoView.prop('focusedItemClassName').should.equal('');
    });
  });
});


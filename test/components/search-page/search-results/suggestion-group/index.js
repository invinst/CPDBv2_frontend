import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy, stub } from 'sinon';
import InfiniteScroll from 'react-infinite-scroller';

import SuggestionGroup from 'components/search-page/search-results/suggestion-group';
import { OfficerSuggestion } from 'utils/test/factories/suggestion';
import SuggestionItem from 'components/search-page/search-results/suggestion-group/suggestion-item';
import LoadMoreButton from 'components/search-page/search-results/suggestion-group/load-more-button';
import { MORE_BUTTON } from 'utils/constants';


describe('SuggestionGroup component', function () {
  it('should render correctly', function () {
    const suggestions = OfficerSuggestion.buildList(3);
    const pinboardUrl = '/pinboard/12f453/untitled-title';
    const visitPinButtonIntroduction = spy();
    suggestions[0].showIntroduction = false;
    suggestions[1].showIntroduction = false;
    suggestions[2].showIntroduction = true;
    const wrapper = shallow(
      <SuggestionGroup
        pinboardUrl={ pinboardUrl }
        suggestions={ suggestions }
        hide={ true }
        visitPinButtonIntroduction={ visitPinButtonIntroduction }
      />
    );
    const suggestionItems = wrapper.find(SuggestionItem);
    suggestionItems.should.have.length(3);
    suggestionItems.at(0).prop('suggestion').should.eql(suggestions[0]);
    suggestionItems.at(0).prop('pinboardUrl').should.equal(pinboardUrl);
    suggestionItems.at(0).prop('visitPinButtonIntroduction').should.equal(visitPinButtonIntroduction);

    suggestionItems.at(1).prop('suggestion').should.eql(suggestions[1]);
    suggestionItems.at(1).prop('pinboardUrl').should.equal(pinboardUrl);
    suggestionItems.at(1).prop('visitPinButtonIntroduction').should.equal(visitPinButtonIntroduction);

    suggestionItems.at(2).prop('suggestion').should.eql(suggestions[2]);
    suggestionItems.at(2).prop('pinboardUrl').should.equal(pinboardUrl);
    suggestionItems.at(2).prop('visitPinButtonIntroduction').should.equal(visitPinButtonIntroduction);
  });

  it('should assign correct selectItem', function () {
    const setSearchNavigationHandler = spy();
    let itemIndex = 1;
    const suggestions = OfficerSuggestion.buildList(2).map((item) => ({ ...item, itemIndex: itemIndex++ }));
    const wrapper = shallow(
      <SuggestionGroup
        setSearchNavigation={ setSearchNavigationHandler }
        suggestions={ suggestions }/>
    );
    const items = wrapper.find(SuggestionItem);
    items.should.have.length(2);
    items.at(0).prop('selectItem')();
    setSearchNavigationHandler.withArgs({ itemIndex: 1 }).calledOnce.should.be.true();
    items.at(1).prop('selectItem')();
    setSearchNavigationHandler.withArgs({ itemIndex: 2 }).calledOnce.should.be.true();
  });

  describe('render more button', function () {
    it('should render `More` if showMoreButton is true', function () {
      const wrapper = shallow(
        <SuggestionGroup showMoreButton={ true }/>
      );
      wrapper.find(LoadMoreButton).exists().should.be.true();
    });

    it('should focus on showMoreButton when uniqueKeys are matched', function () {
      const wrapper = shallow(
        <SuggestionGroup
          header='OFFICER'
          showMoreButton={ true }
          focusedItem={ {
            uniqueKey: `${MORE_BUTTON}-OFFICER`,
          } }
        />
      );
      const loadMoreButton = wrapper.find(LoadMoreButton);
      loadMoreButton.prop('isFocused').should.be.true();
    });

    it('should render `More` if showMoreButton is false', function () {
      const wrapper = shallow(
        <SuggestionGroup showMoreButton={ false }/>
      );

      wrapper.find(LoadMoreButton).exists().should.be.false();
    });

    it('should render `More` if singleContent is true', function () {
      const wrapper = shallow(
        <SuggestionGroup showMoreButton={ true } singleContent={ true }/>
      );

      wrapper.find(LoadMoreButton).exists().should.be.false();
    });
  });

  it('should load more on scroll to bottom', function () {
    const searchText = 'abc';
    const nextParams = {
      limit: 20,
      offset: 20,
    };
    const getSuggestionWithContentType = stub().returns({ catch: stub() });

    const wrapper = shallow(
      <SuggestionGroup
        getSuggestionWithContentType={ getSuggestionWithContentType }
        searchText={ searchText } nextParams={ nextParams } hasMore={ true }/>
    );
    const infiniteScroll = wrapper.find(InfiniteScroll);
    infiniteScroll.prop('useWindow').should.be.true();
    infiniteScroll.prop('initialLoad').should.be.true();
    infiniteScroll.prop('loadMore')();
    getSuggestionWithContentType.should.be.calledWith(searchText, nextParams);
  });

  it('should call single content type api when single content is detected', function () {
    const header = 'OFFICER';
    const searchText = 'abc';
    const catchSpy = stub();
    const getSuggestionWithContentType = stub().returns({ catch: catchSpy });

    mount(
      <SuggestionGroup
        singleContent={ true }
        getSuggestionWithContentType={ getSuggestionWithContentType }
        header={ header }
        searchText={ searchText }/>
    );

    getSuggestionWithContentType.should.be.calledWith(searchText, { contentType: header });
    catchSpy.should.be.called();
  });

  describe('componentDidUpdate', function () {
    beforeEach(function () {
      stub(SuggestionGroup.prototype, 'componentDidMount');
    });

    it('should call single content type api when single content is changed to true', function () {
      const header = 'OFFICER';
      const searchText = 'abc';
      const catchSpy = stub();
      const getSuggestionWithContentType = stub().returns({ catch: catchSpy });

      const wrapper = mount(
        <SuggestionGroup
          singleContent={ false }
          getSuggestionWithContentType={ getSuggestionWithContentType }
          header={ header }
          searchText={ searchText }
        />
      );

      wrapper.setProps({
        singleContent: true,
        getSuggestionWithContentType: getSuggestionWithContentType,
        header: header,
        searchText: searchText,
      });

      getSuggestionWithContentType.should.be.calledWith(searchText, { contentType: header });
      catchSpy.should.be.called();
    });

    it('should not call single content type api when single content is changed to false', function () {
      const getSuggestionWithContentType = spy();

      const wrapper = shallow(
        <SuggestionGroup
          singleContent={ true }
          getSuggestionWithContentType={ getSuggestionWithContentType }
        />
      );

      wrapper.setProps({
        singleContent: false,
        getSuggestionWithContentType: getSuggestionWithContentType,
      });

      getSuggestionWithContentType.should.not.be.called();
    });

    it('should not call single content type api when single content is not changed', function () {
      const getSuggestionWithContentType = spy();

      const wrapper = shallow(
        <SuggestionGroup
          singleContent={ true }
          getSuggestionWithContentType={ getSuggestionWithContentType }
        />
      );

      wrapper.setProps({
        singleContent: true,
        getSuggestionWithContentType: getSuggestionWithContentType,
      });

      getSuggestionWithContentType.should.not.be.called();
    });
  });
});

import React from 'react';
import {
  findRenderedComponentWithType,
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { spy, stub } from 'sinon';
import Mousetrap from 'mousetrap';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';

import { unmountComponentSuppressError } from 'utils/test';
import { getThisYear } from 'utils/date';
import PreviewPane from 'components/search-page/search-results/preview-pane';
import SearchResults from 'components/search-page/search-results';
import SearchNoResult from 'components/search-page/search-results/search-no-result';
import SuggestionGroup from 'components/search-page/search-results/suggestion-group';
import SearchTags from 'components/search-page/search-tags';
import PinboardButton from 'components/search-page/pinboard/pinboard-button';


describe('SearchResults component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  const store = MockStore()({
    pinboard: null,
  });

  it('should render Loading when isRequesting', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchResults isRequesting={ true }/>
      </Provider>
    );
    findDOMNode(instance).innerText.should.containEql('Loading...');
  });

  it('should render SearchNoResult component when isEmpty', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchResults isEmpty={ true }/>
      </Provider>
    );

    findRenderedComponentWithType(instance, SearchNoResult).should.be.ok();
  });

  it('should render suggestionGroup components when data is available', function () {
    const suggestionGroups = [{ header: '1' }, { header: '2' }];
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchResults isEmpty={ false } suggestionGroups={ suggestionGroups }/>
      </Provider>
    );

    const renderedGroups = scryRenderedComponentsWithType(instance, SuggestionGroup);
    renderedGroups.should.have.length(2);
    renderedGroups[0].props.header.should.eql('1');
    renderedGroups[1].props.header.should.eql('2');
  });

  it('should render SearchTags component', function () {
    const onSelect = spy();

    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchResults
          tags={ [] }
          onSelect={ onSelect }
          contentType='community'
          isRequesting={ false }
        />
      </Provider>
    );

    const searchTags = findRenderedComponentWithType(instance, SearchTags);
    searchTags.props.tags.should.eql([]);
    searchTags.props.onSelect.should.eql(onSelect);
    searchTags.props.selected.should.eql('community');
    searchTags.props.isRequesting.should.eql(false);
  });

  it('should render PinboardButton component', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchResults />
      </Provider>
    );

    findRenderedComponentWithType(instance, PinboardButton);
  });

  context('in edit mode', function () {
    it('should render [+] sign when not aliasEditModeOn', function () {
      instance = renderIntoDocument(
        <Provider store={ store }>
          <SearchResults editModeOn={ true } aliasEditModeOn={ false }/>
        </Provider>
      );

      const domNode = findDOMNode(instance);
      domNode.textContent.should.containEql('[+]');
    });

    it('should not render [+] sign when in aliasEditModeOn', function () {
      instance = renderIntoDocument(
        <Provider store={ store }>
          <SearchResults editModeOn={ true } aliasEditModeOn={ true }/>
        </Provider>
      );

      const domNode = findDOMNode(instance);
      domNode.textContent.should.not.containEql('[+]');
    });
  });

  it('should trigger move when up key pressed', function () {
    const move = spy();
    const totalItemCount = 3;
    const direction = 'up';
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchResults move={ move } totalItemCount={ totalItemCount }/>
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
        <SearchResults move={ move } totalItemCount={ totalItemCount }/>
      </Provider>
    );
    Mousetrap.trigger(direction);
    move.calledWith(direction, totalItemCount).should.be.true();
  });

  it('should resetNavigation to 0 when unmounted', function () {
    const resetNavigation = spy();
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchResults resetNavigation={ resetNavigation }/>
      </Provider>
    );
    unmountComponentSuppressError(instance);

    resetNavigation.calledWith(0).should.be.true();
  });

  it('should be renderable when there is not single content', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchResults singleContent={ false }/>
      </Provider>
    );

    findRenderedDOMComponentWithClass(instance, 'content-wrapper');
  });

  it('should be renderable if it is single content', function () {
    const suggestionGroups = [{
      canLoadMore: true,
      header: 'OFFICER'
    }];
    const getSuggestionWithContentType = stub().returns({ catch: stub() });

    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchResults
          singleContent={ true }
          isEmpty={ false }
          suggestionGroups={ suggestionGroups }
          getSuggestionWithContentType={ getSuggestionWithContentType }/>
      </Provider>
    );

    findRenderedDOMComponentWithClass(instance, 'content-wrapper');
  });

  describe('Preview Pane', function () {
    it('should render PreviewPane when an officer is focused', function () {
      const previewPaneInfo = {
        data: [
          ['unit', '001'],
          ['rank', null],
          ['2017 salary', '$99,999'],
          ['race', 'White'],
          ['sex', 'Male']
        ],
        title: 'John Wang',
        visualTokenBackgroundColor: '#fafafa',
        visualTokenImg: 'http://test.img'
      };
      instance = renderIntoDocument(
        <Provider store={ store }>
          <SearchResults isEmpty={ false } previewPaneInfo={ previewPaneInfo }/>
        </Provider>
      );

      const previewPane = findRenderedComponentWithType(instance, PreviewPane);
      const currentYear = getThisYear();

      previewPane.props.data.should.eql([
        ['unit', '001'],
        ['rank', null],
        [`${currentYear} salary`, '$99,999'],
        ['race', 'White'],
        ['sex', 'Male']
      ]);
      previewPane.props.visualTokenImg.should.eql('http://test.img');
      previewPane.props.visualTokenBackgroundColor.should.eql('#fafafa');
      previewPane.props.title.should.eql('John Wang');
    });
  });
});


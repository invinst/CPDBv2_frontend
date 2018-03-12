import React from 'react';
import {
  findRenderedComponentWithType,
  renderIntoDocument,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { spy, stub } from 'sinon';
import Mousetrap from 'mousetrap';

import { unmountComponentSuppressError } from 'utils/test';
import { getThisYear } from 'utils/date';
import PreviewPane from 'components/search-page/search-results/preview-pane';
import SearchResults from 'components/search-page/search-results';
import SearchNoResult from 'components/search-page/search-results/search-no-result';
import SuggestionGroup from 'components/search-page/search-results/suggestion-group';
import MinimalScrollBars from 'components/common/minimal-scroll-bars';


describe('SearchResults component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    const suggestionGroups = [];
    SearchResults.should.be.renderable({ suggestionGroups });
  });

  it('should render Loading when isRequesting', function () {
    instance = renderIntoDocument(
      <SearchResults isRequesting={ true }/>
    );
    findDOMNode(instance).innerText.should.containEql('Loading...');
  });

  it('should render SearchNoResult component when isEmpty', function () {
    instance = renderIntoDocument(
      <SearchResults isEmpty={ true }/>
    );

    findRenderedComponentWithType(instance, SearchNoResult).should.be.ok();
  });

  it('should render suggestionGroup components when data is available', function () {
    const suggestionGroups = [{ header: '1' }, { header: '2' }];
    instance = renderIntoDocument(
      <SearchResults isEmpty={ false } suggestionGroups={ suggestionGroups }/>
    );

    const renderedGroups = scryRenderedComponentsWithType(instance, SuggestionGroup);
    renderedGroups.should.have.length(2);
    renderedGroups[0].props.header.should.eql('1');
    renderedGroups[1].props.header.should.eql('2');
  });

  context('in edit mode', function () {
    it('should render [+] sign when not aliasEditModeOn', function () {
      instance = renderIntoDocument(
        <SearchResults editModeOn={ true } aliasEditModeOn={ false }/>
      );

      const domNode = findDOMNode(instance);
      domNode.textContent.should.containEql('[+]');
    });

    it('should not render [+] sign when in aliasEditModeOn', function () {
      instance = renderIntoDocument(
        <SearchResults editModeOn={ true } aliasEditModeOn={ true }/>
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
      <SearchResults move={ move } totalItemCount={ totalItemCount }/>
    );
    Mousetrap.trigger(direction);
    move.calledWith(direction, totalItemCount).should.be.true();
  });

  it('should trigger move when down key pressed', function () {
    const move = spy();
    const totalItemCount = 3;
    const direction = 'down';
    instance = renderIntoDocument(
      <SearchResults move={ move } totalItemCount={ totalItemCount }/>
    );
    Mousetrap.trigger(direction);
    move.calledWith(direction, totalItemCount).should.be.true();
  });

  it('should resetNavigation to 0 when unmounted', function () {
    const resetNavigation = spy();
    instance = renderIntoDocument(
      <SearchResults resetNavigation={ resetNavigation }/>
    );
    unmountComponentSuppressError(instance);

    resetNavigation.calledWith(0).should.be.true();
  });

  it('should render MinimalScrollBars as content-wrapper if it is NOT single content', function () {
    instance = renderIntoDocument(<SearchResults singleContent={ false }/>);
    const scrollBars = findRenderedComponentWithType(instance, MinimalScrollBars);

    scrollBars.props.className.should.eql('content-wrapper');
  });

  it('should render MinimalScrollBars as suggestion-group if it is SINGLE CONTENT', function () {
    const suggestionGroups = [{
      canLoadMore: true,
      header: 'OFFICER'
    }];
    const getSuggestionWithContentType = stub().returns({ catch: stub() });
    instance = renderIntoDocument(
      <SearchResults
        singleContent={ true }
        isEmpty={ false }
        suggestionGroups={ suggestionGroups }
        getSuggestionWithContentType={ getSuggestionWithContentType }
      />
    );
    const scrollBars = findRenderedComponentWithType(instance, MinimalScrollBars);

    scrollBars.props.className.should.eql('test--suggestion-group');
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
        <SearchResults isEmpty={ false } previewPaneInfo={ previewPaneInfo }/>
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

import React from 'react';
import {
  findRenderedComponentWithType,
  renderIntoDocument,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';
import { stub } from 'sinon';
import { findDOMNode } from 'react-dom';

import PreviewPane from 'components/search-page/search-results/preview-pane';
import SearchResults from 'components/search-page/search-results';
import SearchNoResult from 'components/search-page/search-results/search-no-result';
import SuggestionGroup from 'components/search-page/search-results/suggestion-group';
import { unmountComponentSuppressError } from 'utils/test';


describe('SearchResults component', function () {
  let instance;

  beforeEach(function () {
    stub(Date.prototype, 'getFullYear').returns(2017);
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
    Date.prototype.getFullYear.restore();
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

      previewPane.props.data.should.eql([
        ['unit', '001'],
        ['rank', null],
        ['2017 salary', '$99,999'],
        ['race', 'White'],
        ['sex', 'Male']
      ]);
      previewPane.props.visualTokenImg.should.eql('http://test.img');
      previewPane.props.visualTokenBackgroundColor.should.eql('#fafafa');
      previewPane.props.title.should.eql('John Wang');
    });
  });
});

import React from 'react';
import ReactDOM from 'react-dom';
import {
  Simulate, renderIntoDocument, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass,
  findRenderedComponentWithType
} from 'react-addons-test-utils';
import { stub, spy } from 'sinon';
import { browserHistory } from 'react-router';
import Mousetrap from 'mousetrap';
import lodash from 'lodash';

import SearchTags from 'components/search-page/search-tags';
import SearchBox from 'components/search-page/search-box';
import SearchContent from 'components/search-page/search-content';
import { unmountComponentSuppressError } from 'utils/test';
import * as domUtils from 'utils/dom';


describe('SearchContent component', function () {
  let instance;

  beforeEach(function () {
    this.locationAssign = stub(window.location, 'assign');
    this.browserHistoryPush = stub(browserHistory, 'push');
    // Stub lodash.debounce() so that it returns the input function as-is
    this.debounceStub = stub(lodash, 'debounce').callsFake(func => func);
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
    this.locationAssign.restore();
    this.browserHistoryPush.restore();
    this.debounceStub.restore();
  });

  it('should be renderable', function () {
    SearchContent.should.be.renderable();
  });

  it('should call api when user type in', function () {
    const getSuggestion = spy();

    instance = renderIntoDocument(
      <SearchContent getSuggestion={ getSuggestion }/>
    );
    const searchInput = findRenderedDOMComponentWithTag(instance, 'input');
    searchInput.value = 'a';
    Simulate.change(searchInput);
    getSuggestion.calledWith('a', {
      contentType: null,
      limit: 9
    }).should.be.true();
  });

  it('should clear all tags when user remove all text', function () {
    const selectTag = spy();
    instance = renderIntoDocument(
      <SearchContent selectTag={ selectTag }/>
    );
    const searchInput = findRenderedDOMComponentWithTag(instance, 'input');
    searchInput.value = '';
    Simulate.change(searchInput);
    selectTag.calledWith(null).should.be.true();
  });

  it('should call api when user select a tag', function () {
    const getSuggestion = spy();
    const tags = ['a'];

    instance = renderIntoDocument(
      <SearchContent getSuggestion={ getSuggestion } tags={ tags } query={ 'a' }/>
    );

    const suggestionTagsElement = findRenderedComponentWithType(instance, SearchTags);
    const tagElement = findRenderedDOMComponentWithTag(suggestionTagsElement, 'span');
    Simulate.click(tagElement);
    getSuggestion.calledWith('a', {
      contentType: 'a'
    }).should.be.true();
  });

  it('should call api when user deselect a tag', function () {
    const getSuggestion = spy();
    const tags = ['a'];

    instance = renderIntoDocument(
      <SearchContent getSuggestion={ getSuggestion } tags={ tags } contentType='a' query='b' />
    );

    const suggestionTagsElement = findRenderedComponentWithType(instance, SearchTags);
    const tagElement = findRenderedDOMComponentWithTag(suggestionTagsElement, 'span');
    Simulate.click(tagElement);
    getSuggestion.calledWith('b').should.be.true();
  });

  it('should call router.goBack when user click on searchbar__button--back', function () {
    const router = { goBack: spy() };

    instance = renderIntoDocument(
      <SearchContent router={ router }/>
    );

    const backButton = findRenderedDOMComponentWithClass(instance, 'searchbar__button--back');
    Simulate.click(backButton);
    router.goBack.calledOnce.should.be.true();
  });

  it('should call router.goBack when user hit ESCAPE', function () {
    const router = { goBack: spy() };

    instance = renderIntoDocument(
      <SearchContent router={ router }/>
    );

    Mousetrap.trigger('esc');
    router.goBack.calledOnce.should.be.true();
  });

  it('should follow the first result url when user hit ENTER', function () {
    const suggestionGroups = [
      {
        header: 'OFFICER',
        columns: [
          [{ payload: { url: 'url' } }]
        ]
      }
    ];

    instance = renderIntoDocument(
      <SearchContent suggestionGroups={ suggestionGroups } />
    );

    const searchComponent = findRenderedComponentWithType(instance, SearchBox);
    searchComponent.mousetrap.trigger('enter');
    this.locationAssign.calledWith('url').should.be.true();
    this.browserHistoryPush.called.should.be.false();
  });

  it('should push first result to when user hit ENTER if to is set', function () {
    const suggestionGroups = [
      {
        header: 'OFFICER',
        columns: [
          [{ payload: { url: 'url', to: 'to' } }]
        ]
      }
    ];

    instance = renderIntoDocument(
      <SearchContent suggestionGroups={ suggestionGroups } />
    );

    const searchComponent = findRenderedComponentWithType(instance, SearchBox);
    searchComponent.mousetrap.trigger('enter');
    this.browserHistoryPush.calledWith('to').should.be.true();
    this.locationAssign.called.should.be.false();
  });

  it('should follow the v1 search url when user hit ENTER but there\'s no results', function () {
    instance = renderIntoDocument(
      <SearchContent query={ 'something' }/>
    );

    const searchComponent = findRenderedComponentWithType(instance, SearchBox);
    searchComponent.mousetrap.trigger('enter');

    this.locationAssign.calledWith('http://cpdb.lvh.me/s/something').should.be.true();
  });

  it('should track recent suggestion when user press ENTER and there are results', function () {
    const trackRecentSuggestion = spy();
    const suggestionGroups = [
      {
        header: 'OFFICER',
        columns: [
          [{ payload: { url: 'url', to: 'to', 'result_text': 'Kevin' } }]
        ]
      }
    ];

    instance = renderIntoDocument(
      <SearchContent suggestionGroups={ suggestionGroups } trackRecentSuggestion={ trackRecentSuggestion }/>
    );

    const searchComponent = findRenderedComponentWithType(instance, SearchBox);
    searchComponent.mousetrap.trigger('enter');
    trackRecentSuggestion.calledWith('OFFICER', 'Kevin', 'url').should.be.true();
  });

  it('should trigger move when up key pressed', function () {
    const move = spy();
    const suggestionColumns = [];
    const direction = 'up';
    instance = renderIntoDocument(
      <SearchContent move={ move } suggestionColumns={ suggestionColumns }/>
    );
    Mousetrap.trigger(direction);
    move.calledWith(direction, suggestionColumns).should.be.true();
  });

  it('should trigger move when down key pressed', function () {
    const move = spy();
    const suggestionColumns = [];
    const direction = 'down';
    instance = renderIntoDocument(
      <SearchContent move={ move } suggestionColumns={ suggestionColumns }/>
    );
    Mousetrap.trigger(direction);
    move.calledWith(direction, suggestionColumns).should.be.true();
  });

  it('should trigger move when left key pressed', function () {
    const move = spy();
    const suggestionColumns = [];
    const direction = 'left';
    instance = renderIntoDocument(
      <SearchContent move={ move } suggestionColumns={ suggestionColumns }/>
    );
    Mousetrap.trigger(direction);
    move.calledWith(direction, suggestionColumns).should.be.true();
  });

  it('should trigger move when right key pressed', function () {
    const move = spy();
    const suggestionColumns = [];
    const direction = 'right';
    instance = renderIntoDocument(
      <SearchContent move={ move } suggestionColumns={ suggestionColumns }/>
    );
    Mousetrap.trigger(direction);
    move.calledWith(direction, suggestionColumns).should.be.true();
  });

  describe('after keyboard navigation', function () {
    beforeEach(function () {
      this.scrollToElementStub = stub(domUtils, 'scrollToElement');
    });

    afterEach(function () {
      this.scrollToElementStub.restore();
    });

    it ('should scroll to focused item', function () {
      const domNode = document.createElement('div');
      ReactDOM.render(<SearchContent navigation={ { columnIndex: 0, itemIndex: 0 } }/>, domNode);
      ReactDOM.render(<SearchContent navigation={ { columnIndex: 1, itemIndex: 0 } }/>, domNode);
      this.scrollToElementStub.calledWith('#suggestion-item-1-0').should.be.true();
    });
  });

  describe('handleViewItem', function () {
    it('should use browserHistory.push() if visiting focused item with internal link', function () {
      instance = renderIntoDocument(
        <SearchContent focusedSuggestion={ { payload: { to: '/dummy/url' } } }/>
      );
      Mousetrap.trigger('enter');
      this.browserHistoryPush.calledWith('/dummy/url').should.be.true();
      this.locationAssign.called.should.be.false();
    });

    it('should use window.location.assign() if visiting focused item with external link', function () {
      instance = renderIntoDocument(
        <SearchContent focusedSuggestion={ { payload: { url: 'http://whatever.local' } } }/>
      );
      Mousetrap.trigger('enter');
      this.locationAssign.calledWith('http://whatever.local').should.be.true();
      this.browserHistoryPush.called.should.be.false();
    });
  });
});

import React from 'react';
import { Link, Router, Route, createMemoryHistory } from 'react-router';
import {
  renderIntoDocument, Simulate, findRenderedDOMComponentWithClass, findRenderedComponentWithType,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import * as constants from 'utils/constants';
import TextWithInlineSearchAlias
  from 'components/search-page/search-results/suggestion-group/suggestion-item/text-with-inline-search-alias';


describe('TextWithInlineSearchAlias component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render text correctly', function () {
    instance = renderIntoDocument(
      <TextWithInlineSearchAlias text='text' textClassName='test--text-class-name'/>
    );

    const textContent = findRenderedDOMComponentWithClass(instance, 'test--text-class-name');
    textContent.textContent.should.be.equal('text');
  });

  it('should render Link if aliasEditModeOn', function () {
    instance = renderIntoDocument(
      <TextWithInlineSearchAlias text='text' aliasEditModeOn={ true }/>
    );

    const linkElement = findRenderedComponentWithType(instance, Link);
    linkElement.props.to.should.equal(`/edit/${constants.INLINE_SEARCH_ALIAS_ADMIN_PATH}`);
  });

  it('should trigger setAliasAdminPageContent if we click on inline search alias link', function () {
    const setAliasAdminPageContent = stub();

    const renderer = () => (
      <TextWithInlineSearchAlias
        text='text'
        aliasEditModeOn={ true }
        content='content'
        setAliasAdminPageContent={ setAliasAdminPageContent } />
    );

    instance = renderIntoDocument(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ renderer } />
      </Router>
    );

    const linkElement = findRenderedComponentWithType(instance, Link);
    Simulate.click(findDOMNode(linkElement));

    setAliasAdminPageContent.calledWith('content').should.be.true();
  });
});

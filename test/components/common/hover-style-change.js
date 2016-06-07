import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType, Simulate } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import isMobile from 'ismobilejs';

import HoverStyleChange from 'components/common/hover-style-change';
import ArticleContent from 'components/common/article-content';

describe('HoverStyleChange component', function () {
  it('should render children with normal style', function () {
    let element = renderIntoDocument(
      <HoverStyleChange styleChange={ { color: 'black' } }>
        <ArticleContent style={ { color: 'white' } }/>
      </HoverStyleChange>);
    findRenderedComponentWithType(element, ArticleContent).props.style.should.deepEqual({ color: 'white' });
  });

  it('should render children with changed style on mouse over', function () {
    let element = renderIntoDocument(
      <HoverStyleChange styleChange={ { color: 'black' } }>
        <ArticleContent style={ { color: 'white' } }/>
      </HoverStyleChange>);
    Simulate.mouseOver(findDOMNode(element));
    findRenderedComponentWithType(element, ArticleContent).props.style.should.deepEqual({ color: 'black' });
  });

  it('should render children with normal style on mouse out', function () {
    let element = renderIntoDocument(
      <HoverStyleChange styleChange={ { color: 'black' } }>
        <ArticleContent style={ { color: 'white' } }/>
      </HoverStyleChange>);
    Simulate.mouseOver(findDOMNode(element));
    Simulate.mouseOut(findDOMNode(element));
    findRenderedComponentWithType(element, ArticleContent).props.style.should.deepEqual({ color: 'white' });
  });

  it('should render children with normal style on touch on touch devices', function () {
    isMobile.any = true;
    let element = renderIntoDocument(
      <HoverStyleChange styleChange={ { color: 'black' } }>
        <ArticleContent style={ { color: 'white' } }/>
      </HoverStyleChange>);
    Simulate.mouseOver(findDOMNode(element));
    findRenderedComponentWithType(element, ArticleContent).props.style.should.deepEqual({ color: 'white' });
  });
});

import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

import ArticleSmall from 'components/common/article-small';
import ArticleHeader from 'components/common/article-header';
import { unmountComponentSuppressError } from 'utils/test';


describe('ArticleSmall component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render header if provided', function () {
    const testText = 'this should render';
    instance = renderIntoDocument(<ArticleSmall header={ 'header' } paragraphs={ [testText] }/>);
    findRenderedComponentWithType(instance, ArticleHeader).should.be.ok();
  });

  it('should render it\'s children', function () {
    const testText = 'this should render';
    instance = renderIntoDocument(<ArticleSmall paragraphs={ [testText] }/>);
    findDOMNode(instance).innerHTML.should.containEql(testText);
  });

  it('should trigger onClick', function () {
    ArticleSmall.should.triggerCallbackWhenClick('onClick', 'article-small', { paragraphs: ['abc'] });
  });
});

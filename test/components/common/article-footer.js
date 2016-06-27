import React from 'react';
import {
  renderIntoDocument, findRenderedComponentWithType, scryRenderedComponentsWithType, findRenderedDOMComponentWithTag
 } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Link from 'components/common/react-router-link';
import ArticleFooter from 'components/common/article-footer';


describe('ArticleFooter component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render', function () {
    ArticleFooter.should.be.renderable();
  });

  it('should render Link if property `to` exists', function () {
    let instance = renderIntoDocument(<ArticleFooter to='/path/to'/>);
    findRenderedComponentWithType(instance, Link).should.be.ok();
  });

  it('should render anchor if property `to` not exists', function () {
    let instance = renderIntoDocument(<ArticleFooter/>);
    findRenderedDOMComponentWithTag(instance, 'a').should.be.ok();
    scryRenderedComponentsWithType(instance, Link).length.should.eql(0);
  });
});

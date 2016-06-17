import React from 'react';
import { Link } from 'react-router';

import ArticleFooter from 'components/common/article-footer';
import { unmountComponentSuppressError } from 'utils/test';


describe('ArticleFooter component', function () {
  let element;

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should render', function () {
    ArticleFooter.should.be.renderable();
  });

  it('should call onClick callback if defined', function () {
    ArticleFooter.should.triggerCallbackWhenClick('onClick', Link);
  });
});

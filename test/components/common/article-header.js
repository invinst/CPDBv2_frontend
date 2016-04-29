import 'should';
import React from 'react';

import ArticleHeader from 'components/common/article-header';
import 'utils/test/React';


describe('ArticleHeader component', function () {
  it('should render', function () {
    ArticleHeader.should.be.renderable();
  });
});

import 'should';
import React from 'react';

import ArticleTitle from 'components/common/article-title';
import 'utils/test/React';


describe('ArticleTitle component', function () {
  it('should render', function () {
    ArticleTitle.should.be.renderable();
  });
});

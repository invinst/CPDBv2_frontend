import 'should';
import React from 'react';

import ArticleContent from 'components/common/article-content';
import 'utils/test/React';


describe('ArticleContent component', function () {
  it('should render', function () {
    ArticleContent.should.be.renderable();
  });
});

import 'should';
import React from 'react';

import ArticleSmall from 'components/common/article-small';
import 'utils/test/React';


describe('ArticleSmall component', function () {
  it('should render', function () {
    ArticleSmall.should.be.renderable();
  });
});

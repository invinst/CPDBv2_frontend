import 'should';
import React from 'react';

import ArticleExpanded from 'components/common/article-expanded';
import 'utils/test/React';


describe('ArticleExpanded component', function () {
  it('should render', function () {
    ArticleExpanded.should.be.renderable();
  });
});

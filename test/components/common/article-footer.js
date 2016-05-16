import 'should';
import React from 'react';

import ArticleFooter from 'components/common/article-footer';
import 'utils/test/React';


describe('MoreLink component', function () {
  it('should render', function () {
    ArticleFooter.should.be.renderable();
  });
});

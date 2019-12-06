import React from 'react';
import { mount } from 'enzyme';

import ArticleSmall from 'components/common/article-small';
import ArticleHeader from 'components/common/article-header';


describe('ArticleSmall component', function () {
  it('should render header if provided', function () {
    const testText = 'this should render';
    const wrapper = mount(<ArticleSmall header={ 'header' } paragraphs={ [testText] }/>);
    wrapper.find(ArticleHeader).exists().should.be.true();
  });

  it('should render its children', function () {
    const testText = 'this should render';
    const wrapper = mount(<ArticleSmall paragraphs={ [testText] }/>);
    wrapper.text().should.containEql(testText);
  });

  it('should trigger onClick', function () {
    ArticleSmall.should.triggerCallbackWhenClick('onClick', '.article-small', { paragraphs: ['abc'] });
  });
});

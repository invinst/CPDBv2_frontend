import React from 'react';
import { shallow, mount } from 'enzyme';

import ArticleSmall from 'components/common/article-small';
import ArticleHeader from 'components/common/article-header';


describe('ArticleSmall component', function () {
  it('should render header if provided', function () {
    const testText = 'this should render';
    const wrapper = shallow(<ArticleSmall header={ 'header' } paragraphs={ [testText] }/>);
    wrapper.find(ArticleHeader).should.be.ok();
  });

  it('should render its children', function () {
    const testText = 'this should render';
    const wrapper = mount(<ArticleSmall paragraphs={ [testText] }/>);
    wrapper.text().should.containEql(testText);
  });

  it('should trigger onClick', function () {
    ArticleSmall.should.triggerCallbackWhenClick('onClick', 'article-small', { paragraphs: ['abc'] });
  });
});

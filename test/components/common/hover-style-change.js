import React from 'react';
import { shallow } from 'enzyme';
import isMobile from 'ismobilejs';

import HoverStyleChange from 'components/common/hover-style-change';
import ArticleContent from 'components/common/article-content';

describe('HoverStyleChange component', function () {
  it('should render children with normal style', function () {
    const wrapper = shallow(
      <HoverStyleChange styleChange={ { color: 'black' } }>
        <ArticleContent style={ { color: 'white' } }/>
      </HoverStyleChange>);
    wrapper.find(ArticleContent).prop('style').should.deepEqual({ color: 'white' });
  });

  it('should render children with changed style on mouse over', function () {
    const wrapper = shallow(
      <HoverStyleChange styleChange={ { color: 'black' } }>
        <ArticleContent style={ { color: 'white' } }/>
      </HoverStyleChange>);
    wrapper.simulate('mouseOver');
    wrapper.find(ArticleContent).prop('style').should.deepEqual({ color: 'black' });
  });

  it('should render children with normal style on mouse out', function () {
    const wrapper = shallow(
      <HoverStyleChange styleChange={ { color: 'black' } }>
        <ArticleContent style={ { color: 'white' } }/>
      </HoverStyleChange>);
    wrapper.simulate('mouseOver');
    wrapper.simulate('mouseOut');
    wrapper.find(ArticleContent).prop('style').should.deepEqual({ color: 'white' });
  });

  it('should render children with normal style on touch on touch devices', function () {
    isMobile.any = true;
    const wrapper = shallow(
      <HoverStyleChange styleChange={ { color: 'black' } }>
        <ArticleContent style={ { color: 'white' } }/>
      </HoverStyleChange>);
    wrapper.simulate('mouseOver');
    wrapper.find(ArticleContent).prop('style').should.deepEqual({ color: 'white' });
    isMobile.any = false;
  });
});

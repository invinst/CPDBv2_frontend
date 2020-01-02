import React from 'react';
import { shallow } from 'enzyme';
import { internet } from 'faker';

import CoverImage from 'components/common/cover-image';


describe('CoverImage component', function () {
  it('should render', function () {
    CoverImage.should.be.renderable();
  });

  it('should render with image style', function () {
    const imageUrl = internet.url();
    const wrapper = shallow(
      <CoverImage src={ imageUrl }/>
    );
    wrapper.prop('style').background.should.containEql(imageUrl);
  });

  it('should render without image style when src is empty', function () {
    const wrapper = shallow(
      <CoverImage src={ '' }/>
    );
    const divElement = wrapper.find('div');
    divElement.should.not.have.keys('background');
  });
});

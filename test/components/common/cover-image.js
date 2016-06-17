import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithTag } from 'react-addons-test-utils';
import { internet } from 'faker';

import CoverImage from 'components/common/cover-image';


describe('CoverImage component', function () {
  it('should render', function () {
    CoverImage.should.be.renderable();
  });

  it('should render with image style', function () {
    const imageUrl = internet.url();
    const instance = renderIntoDocument(
      <CoverImage src={ imageUrl }/>
    );
    const divElement = findRenderedDOMComponentWithTag(instance, 'div');
    divElement.getAttribute('style').should.containEql(imageUrl);
  });

  it('should render without image style when src is empty', function () {
    const instance = renderIntoDocument(
      <CoverImage src={ '' }/>
    );
    const divElement = findRenderedDOMComponentWithTag(instance, 'div');
    divElement.should.not.have.keys('background');
  });
});

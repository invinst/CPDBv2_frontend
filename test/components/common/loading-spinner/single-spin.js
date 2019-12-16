import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import SingleSpin from 'components/common/loading-spinner/single-spin';


describe('SingleSpin component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render enough content', function () {
    instance = renderIntoDocument(
      <SingleSpin
        transform='rotate(150 50 50)'
        begin='0.25s'
        fill='#ACB123'
      />
    );

    const element = findRenderedDOMComponentWithTag(instance, 'g');
    element.className.should.containEql('animation');
    element.getAttribute('transform').should.containEql('rotate(150 50 50)');

    const rect = findRenderedDOMComponentWithTag(instance, 'rect');
    rect.className.should.containEql('animation');
    rect.getAttribute('fill').should.equal('#ACB123');

    const animate = findRenderedDOMComponentWithTag(instance, 'animate');
    animate.className.should.containEql('animation');
    animate.getAttribute('begin').should.equal('0.25s');
  });
});

import React from 'react';
import { findRenderedDOMComponentWithTag, renderIntoDocument } from 'react-addons-test-utils';

import MagnifyingGlass from 'components/common/icons/magnifying-glass';
import { unmountComponentSuppressError } from 'utils/test';

describe('MagnifyingGlass component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    MagnifyingGlass.should.be.renderable();
  });

  it('should render with correct props', function () {
    instance = renderIntoDocument(
      <MagnifyingGlass
        className='magnifying-glass'
        color='#00EEFF'
        size={ 12 }
      />
    );

    const svg = findRenderedDOMComponentWithTag(instance, 'svg');
    svg.getAttribute('class').should.containEql('magnifying-glass');
    svg.getAttribute('width').should.eql('12');
    svg.getAttribute('height').should.eql('12');

    const path = findRenderedDOMComponentWithTag(instance, 'path');
    path.getAttribute('fill').should.eql('#00EEFF');
  });
});

import React from 'react';
import should from 'should';
import {
  renderIntoDocument,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError } from 'utils/test';
import Diagram from 'components/landing-page/common/pairing-card/pairing-chart/venn-diagram';


describe('VennDiagram component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render 2 circles with correct path colors and the intersection', function () {
    instance = renderIntoDocument(
      <Diagram
        background1={ 'red' }
        background2={ 'white' }
      />
    );
    const instanceEl = findDOMNode(instance);

    // the circles
    const circles = instanceEl.querySelectorAll('.venn-circle');
    circles.should.have.length(2);

    // the paths
    const path0 = circles[0].querySelector('path');
    path0.style.fill.should.eql('red');
    const path1 = circles[1].querySelector('path');
    path1.style.fill.should.eql('white');

    // the intersection
    const intersection = instanceEl.querySelector('.venn-intersection path');
    should(intersection).not.be.null();
    intersection.style.fill.should.eql('rgb(35, 31, 32)');
  });
});

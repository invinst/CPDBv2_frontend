import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError } from 'utils/test';
import LoadingSpinner from 'components/common/loading-spinner';
import SingleSpin from 'components/common/loading-spinner/single-spin';


describe('LoadingSpinner component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render 12 SingleSpin elements', function () {
    instance = renderIntoDocument(
      <LoadingSpinner
        className='test--loading-spinner'
        fill='#ACB123'
      />
    );

    findDOMNode(instance).getAttribute('class').should.containEql('test--loading-spinner').and.containEql('animation');

    const singleSpins = scryRenderedComponentsWithType(instance, SingleSpin);
    singleSpins.should.have.length(12);
    singleSpins[0].props.transform.should.equal('rotate(0 50 50)');
    singleSpins[1].props.transform.should.equal('rotate(30 50 50)');
    singleSpins[2].props.transform.should.equal('rotate(60 50 50)');
    singleSpins[3].props.transform.should.equal('rotate(90 50 50)');
    singleSpins[4].props.transform.should.equal('rotate(120 50 50)');
    singleSpins[5].props.transform.should.equal('rotate(150 50 50)');
    singleSpins[6].props.transform.should.equal('rotate(180 50 50)');
    singleSpins[7].props.transform.should.equal('rotate(210 50 50)');
    singleSpins[8].props.transform.should.equal('rotate(240 50 50)');
    singleSpins[9].props.transform.should.equal('rotate(270 50 50)');
    singleSpins[10].props.transform.should.equal('rotate(300 50 50)');
    singleSpins[11].props.transform.should.equal('rotate(330 50 50)');

    singleSpins.map(singleSpin => singleSpin.props.fill.should.equal('#ACB123'));
  });
});

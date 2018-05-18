import React from 'react';
import { unmountComponentSuppressError } from 'utils/test';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';

import RadarAxisText from 'components/common/radar-chart/radar-axis-text';


describe('RadarAxisText component', function () {
  let instance;

  afterEach(function () {
    if (instance) {
      unmountComponentSuppressError(instance);
    }
  });

  it('should draw 3 lines if have 3 axis titles', () => {
    const titles = ['a', 'b', 'c'];
    instance = renderIntoDocument(
      <RadarAxisText radius={ 100 } axisTitles={ titles }/>
    );

    const items = scryRenderedDOMComponentsWithClass(instance, 'test--radar-axis-text');

    items[0].textContent.should.be.eql('a');
    items[1].textContent.should.be.eql('b');
    items[2].textContent.should.be.eql('c');
  });

  it('should show the last word in a new line if the title contains 2 words or more', function () {
    const titles = ['Title is 1', 'A', 'b'];
    instance = renderIntoDocument(
      <RadarAxisText radius={ 100 } axisTitles={ titles }/>
    );

    const texts = scryRenderedDOMComponentsWithClass(instance, 'test--radar-axis-text');

    const lines = texts[0].querySelectorAll('tspan');
    lines.should.have.length(2);
    lines[0].textContent.should.be.eql('Title is');
    lines[1].textContent.should.be.eql('1');

    texts[1].querySelectorAll('tspan').should.have.length(1);
  });
});

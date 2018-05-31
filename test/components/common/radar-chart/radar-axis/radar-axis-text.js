import React from 'react';
import { unmountComponentSuppressError } from 'utils/test';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';

import RadarAxisText from 'components/common/radar-chart/radar-axis/radar-axis-text';


describe('RadarAxisText component', function () {
  let instance;

  afterEach(function () {
    if (instance) {
      unmountComponentSuppressError(instance);
    }
  });

  it('should draw 3 lines if have 3 axis titles', () => {
    const data = [
      {
        axis: 'a',
        value: 10,
      },
      {
        axis: 'b',
        value: 50,
      },
      {
        axis: 'c',
        value: 20,
      }
    ];
    instance = renderIntoDocument(
      <RadarAxisText radius={ 100 } data={ data } showAxisTitle={ true }/>
    );

    const items = scryRenderedDOMComponentsWithClass(instance, 'test--radar-axis-text');

    items[0].textContent.should.be.eql('a');
    items[1].textContent.should.be.eql('b');
    items[2].textContent.should.be.eql('c');
  });

  it('should show the last word in a new line if the title contains 2 words or more', function () {
    const data = [
      {
        axis: 'Title is 1',
        value: 10,
      },
      {
        axis: 'b',
        value: 50,
      },
      {
        axis: 'c',
        value: 20,
      }
    ];
    instance = renderIntoDocument(
      <RadarAxisText radius={ 100 } data={ data } showAxisTitle={ true }/>
    );

    const texts = scryRenderedDOMComponentsWithClass(instance, 'test--radar-axis-text');

    const lines = texts[0].querySelectorAll('tspan');
    lines.should.have.length(2);
    lines[0].textContent.should.be.eql('Title is');
    lines[1].textContent.should.be.eql('1');

    texts[1].querySelectorAll('tspan').should.have.length(2);
  });

  it('should show axis values if showAxisValue is true', function () {
    const data = [
      {
        axis: 'Title is 1',
        value: 10,
      },
      {
        axis: 'b',
        value: 50,
      },
      {
        axis: 'c',
        value: 20,
      }
    ];
    instance = renderIntoDocument(
      <RadarAxisText radius={ 100 } data={ data } showAxisValue={ true }/>
    );

    const items = scryRenderedDOMComponentsWithClass(instance, 'test--radar-axis-text');
    items.should.have.length(3);
    items[0].textContent.should.be.eql('10%');
    items[1].textContent.should.be.eql('50%');
    items[2].textContent.should.be.eql('20%');
  });
});

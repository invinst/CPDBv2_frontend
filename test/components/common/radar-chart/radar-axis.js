import React from 'react';
import { shallow } from 'enzyme';

import RadarAxis from 'components/common/radar-chart/radar-axis';


describe('RadarAxis component', function () {
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
      },
    ];
    const wrapper = shallow(
      <RadarAxis radius={ 100 } data={ data } showAxisTitle={ true }/>
    );

    const items = wrapper.find('.test--radar-axis-text');

    items.at(0).text().should.equal('a');
    items.at(1).text().should.equal('b');
    items.at(2).text().should.equal('c');
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
      },
    ];
    const wrapper = shallow(
      <RadarAxis radius={ 100 } data={ data } showAxisTitle={ true }/>
    );

    const texts = wrapper.find('.test--radar-axis-text');

    const lines = texts.at(0).find('tspan');
    lines.should.have.length(2);
    lines.at(0).text().should.equal('Title is');
    lines.at(1).text().should.equal('1');

    texts.at(1).find('tspan').should.have.length(2);
  });

  it('should show axis values if showAxisValue is true', function () {
    const data = [
      {
        axis: 'Title is 1',
        value: 0,
      },
      {
        axis: 'b',
        value: 50,
      },
      {
        axis: 'c',
        value: 20,
      },
    ];
    const wrapper = shallow(
      <RadarAxis radius={ 100 } data={ data } showAxisValue={ true }/>
    );

    const items = wrapper.find('.test--radar-axis-text');
    items.should.have.length(3);
    items.at(0).text().should.equal('0');
    items.at(1).text().should.equal('50');
    items.at(2).text().should.equal('20');
  });

  it('should show axis titles if showAxisTitle is true', function () {
    const data = [
      {
        axis: 'Title is 1',
        value: 0,
      },
      {
        axis: 'b',
        value: 50,
      },
      {
        axis: 'c',
        value: 20,
      },
    ];
    const wrapper = shallow(
      <RadarAxis radius={ 100 } data={ data } showAxisTitle={ true }/>
    );

    const items = wrapper.find('.test--radar-axis-text');
    items.should.have.length(3);
    items.at(0).text().should.equal('Title is1');
    items.at(1).text().should.equal('b');
    items.at(2).text().should.equal('c');
  });

  it('should be able to show percentile suffix and hide if value is zero', function () {
    const data = [
      {
        axis: 'Title is 1',
        value: 11,
      },
      {
        axis: 'b',
        value: 21,
      },
      {
        axis: 'c',
        value: 0,
      },
    ];
    const wrapper = shallow(
      <RadarAxis radius={ 100 } data={ data } showAxisValue={ true } showValueWithSuffix={ true }/>
    );

    const items = wrapper.find('.test--radar-axis-text');
    items.should.have.length(2);
    items.at(0).text().should.equal('11th percentile');
    items.at(1).text().should.equal('21st percentile');
  });
});

import React from 'react';
import { shallow } from 'enzyme';

import Legend from 'components/common/allegations-map/legend';
import Row from 'components/common/allegations-map/legend/row';


describe('Legend component', function () {
  it('should render rows correctly', function () {
    const legend = {
      allegationCount: 23,
      unsustainedCount: 20,
      sustainedCount: 3,
      useOfForceCount: 0,
      allegationLoading: true,
      useOfForceLoading: false,
    };
    const wrapper = shallow(<Legend legend={ legend } />);
    const legendRow = wrapper.find(Row);
    legendRow.should.have.length(4);
    legendRow.at(0).prop('number').should.equal(23);
    legendRow.at(0).prop('loading').should.be.true();
    legendRow.at(1).prop('number').should.equal(20);
    legendRow.at(2).prop('number').should.equal(3);
    legendRow.at(3).prop('number').should.equal(0);
    legendRow.at(3).prop('loading').should.be.false();
  });

  it('should not render rows with missing value', function () {
    const legend = {
      allegationCount: 23,
      useOfForceCount: 0,
    };
    const wrapper = shallow(<Legend legend={ legend } />);
    const legendRow = wrapper.find(Row);
    legendRow.should.have.length(2);
    legendRow.at(0).prop('number').should.equal(23);
    legendRow.at(1).prop('number').should.equal(0);
  });
});

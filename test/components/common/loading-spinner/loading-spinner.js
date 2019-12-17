import React from 'react';
import { shallow } from 'enzyme';

import LoadingSpinner from 'components/common/loading-spinner';
import SingleSpin from 'components/common/loading-spinner/single-spin';


describe('LoadingSpinner component', function () {
  it('should render 12 SingleSpin elements', function () {
    const wrapper = shallow(
      <LoadingSpinner
        className='test--loading-spinner'
        fill='#ACB123'
      />
    );

    wrapper.prop('className').should.containEql('test--loading-spinner').and.containEql('animation');

    const singleSpins = wrapper.find(SingleSpin);
    singleSpins.should.have.length(12);
    singleSpins.at(0).prop('transform').should.equal('rotate(0 50 50)');
    singleSpins.at(1).prop('transform').should.equal('rotate(30 50 50)');
    singleSpins.at(2).prop('transform').should.equal('rotate(60 50 50)');
    singleSpins.at(3).prop('transform').should.equal('rotate(90 50 50)');
    singleSpins.at(4).prop('transform').should.equal('rotate(120 50 50)');
    singleSpins.at(5).prop('transform').should.equal('rotate(150 50 50)');
    singleSpins.at(6).prop('transform').should.equal('rotate(180 50 50)');
    singleSpins.at(7).prop('transform').should.equal('rotate(210 50 50)');
    singleSpins.at(8).prop('transform').should.equal('rotate(240 50 50)');
    singleSpins.at(9).prop('transform').should.equal('rotate(270 50 50)');
    singleSpins.at(10).prop('transform').should.equal('rotate(300 50 50)');
    singleSpins.at(11).prop('transform').should.equal('rotate(330 50 50)');

    singleSpins.map(singleSpin => singleSpin.prop('fill').should.equal('#ACB123'));
  });
});

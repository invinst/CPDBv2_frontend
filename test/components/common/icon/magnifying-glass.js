import React from 'react';
import { mount } from 'enzyme';

import MagnifyingGlass from 'components/common/icons/magnifying-glass';

describe('MagnifyingGlass component', function () {
  it('should render with correct props', function () {
    const wrapper = mount(
      <MagnifyingGlass
        className='magnifying-glass'
        color='#00EEFF'
        size={ 12 }
      />
    );

    const svg = wrapper.find('svg');
    svg.getDOMNode().getAttribute('class').should.containEql('magnifying-glass');
    svg.getDOMNode().getAttribute('width').should.equal('12');
    svg.getDOMNode().getAttribute('height').should.equal('12');

    const path = wrapper.find('path');
    path.getDOMNode().getAttribute('fill').should.equal('#00EEFF');
  });
});

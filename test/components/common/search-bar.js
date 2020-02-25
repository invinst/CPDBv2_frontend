import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import SearchBar from 'components/common/search-bar';


describe('SearchBar component', function () {
  it('should trigger onChange on input change', function () {
    const onChange = spy();
    const wrapper = shallow(
      <SearchBar value='' onChange={ onChange }/>
    );

    const inputElement = wrapper.find('input');
    inputElement.simulate('change', { target: { value: 'value' } });
    onChange.should.be.called();
  });
});

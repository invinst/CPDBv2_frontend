import React from 'react';
import { shallow } from 'enzyme';
import { stub } from 'sinon';

import SearchBox from 'components/headers/slim-header/slim-header-content/search-box';
import * as editPath from 'utils/edit-path' ;
import MagnifyingGlass from 'components/common/icons/magnifying-glass';


describe('SearchBox component', function () {
  beforeEach(function () {
    this.stubPushPathPreserveEditMode = stub(editPath, 'pushPathPreserveEditMode');
  });

  it('should call pushPathPreserveEditMode with search path when user click on the search box', function () {
    const wrapper = shallow(
      <SearchBox />
    );
    wrapper.simulate('click', { stopPropagation: () => {} });
    this.stubPushPathPreserveEditMode.should.be.calledWith('/search/');
  });

  it('should call pushPathPreserveEditMode with search path when user click on the search term', function () {
    const wrapper = shallow(
      <SearchBox />
    );

    wrapper.simulate('click', { stopPropagation: () => {} });
    this.stubPushPathPreserveEditMode.should.be.calledWith('/search/');
  });

  it('should render MagnifyingGlass with correct color', function () {
    const wrapper = shallow(<SearchBox magnifyingGlassColor={ 'white' } />);
    const magnifyingGlass = wrapper.find(MagnifyingGlass);
    magnifyingGlass.prop('color').should.equal('#005EF4');
  });
});

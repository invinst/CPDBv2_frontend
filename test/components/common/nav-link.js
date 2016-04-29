import 'should';
import React from 'react';

import NavLink from 'components/common/nav-link';
import 'utils/test/React';


describe('NavLink component', function () {
  it('should render', function () {
    NavLink.should.be.renderable();
  });
});

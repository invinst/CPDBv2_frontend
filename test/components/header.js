import 'should';
import React from 'react';

import Header from 'components/header';
import 'utils/test/React';


describe('Header component', function () {
  it('should render', function () {
    Header.should.be.renderable();
  });
});

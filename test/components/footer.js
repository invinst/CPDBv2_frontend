import 'should';
import React from 'react';

import Footer from 'components/footer';
import 'utils/test/React';


describe('Footer component', function () {
  it('should render', function () {
    Footer.should.be.renderable();
  });
});

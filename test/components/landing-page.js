import 'should';
import React from 'react';

import LandingPage from 'components/landing-page';
import 'utils/test/React';


describe('LandingPage component', function () {
  it('should render', function () {
    LandingPage.should.be.renderable();
  });
});

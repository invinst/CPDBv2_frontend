import 'should';
import React from 'react';

import AboutSection from 'components/about-section';
import 'utils/test/React';


describe('AboutSection component', function () {
  it('should render', function () {
    AboutSection.should.be.renderable();
  });
});

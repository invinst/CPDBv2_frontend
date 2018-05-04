import React from 'react';

import Demographics from 'components/cr-page/demographics';


describe('Demographics component', function () {
  it('should renderable', function () {
    Demographics.should.be.renderable({ persons: ['Black, Male, age 41'] });
  });
});

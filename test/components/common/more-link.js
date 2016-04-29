import 'should';
import React from 'react';

import MoreLink from 'components/common/more-link';
import 'utils/test/React';


describe('MoreLink component', function () {
  it('should render', function () {
    MoreLink.should.be.renderable();
  });
});

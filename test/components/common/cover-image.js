import 'should';
import React from 'react';

import CoverImage from 'components/common/cover-image';
import 'utils/test/React';


describe('CoverImage component', function () {
  it('should render', function () {
    CoverImage.should.be.renderable();
  });
});

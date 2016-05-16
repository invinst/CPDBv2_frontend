import 'should';
import React from 'react';

import TweetContainer from 'components/tweet-container';
import 'utils/test/React';


describe('TweetContainer component', function () {
  it('should render', function () {
    TweetContainer.should.be.renderable();
  });
});

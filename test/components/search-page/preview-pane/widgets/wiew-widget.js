import React from 'react';
import {} from 'react-addons-test-utils';

import ViewWiget from 'components/search-page/preview-pane/widgets/view-widget';


describe('ViewWidget component', () => {
  it('should be renderable', () => {
    ViewWiget.should.be.renderable();
  });
});

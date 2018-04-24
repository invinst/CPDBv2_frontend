import React from 'react';
import {} from 'react-addons-test-utils';

import ViewWiget from 'components/search-page/preview-pane/widgets/call-to-action-widget';


describe('CallToActionWidget component', () => {
  it('should be renderable', () => {
    ViewWiget.should.be.renderable();
  });
});

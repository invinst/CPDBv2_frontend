import React from 'react';

import { SideBarButton } from 'components/officer-page/timeline-page/sidebar-button';


describe('SideBarButton component', function () {
  it('should renderable', function () {
    SideBarButton.should.be.renderable();
  });

  it('should trigger onClick when clicked on', function () {
    SideBarButton.should.triggerCallbackWhenClick('onClick', null);
  });
});

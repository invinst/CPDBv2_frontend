import React from 'react';

import NavigationItem from 'components/search-page/search-terms/navigation-item';


describe('NavigationItem component', function () {
  it('should renderable', function () {
    NavigationItem.should.be.renderable();
  });

  it('should trigger onClick when clicked on', function () {
    NavigationItem.should.triggerCallbackWhenClick('onClick', 'test--navigation-item');
  });
});

import React from 'react';
import configureStore from 'redux-mock-store';

import VFTGSection from 'components/landing-page/vftg-section';


describe('VFTGSection component', function () {
  const mockStore = configureStore();
  const store = mockStore({});

  it('should be renderable', function () {
    VFTGSection.should.be.renderable({
      store,
      headerText: 'CPDP Weekly', date: '2016-09-26',
      contentText: 'abc def', contentLink: 'http://example.com'
    });
  });
});

import React from 'react';
import configureStore from 'redux-mock-store';
import { renderIntoDocument, Simulate, scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils';
import { Provider } from 'react-redux';

import VFTGSection from 'components/landing-page/vftg-section';
import { withMockGA, unmountComponentSuppressError } from 'utils/test';


describe('VFTGSection component', function () {
  const mockStore = configureStore();
  const store = mockStore({});
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    VFTGSection.should.be.renderable({ store });
  });

  it('Click on link should call ga', function () {
    withMockGA((gaSpy) => {
      instance = renderIntoDocument(
        <Provider store={ store }>
          <VFTGSection/>
        </Provider>
        );
      const newsLink = scryRenderedDOMComponentsWithTag(instance, 'a')[0];
      Simulate.click(newsLink);
      gaSpy.called.should.be.true();
    });
  });
});

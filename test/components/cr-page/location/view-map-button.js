import React from 'react';
import { renderIntoDocument, scryRenderedDOMComponentsWithClass } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import ViewMapButton from 'components/cr-page/location/view-map-button';


describe('ViewMapButton component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render view map button', function () {
    instance = renderIntoDocument(<ViewMapButton lng={ 1 } lat={ 1 } />);
    scryRenderedDOMComponentsWithClass(instance, 'test--view-map-button').should.have.length(1);
  });
});

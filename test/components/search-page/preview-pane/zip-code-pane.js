import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import ZipCodePane from 'components/search-page/preview-pane/zip-code-pane';
import {
  HeaderWidget,
  AllegationCountWidget,
  ListWidget,
} from 'components/search-page/preview-pane/widgets';
import { unmountComponentSuppressError } from 'utils/test';


describe('ZipCodePane component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should contain the sub components', () => {
    instance = renderIntoDocument(<ZipCodePane/>);
    findRenderedComponentWithType(instance, HeaderWidget);
    findRenderedComponentWithType(instance, AllegationCountWidget);
    scryRenderedComponentsWithType(instance, ListWidget).should.have.length(3);
  });
});

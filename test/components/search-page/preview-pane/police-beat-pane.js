import React from 'react';
import { renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import PoliceBeatPane from 'components/search-page/preview-pane/police-beat-pane';
import {
  HeaderWidget,
  TextWidget,
  ListWidget,
  CallToActionWidget,
  SeparatorWidget,
} from 'components/search-page/preview-pane/widgets';
import { unmountComponentSuppressError } from 'utils/test';


describe('PoliceBeatPane component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should contain the sub components', () => {
    instance = renderIntoDocument(<PoliceBeatPane/>);
    findRenderedComponentWithType(instance, HeaderWidget);
    findRenderedComponentWithType(instance, SeparatorWidget);
    findRenderedComponentWithType(instance, TextWidget);
    scryRenderedComponentsWithType(instance, ListWidget).should.have.length(1);
    findRenderedComponentWithType(instance, CallToActionWidget);
  });
});

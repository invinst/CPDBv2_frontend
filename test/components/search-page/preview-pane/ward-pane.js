import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import WardPane from 'components/search-page/preview-pane/ward-pane';
import {
  HeaderWidget,
  TextWidget,
  AllegationCountWidget,
  ListWidget,
  ViewWidget,
} from 'components/search-page/preview-pane/widgets';


describe('WardPane component', () => {
  let instance;

  it('should contain the sub components', () => {
    instance = renderIntoDocument(<WardPane/>);
    findRenderedComponentWithType(instance, HeaderWidget);
    findRenderedComponentWithType(instance, TextWidget);
    findRenderedComponentWithType(instance, AllegationCountWidget);
    scryRenderedComponentsWithType(instance, ListWidget).should.have.length(2);
    findRenderedComponentWithType(instance, ViewWidget);
  });
});

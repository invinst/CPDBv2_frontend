import React from 'react';
import should from 'should';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import WardPane from 'components/search-page/search-terms/preview-pane/ward-pane';
import {
  HeaderWidget,
  TextWidget,
  AllegationCountWidget,
  ListWidget,
  ViewWidget,
} from 'components/search-page/search-terms/preview-pane/widgets';


describe('WardPane component', () => {
  let instance;

  it('should contain the sub components', () => {
    instance = renderIntoDocument(<WardPane/>);
    should(findRenderedComponentWithType(instance, HeaderWidget)).not.be.null();
    should(findRenderedComponentWithType(instance, TextWidget)).not.be.null();
    should(findRenderedComponentWithType(instance, AllegationCountWidget)).not.be.null();
    scryRenderedComponentsWithType(instance, ListWidget).should.have.length(2);
    should(findRenderedComponentWithType(instance, ViewWidget)).not.be.null();
  });
});

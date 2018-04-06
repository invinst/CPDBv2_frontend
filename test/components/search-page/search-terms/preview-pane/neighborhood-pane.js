import React from 'react';
import should from 'should';
import { renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import NeighborhoodPane from 'components/search-page/search-terms/preview-pane/neighborhood-pane';
import {
  HeaderWidget,
  ListWidget,
  ViewWidget,
  SeparatorWidget,
} from 'components/search-page/search-terms/preview-pane/widgets';


describe('NeighborhoodPane component', () => {
  let instance;

  it('should contain the sub components', () => {
    instance = renderIntoDocument(<NeighborhoodPane/>);
    should(findRenderedComponentWithType(instance, HeaderWidget)).not.be.null();
    should(findRenderedComponentWithType(instance, SeparatorWidget)).not.be.null();
    scryRenderedComponentsWithType(instance, ListWidget).should.have.length(1);
    should(findRenderedComponentWithType(instance, ViewWidget)).not.be.null();
  });
});

import React from 'react';
import should from 'should';
import { renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import PoliceBeatPane from 'components/search-page/search-terms/preview-pane/police-beat-pane';
import {
  HeaderWidget,
  TextWidget,
  ListWidget,
  ViewWidget,
  SeparatorWidget,
} from 'components/search-page/search-terms/preview-pane/widgets';


describe('PoliceBeatPane component', () => {
  let instance;

  it('should contain the sub components', () => {
    instance = renderIntoDocument(<PoliceBeatPane/>);
    should(findRenderedComponentWithType(instance, HeaderWidget)).not.be.null();
    should(findRenderedComponentWithType(instance, SeparatorWidget)).not.be.null();
    should(findRenderedComponentWithType(instance, TextWidget)).not.be.null();
    scryRenderedComponentsWithType(instance, ListWidget).should.have.length(1);
    should(findRenderedComponentWithType(instance, ViewWidget)).not.be.null();
  });
});

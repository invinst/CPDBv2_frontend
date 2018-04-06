import React from 'react';
import should from 'should';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import ZipCodePane from 'components/search-page/search-terms/preview-pane/zip-code-pane';
import {
  HeaderWidget,
  AllegationCountWidget,
  ListWidget,
  ViewWidget,
} from 'components/search-page/search-terms/preview-pane/widgets';


describe('ZipCodePane component', () => {
  let instance;

  it('should contain the sub components', () => {
    instance = renderIntoDocument(<ZipCodePane/>);
    should(findRenderedComponentWithType(instance, HeaderWidget)).not.be.null();
    should(findRenderedComponentWithType(instance, AllegationCountWidget)).not.be.null();
    scryRenderedComponentsWithType(instance, ListWidget).should.have.length(3);
    should(findRenderedComponentWithType(instance, ViewWidget)).not.be.null();
  });
});

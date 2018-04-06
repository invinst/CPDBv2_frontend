import React from 'react';
import should from 'should';
import { renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import RankPane from 'components/search-page/search-terms/preview-pane/rank-pane';
import {
  HeaderWidget,
  ListWidget,
  ViewWidget,
  SeparatorWidget,
} from 'components/search-page/search-terms/preview-pane/widgets';


describe('RankPane component', () => {
  let instance;

  it('should contain the sub components', () => {
    instance = renderIntoDocument(<RankPane/>);
    should(findRenderedComponentWithType(instance, HeaderWidget)).not.be.null();
    should(findRenderedComponentWithType(instance, SeparatorWidget)).not.be.null();
    scryRenderedComponentsWithType(instance, ListWidget).should.have.length(1);
    should(findRenderedComponentWithType(instance, ViewWidget)).not.be.null();
  });
});

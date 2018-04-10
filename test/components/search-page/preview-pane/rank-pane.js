import React from 'react';
import { renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import RankPane from 'components/search-page/preview-pane/rank-pane';
import {
  HeaderWidget,
  ListWidget,
  ViewWidget,
  SeparatorWidget,
} from 'components/search-page/preview-pane/widgets';


describe('RankPane component', () => {
  let instance;

  it('should contain the sub components', () => {
    instance = renderIntoDocument(<RankPane/>);
    findRenderedComponentWithType(instance, HeaderWidget);
    findRenderedComponentWithType(instance, SeparatorWidget);
    scryRenderedComponentsWithType(instance, ListWidget).should.have.length(1);
    findRenderedComponentWithType(instance, ViewWidget);
  });
});

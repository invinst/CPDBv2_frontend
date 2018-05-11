import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import SchoolGroundPane from 'components/search-page/preview-pane/school-ground-pane';
import {
  HeaderWidget,
  ListWidget,
  CallToActionWidget,
  SeparatorWidget,
} from 'components/search-page/preview-pane/widgets';


describe('SchoolGroundPane component', () => {
  let instance;

  it('should contain the sub components', () => {
    instance = renderIntoDocument(<SchoolGroundPane/>);
    findRenderedComponentWithType(instance, HeaderWidget);
    findRenderedComponentWithType(instance, SeparatorWidget);
    findRenderedComponentWithType(instance, ListWidget);
    findRenderedComponentWithType(instance, CallToActionWidget);
  });
});

import React from 'react';
import { findDOMNode } from 'react-dom';
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


describe('PoliceBeatPane component', () => {
  let instance;

  it('should contain the sub components', () => {
    instance = renderIntoDocument(
      <PoliceBeatPane name={ '22' }/>
    );
    const header = findRenderedComponentWithType(instance, HeaderWidget);
    findDOMNode(header).textContent.should.containEql('POLICE BEAT #22');
    findRenderedComponentWithType(instance, SeparatorWidget);
    findRenderedComponentWithType(instance, TextWidget);
    scryRenderedComponentsWithType(instance, ListWidget).should.have.length(1);
    findRenderedComponentWithType(instance, CallToActionWidget);
  });
});

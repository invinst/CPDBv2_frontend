import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import WardPane from 'components/search-page/preview-pane/ward-pane';
import {
  HeaderWidget,
  SeparatorWidget,
  TextWidget,
  AllegationCountWidget,
  ListWidget,
  CallToActionWidget,
} from 'components/search-page/preview-pane/widgets';


describe('WardPane component', () => {
  let instance;

  it('should contain the sub components', () => {
    instance = renderIntoDocument(
      <WardPane
        name={ '22' }
        allegationCount={ 123 }
        mostCommonComplaint={ [] }
        officersMostComplaint={ [] }
        to={ 'to' }
      />
    );
    const header = findRenderedComponentWithType(instance, HeaderWidget);
    findDOMNode(header).textContent.should.containEql('WARD #22');
    findRenderedComponentWithType(instance, SeparatorWidget);
    findRenderedComponentWithType(instance, TextWidget);
    findRenderedComponentWithType(instance, AllegationCountWidget);
    scryRenderedComponentsWithType(instance, ListWidget).should.have.length(2);
    findRenderedComponentWithType(instance, CallToActionWidget);
  });
});

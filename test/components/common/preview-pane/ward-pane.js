import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import WardPane from 'components/common/preview-pane/ward-pane';
import {
  HeaderWidget,
  SeparatorWidget,
  TextWidget,
  AllegationCountWidget,
  ListWidget,
  CallToActionWidget,
} from 'components/common/preview-pane/widgets';
import { unmountComponentSuppressError } from 'utils/test';


describe('WardPane component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should contain the sub components', () => {
    instance = renderIntoDocument(
      <WardPane
        url='https://staging.cpdb.co/data/L2B5ML/citizens-police-data-project'
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

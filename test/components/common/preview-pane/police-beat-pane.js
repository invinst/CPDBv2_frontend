import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import PoliceBeatPane from 'components/common/preview-pane/police-beat-pane';
import { unmountComponentSuppressError } from 'utils/test';
import {
  HeaderWidget,
  TextWidget,
  ListWidget,
  CallToActionWidget,
  SeparatorWidget,
} from 'components/common/preview-pane/widgets';


describe('PoliceBeatPane component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should contain the sub components', () => {
    instance = renderIntoDocument(
      <PoliceBeatPane
        url='https://staging.cpdb.co/data/L2B5ML/citizens-police-data-project'
        name='22'
      />
    );
    const header = findRenderedComponentWithType(instance, HeaderWidget);
    findDOMNode(header).textContent.should.containEql('POLICE BEAT #22');
    findRenderedComponentWithType(instance, SeparatorWidget);
    findRenderedComponentWithType(instance, TextWidget);
    scryRenderedComponentsWithType(instance, ListWidget).should.have.length(1);
    findRenderedComponentWithType(instance, CallToActionWidget);
  });

  it('should display Police-District HQ if available', () => {
    instance = renderIntoDocument(
      <PoliceBeatPane name='22' policeHQ='21st'/>
    );
    findDOMNode(instance).textContent.should.containEql('21st District Police Station');
  });
});

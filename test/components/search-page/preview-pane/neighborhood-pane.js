import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import NeighborhoodPane from 'components/search-page/preview-pane/neighborhood-pane';
import {
  HeaderWidget,
  ListWidget,
  CallToActionWidget,
  SeparatorWidget,
} from 'components/search-page/preview-pane/widgets';
import { unmountComponentSuppressError } from 'utils/test';


describe('NeighborhoodPane component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should contain the sub components', () => {
    instance = renderIntoDocument(
      <NeighborhoodPane
        mostCommonComplaint={ [{
          id: 1,
          name: 'name',
          count: 1,
        }] }
        officersMostComplaint={ [{
          id: 1,
          name: 'name',
          count: 1,
        }] }
        name={ 'neighborhood' }
        allegationCount={ 123 }
      />
    );
    findRenderedComponentWithType(instance, HeaderWidget);
    findRenderedComponentWithType(instance, SeparatorWidget);
    scryRenderedComponentsWithType(instance, ListWidget).should.have.length(2);
    findRenderedComponentWithType(instance, CallToActionWidget);
  });
});

import React from 'react';
import {
  renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import SchoolGroundPane from 'components/search-page/preview-pane/school-ground-pane';
import {
  HeaderWidget,
  ListWidget,
  CallToActionWidget,
  SeparatorWidget,
} from 'components/search-page/preview-pane/widgets';
import { unmountComponentSuppressError } from 'utils/test';


describe('SchoolGroundPane component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should contain the sub components', () => {
    instance = renderIntoDocument(
      <SchoolGroundPane
        officersMostComplaint={ [{
          id: 1,
          name: 'name',
          count: 1,
        }] }
        mostCommonComplaint={ [{
          id: 1,
          name: 'name',
          count: 1,
        }] }
        allegationCount={ 123 }
        name={ 'school-ground' }
      />
    );
    findRenderedComponentWithType(instance, HeaderWidget);
    findRenderedComponentWithType(instance, SeparatorWidget);
    findRenderedComponentWithType(instance, ListWidget);
    findRenderedComponentWithType(instance, CallToActionWidget);
  });
});

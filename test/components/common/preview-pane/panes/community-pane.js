import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import CommunityPane from 'components/common/preview-pane/panes/community-pane';
import {
  HeaderWidget,
  GeoInfoWidget,
  AllegationCountWidget,
  ListWidget,
  CallToActionWidget,
} from 'components/common/preview-pane/widgets';
import { unmountComponentSuppressError } from 'utils/test';


describe('CommunityPane component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should contain the sub components', () => {
    instance = renderIntoDocument(
      <CommunityPane
        officersMostComplaint={ [{
          id: 1,
          name: 'name',
          count: 1,
        }] }
        medianIncome={ '1000' }
        population={ '100' }
        raceCount={ [] }
        allegationCount={ 100 }
        mostCommonComplaint={ [{
          id: 1,
          name: 'name',
          count: 1,
        }] }
        name={ 'community' }
        url={ 'url' }
      />
    );
    findRenderedComponentWithType(instance, HeaderWidget);
    findRenderedComponentWithType(instance, GeoInfoWidget);
    findRenderedComponentWithType(instance, AllegationCountWidget);
    scryRenderedComponentsWithType(instance, ListWidget).should.have.length(2);
    findRenderedComponentWithType(instance, CallToActionWidget);
  });
});

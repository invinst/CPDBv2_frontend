import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import ActivityGrid from 'components/landing-page/activity-grid';
import OfficerCard from 'components/landing-page/activity-grid/officer-card';
import { OfficerCardFactory } from 'utils/test/factories/activity-grid';


describe('ActivityGrid component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    instance = renderIntoDocument(
      <ActivityGrid
        cards={ OfficerCardFactory.buildList(3) }
      />
    );
    scryRenderedComponentsWithType(instance, OfficerCard).length.should.eql(3);
  });
});




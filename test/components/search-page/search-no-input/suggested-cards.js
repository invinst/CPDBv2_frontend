import React from 'react';
import { spy } from 'sinon';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test/index';
import SuggestedCards from 'components/search-page/search-no-input/suggested-cards';
import OfficerCard from 'components/landing-page/activity-grid/officer-card';


describe('SuggestedCards component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should request activity grid when there is no cards', function () {
    let spyRequestActivityGrid = spy();
    renderIntoDocument(
      <SuggestedCards cards={ [] } requestActivityGrid={ spyRequestActivityGrid }/>
    );

    spyRequestActivityGrid.calledOnce.should.be.true();
  });

  it('should render OfficerCards when there are cards', function () {
    instance = renderIntoDocument(
      <SuggestedCards cards={ ['one', 'two', 'three', 'four'] }/>
    );

    let cards = scryRenderedComponentsWithType(instance, OfficerCard);
    cards.should.have.length(4);
  });
});

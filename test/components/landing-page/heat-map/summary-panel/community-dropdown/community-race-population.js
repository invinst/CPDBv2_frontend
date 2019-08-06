import React from 'react';

import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import { communityFactory } from 'utils/test/factories/heat-map';
import CommunityRacePopulation from
  'components/landing-page/heat-map/summary-panel/community-dropdown/community-race-population';
import { unmountComponentSuppressError } from 'utils/test';


describe('CommunityRacePopulation component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    CommunityRacePopulation.should.be.renderable(communityFactory.build());
  });

  it('should display Population and Median income', function () {
    instance = renderIntoDocument(
      <CommunityRacePopulation { ...communityFactory.build() }/>
    );

    const elm = findRenderedDOMComponentWithClass(instance, 'test--community-race-population');
    elm.textContent.should.containEql('Population');
    elm.textContent.should.containEql('Median Household Income');
    elm.textContent.should.containEql('Race');
  });

  it('should hide median income when this info is unavailable', function () {
    instance = renderIntoDocument(
      <CommunityRacePopulation/>
    );
    const elm = findRenderedDOMComponentWithClass(instance, 'test--community-race-population');
    elm.textContent.should.not.containEql('Median Household Income');
  });
});

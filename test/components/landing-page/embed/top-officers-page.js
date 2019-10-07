import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';
import { stub } from 'sinon';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import EmbedTopOfficersPage from 'components/landing-page/embed/top-officers-page';
import OfficersByAllegationContainer from 'containers/landing-page/officers-by-allegation';
import * as intercomUtils from 'utils/intercom';


describe('Embed top officers page', function () {
  const mockStore = MockStore();
  const store = mockStore({
    landingPage: {
      officersByAllegation: { cards: [] },
    },
    cms: {
      pages: {},
    },
    pinboardPage: { pinboard: {} },
  });
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render OfficersByAllegationContainer', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <EmbedTopOfficersPage />
      </Provider>
    );

    const officersByAllegationContainer = findRenderedComponentWithType(instance, OfficersByAllegationContainer);
    officersByAllegationContainer.props.openCardInNewPage.should.be.true();
    officersByAllegationContainer.props.pinnable.should.be.false();
  });

  describe('Intercom', function () {
    beforeEach(function () {
      stub(intercomUtils, 'showIntercomLauncher');
    });

    afterEach(function () {
      intercomUtils.showIntercomLauncher.restore();
    });

    it('should hide intercom launcher when mounted', function () {
      instance = renderIntoDocument(
        <Provider store={ store }>
          <EmbedTopOfficersPage />
        </Provider>
      );

      intercomUtils.showIntercomLauncher.calledWith(false).should.be.true();
    });

    it('should show intercom launcher again when unmounted', function () {
      instance = renderIntoDocument(
        <Provider store={ store }>
          <EmbedTopOfficersPage />
        </Provider>
      );

      intercomUtils.showIntercomLauncher.resetHistory();
      unmountComponentSuppressError(instance);
      intercomUtils.showIntercomLauncher.calledWith(true).should.be.true();
    });
  });
});

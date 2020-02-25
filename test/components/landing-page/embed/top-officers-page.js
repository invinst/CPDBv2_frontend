import React from 'react';
import { shallow, mount } from 'enzyme';
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

  it('should render OfficersByAllegationContainer', function () {
    const wrapper = shallow(
      <EmbedTopOfficersPage />
    );

    const officersByAllegationContainer = wrapper.find(OfficersByAllegationContainer);
    officersByAllegationContainer.prop('openCardInNewPage').should.be.true();
    officersByAllegationContainer.prop('pinnable').should.be.false();
  });

  describe('Intercom', function () {
    beforeEach(function () {
      stub(intercomUtils, 'showIntercomLauncher');
    });

    it('should hide intercom launcher when mounted', function () {
      mount(
        <Provider store={ store }>
          <EmbedTopOfficersPage />
        </Provider>
      );

      intercomUtils.showIntercomLauncher.calledWith(false).should.be.true();
    });

    it('should show intercom launcher again when unmounted', function () {
      const wrapper = mount(
        <Provider store={ store }>
          <EmbedTopOfficersPage />
        </Provider>
      );

      intercomUtils.showIntercomLauncher.resetHistory();
      wrapper.unmount();
      intercomUtils.showIntercomLauncher.calledWith(true).should.be.true();
    });
  });
});

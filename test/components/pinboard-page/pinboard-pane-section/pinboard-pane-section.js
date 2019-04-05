import React from 'react';
import {
  findRenderedComponentWithType,
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate,
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { stub } from 'sinon';

import { PINBOARD_PAGE_TAB_NAMES } from 'utils/constants';
import { unmountComponentSuppressError } from 'utils/test';
import PinboardPaneSection from 'components/pinboard-page/pinboard-pane-section';
import AnimatedSocialGraph from 'components/common/animated-social-graph';
import AllegationsMap from 'components/common/allegations-map';


describe('PinboardPaneSection component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    pinboardPage: {
      graphData: [],
      geographicData: [],
    },
  });
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render Header with correct tab names with correct order', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <PinboardPaneSection
          currentTab='NETWORK'
          hasMapMarker={ true }
        />
      </Provider>
    );

    const tabNames = scryRenderedDOMComponentsWithClass(instance, 'pinboard-pane-tab-name');

    tabNames.should.have.length(2);
    tabNames[0].textContent.should.be.eql('NETWORK');
    tabNames[1].textContent.should.be.eql('GEOGRAPHIC');
  });

  it('should hide the tabs with no data', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <PinboardPaneSection
          currentTab='NETWORK'
          hasMapMarker={ false }
        />
      </Provider>
    );

    const tabNames = scryRenderedDOMComponentsWithClass(instance, 'pinboard-pane-tab-name');

    tabNames.should.have.length(1);
    tabNames[0].textContent.should.be.eql('NETWORK');
  });

  it('should render network tab', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <PinboardPaneSection currentTab={ PINBOARD_PAGE_TAB_NAMES.NETWORK }/>
      </Provider>
    );

    findRenderedComponentWithType(instance, AnimatedSocialGraph).should.be.ok();
  });

  it('should render geographic tab', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <PinboardPaneSection currentTab={ PINBOARD_PAGE_TAB_NAMES.GEOGRAPHIC }/>
      </Provider>
    );

    findRenderedComponentWithType(instance, AllegationsMap).should.be.ok();
  });

  it('should call changePinboardTab when clicking tab name', function () {
    const stubChangePinboardTab = stub();
    instance = renderIntoDocument(
      <Provider store={ store }>
        <PinboardPaneSection
          changePinboardTab={ stubChangePinboardTab }
          hasMapMarker={ true }
        />
      </Provider>
    );

    const geographicTab = scryRenderedDOMComponentsWithClass(instance, 'pinboard-pane-tab-name')[1];
    Simulate.click(geographicTab);

    stubChangePinboardTab.should.be.calledWith('GEOGRAPHIC');
  });
});

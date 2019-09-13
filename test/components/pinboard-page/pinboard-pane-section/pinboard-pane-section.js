import React from 'react';
import {
  findRenderedComponentWithType,
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType,
  Simulate,
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { stub } from 'sinon';

import { PINBOARD_PAGE_TAB_NAMES } from 'utils/constants';
import { unmountComponentSuppressError } from 'utils/test';
import PinboardPaneSection, { PinboardPaneSectionWithSpinner } from 'components/pinboard-page/pinboard-pane-section';
import AnimatedSocialGraph from 'components/common/animated-social-graph';
import AllegationsMap from 'components/common/allegations-map';
import LoadingSpinner from 'components/common/loading-spinner';
import styles from 'components/pinboard-page/pinboard-pane-section/pinboard-pane-section.sass';


describe('PinboardPaneSection component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    pinboardPage: {
      graphData: { requesting: false, data: {} },
      geographicData: {
        crsRequesting: false,
        trrsRequesting: false,
        mapCrsData: [
          {
            'date': '2006-09-26',
            'crid': '1000018',
            'category': 'Operation/Personnel Violations',
            'coaccused_count': 1,
            'kind': 'CR',
          },
        ],
        mapTrrsData: [
          {
            'trr_id': '123456',
            kind: 'FORCE',
            taser: false,
            'firearm_used': true,
            point: {
              lat: 35.3,
              lon: 50.5,
            },
            date: 'MAY 12, 2015',
          },
        ],
      },
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

    const activeTab = findRenderedDOMComponentWithClass(instance, 'active');
    activeTab.textContent.should.be.eql('NETWORK');
  });

  it('should render correct active tab', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <PinboardPaneSection
          currentTab='GEOGRAPHIC'
          hasMapMarker={ true }
        />
      </Provider>
    );

    const tabNames = scryRenderedDOMComponentsWithClass(instance, 'pinboard-pane-tab-name');
    tabNames.should.have.length(2);
    tabNames[0].textContent.should.be.eql('NETWORK');
    tabNames[1].textContent.should.be.eql('GEOGRAPHIC');

    const activeTab = findRenderedDOMComponentWithClass(instance, 'active');
    activeTab.textContent.should.be.eql('GEOGRAPHIC');
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

  context('withLoadingSpinner', function () {
    it('should render LoadingSpinner only if requesting is true', function () {
      instance = renderIntoDocument(
        <PinboardPaneSectionWithSpinner requesting={ true } />
      );

      scryRenderedComponentsWithType(instance, PinboardPaneSection).should.have.length(0);

      const loadingSpinner = findRenderedComponentWithType(instance, LoadingSpinner);
      loadingSpinner.props.className.should.equal(styles.pinboardPaneSectionLoading);
    });

    it('should not render LoadingSpinner if requesting is false', function () {
      instance = renderIntoDocument(
        <PinboardPaneSectionWithSpinner requesting={ false }/>
      );

      scryRenderedComponentsWithType(instance, PinboardPaneSection).should.have.length(1);
      scryRenderedComponentsWithType(instance, LoadingSpinner).should.have.length(0);
    });
  });
});

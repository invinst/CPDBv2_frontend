import React from 'react';
import { mount } from 'enzyme';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { stub } from 'sinon';

import { PINBOARD_PAGE_TAB_NAMES } from 'utils/constants';
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

  it('should render Header with correct tab names with correct order', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <PinboardPaneSection
          currentTab='NETWORK'
          hasMapMarker={ true }
        />
      </Provider>
    );

    const tabNames = wrapper.find('.pinboard-pane-tab-name');
    tabNames.should.have.length(2);
    tabNames.at(0).text().should.equal('NETWORK');
    tabNames.at(1).text().should.equal('GEOGRAPHIC');

    const activeTab = wrapper.find('.active');
    activeTab.text().should.equal('NETWORK');
  });

  it('should render correct active tab', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <PinboardPaneSection
          currentTab='GEOGRAPHIC'
          hasMapMarker={ true }
        />
      </Provider>
    );

    const tabNames = wrapper.find('.pinboard-pane-tab-name');
    tabNames.should.have.length(2);
    tabNames.at(0).text().should.equal('NETWORK');
    tabNames.at(1).text().should.equal('GEOGRAPHIC');

    const activeTab = wrapper.find('.active');
    activeTab.text().should.equal('GEOGRAPHIC');
  });

  it('should hide the tabs with no data', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <PinboardPaneSection
          currentTab='NETWORK'
          hasMapMarker={ false }
        />
      </Provider>
    );

    const tabNames = wrapper.find('.pinboard-pane-tab-name');

    tabNames.should.have.length(1);
    tabNames.at(0).text().should.equal('NETWORK');
  });

  it('should render network tab', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <PinboardPaneSection currentTab={ PINBOARD_PAGE_TAB_NAMES.NETWORK }/>
      </Provider>
    );

    wrapper.find(AnimatedSocialGraph).exists().should.be.true();
  });

  it('should render geographic tab', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <PinboardPaneSection currentTab={ PINBOARD_PAGE_TAB_NAMES.GEOGRAPHIC }/>
      </Provider>
    );

    wrapper.find(AllegationsMap).exists().should.be.true();
  });

  it('should call changePinboardTab when clicking tab name', function () {
    const stubChangePinboardTab = stub();
    const wrapper = mount(
      <Provider store={ store }>
        <PinboardPaneSection
          changePinboardTab={ stubChangePinboardTab }
          hasMapMarker={ true }
        />
      </Provider>
    );

    const geographicTab = wrapper.find('.pinboard-pane-tab-name').at(1);
    geographicTab.simulate('click');

    stubChangePinboardTab.should.be.calledWith('GEOGRAPHIC');
  });

  context('withLoadingSpinner', function () {
    it('should render LoadingSpinner only if requesting is true', function () {
      const wrapper = mount(
        <PinboardPaneSectionWithSpinner requesting={ true } />
      );

      wrapper.find(PinboardPaneSection).exists().should.be.false();

      const loadingSpinner = wrapper.find(LoadingSpinner);
      loadingSpinner.prop('className').should.equal(styles.pinboardPaneSectionLoading);
    });

    it('should not render LoadingSpinner if requesting is false', function () {
      const wrapper = mount(
        <PinboardPaneSectionWithSpinner requesting={ false }/>
      );

      wrapper.find(PinboardPaneSection).should.have.length(1);
      wrapper.find(LoadingSpinner).exists().should.be.false();
    });
  });
});

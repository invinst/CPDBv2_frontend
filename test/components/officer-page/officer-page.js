import React from 'react';
import { shallow, mount } from 'enzyme';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { stub, spy } from 'sinon';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

import OfficerPage from 'components/officer-page';
import SummarySection from 'components/officer-page/summary-section';
import MetricsSection from 'components/officer-page/metrics-section';
import TabbedPaneSection from 'components/officer-page/tabbed-pane-section';
import OfficerRadarChart from 'components/officer-page/radar-chart';
import { OFFICER_EDIT_TYPES } from 'utils/constants';
import PrintNotes from 'components/common/print-notes';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import DownloadMenuContainer from 'containers/headers/shareable-header/download-menu-container';
import * as tracking from 'utils/tracking';
import styles from 'components/officer-page/officer-page.sass';


describe('OfficerPage component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    officerPage: {
      summary: {},
      metrics: {},
      newTimeline: {},
      editModeOn: {
        [OFFICER_EDIT_TYPES.TRIANGLE]: false,
        [OFFICER_EDIT_TYPES.SCALE]: false,
        [OFFICER_EDIT_TYPES.NO_DATA_RADAR_CHART]: false,
      },
    },
    breadcrumb: {
      breadcrumbItems: [],
    },
    headers: {
      pinboards: [],
    },
    pinboardPage: {},
    popups: [],
  });

  beforeEach(function () {
    this.stubTrackOfficerDownloadMenu = stub(tracking, 'trackOfficerDownloadMenu');
  });

  it('should render enough sections', function () {
    const triangleEditWrapperStateProps = { a: 1 };
    const scaleEditWrapperStateProps = { b: 2 };
    const noDataRadarChartEditWrapperStateProps = { c: 3 };
    const addOrRemoveItemInPinboardSpy = spy();

    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <HelmetProvider>
            <OfficerPage
              officerId={ 1 }
              officerName={ 'Corey Flagg' }
              officerSummary={ { race: 'Asian', gender: 'Male', rank: 'Police Officer', age: '39-year-old' } }
              officerMetrics={ { sustainedCount: 8, allegationCount: 13 } }
              triangleEditWrapperStateProps={ triangleEditWrapperStateProps }
              scaleEditWrapperStateProps={ scaleEditWrapperStateProps }
              noDataRadarChartEditWrapperStateProps={ noDataRadarChartEditWrapperStateProps }
              addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardSpy }
              isPinned={ true }
            />
          </HelmetProvider>
        </MemoryRouter>
      </Provider>
    );

    const officerPage = wrapper.find(OfficerPage);
    officerPage.find(SummarySection).exists().should.be.true();
    officerPage.find(MetricsSection).exists().should.be.true();
    officerPage.find(TabbedPaneSection).exists().should.be.true();
    const officerRadarChart = officerPage.find(OfficerRadarChart);
    officerRadarChart.prop('triangleEditWrapperStateProps').should.eql(triangleEditWrapperStateProps);
    officerRadarChart.prop('scaleEditWrapperStateProps').should.eql(scaleEditWrapperStateProps);
    officerRadarChart.prop('noDataRadarChartEditWrapperStateProps').should.eql(noDataRadarChartEditWrapperStateProps);

    const shareableHeader = officerPage.find(ShareableHeaderContainer);
    shareableHeader.exists().should.be.true();
    const headerButtons = shareableHeader.prop('headerButtons');
    headerButtons.props.children[0].type.WrappedComponent.name.should.equal('HeaderPinButton');
    const downloadButton = headerButtons.props.children[1];
    downloadButton.type.name.should.equal('HeaderButton');
    downloadButton.props.Menu.should.equal(DownloadMenuContainer);
  });

  it('should render correct document title and description', function () {
    const wrapper = shallow(
      <OfficerPage
        officerName='Shaun Frank'
        officerSummary={ { rank: 'Officer' } }
        officerMetrics={ {
          allegationCount: 5,
          useOfForceCount: 10,
        } }
        numAttachments={ 3 }
      />,
      { disableLifecycleMethods: true },
    ).dive().dive();

    wrapper.find('title').text().should.equal('Officer Shaun Frank');
    wrapper.find('meta[name="description"]').prop('content').should.equal(
      'Officer Shaun Frank of the Chicago Police Department has ' +
      '5 complaints, 10 use of force reports, and 3 original documents available.'
    );
  });

  it('should add badge number into document description if officer name is not unique and badge is not Unknown',
    function () {
      const wrapper = shallow(
        <OfficerPage
          officerName='Shaun Frank'
          officerSummary={ { rank: 'Officer', badge: '1424', hasUniqueName: false } }
          officerMetrics={ {
            allegationCount: 1,
            useOfForceCount: 0,
          } }
          numAttachments={ 3 }
        />,
        { disableLifecycleMethods: true },
      ).dive().dive();

      wrapper.find('title').text().should.equal('Officer Shaun Frank');
      wrapper.find('meta[name="description"]').prop('content').should.equal(
        'Officer Shaun Frank of the Chicago Police Department with Badge Number 1424 has ' +
        '1 complaint, 0 use of force reports, and 3 original documents available.'
      );
    }
  );

  it('should not add badge number into document description if badge is Unknown',
    function () {
      const wrapper = shallow(
        <OfficerPage
          officerName='Shaun Frank'
          officerSummary={ { rank: 'Officer', badge: 'Unknown', hasUniqueName: false } }
          officerMetrics={ {
            allegationCount: 1,
            useOfForceCount: 0,
          } }
          numAttachments={ 3 }
        />,
        { disableLifecycleMethods: true },
      ).dive().dive();

      wrapper.find('title').text().should.equal('Officer Shaun Frank');
      wrapper.find('meta[name="description"]').prop('content').should.equal(
        'Officer Shaun Frank of the Chicago Police Department has ' +
        '1 complaint, 0 use of force reports, and 3 original documents available.'
      );
    }
  );

  it('should handle N/A rank', function () {
    const wrapper = shallow(
      <OfficerPage officerName='Jerome Finigan' officerSummary={ { rank: 'N/A' } }/>,
      { disableLifecycleMethods: true },
    ).dive().dive();

    wrapper.find('title').text().should.equal('Jerome Finigan');
  });

  it('should render correct officer page in redirecting case', function () {
    const wrapper = shallow(
      <OfficerPage
        officerName='Shaun Frank'
        officerSummary={ { rank: 'Officer' } }
      />,
      { disableLifecycleMethods: true },
    ).dive().dive();

    wrapper.setProps({
      officerName: 'Shaun Frank',
      officerSummary: { rank: 'Officer' },
      officerSlug: 'shaun-frank',
      pathName: '/officer/123456/',
    });

    wrapper.find('title').text().should.equal('Officer Shaun Frank');
  });

  it('should render PrintNotes component when printMode is true', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <HelmetProvider>
            <OfficerPage
              officerId={ 1234 }
              officerName='Shaun Frank'
              officerSummary={ { rank: 'Officer' } }
            />
          </HelmetProvider>
        </MemoryRouter>
      </Provider>
    );
    wrapper.find(OfficerPage).setState({ printMode: true });
    wrapper.find(PrintNotes).should.have.length(2);
  });

  it('should call trackOfficerDownloadMenu when clicking on HeaderButton', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <HelmetProvider>
            <OfficerPage
              officerId={ 1234 }
              officerName='Shaun Frank'
              officerSummary={ { rank: 'Officer' } }
            />
          </HelmetProvider>
        </MemoryRouter>
      </Provider>
    );
    const headerButton = wrapper.find(`.${styles.downloadBtn}`);
    headerButton.simulate('click');
    this.stubTrackOfficerDownloadMenu.should.be.calledWith(1234, 'open');
  });
});

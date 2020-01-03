import React from 'react';
import { shallow, mount } from 'enzyme';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { stub } from 'sinon';

import OfficerPage from 'components/officer-page';
import SummarySection from 'components/officer-page/summary-section';
import MetricsSection from 'components/officer-page/metrics-section';
import TabbedPaneSection from 'components/officer-page/tabbed-pane-section';
import OfficerRadarChart from 'components/officer-page/radar-chart';
import { OFFICER_EDIT_TYPES } from 'utils/constants';
import PrintNotes from 'components/common/print-notes';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import DownloadMenuContainer from 'containers/headers/shareable-header/download-menu-container';
import * as GATracking from 'utils/google_analytics_tracking';


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
      breadcrumbs: [],
    },
    popups: [],
  });

  beforeEach(function () {
    this.stubTrackOfficerDownloadMenu = stub(GATracking, 'trackOfficerDownloadMenu');
  });

  afterEach(function () {
    this.stubTrackOfficerDownloadMenu.restore();
  });

  it('should render enough sections', function () {
    const triangleEditWrapperStateProps = { a: 1 };
    const scaleEditWrapperStateProps = { b: 2 };
    const noDataRadarChartEditWrapperStateProps = { c: 3 };

    const wrapper = shallow(
      <Provider store={ store }>
        <OfficerPage
          officerId={ 1 }
          triangleEditWrapperStateProps={ triangleEditWrapperStateProps }
          scaleEditWrapperStateProps={ scaleEditWrapperStateProps }
          noDataRadarChartEditWrapperStateProps={ noDataRadarChartEditWrapperStateProps }
        />
      </Provider>
    ).dive().find('OfficerPage').dive();

    wrapper.find(SummarySection).exists().should.be.true();
    wrapper.find(MetricsSection).exists().should.be.true();
    wrapper.find(TabbedPaneSection).exists().should.be.true();
    const officerRadarChart = wrapper.find(OfficerRadarChart);
    officerRadarChart.prop('triangleEditWrapperStateProps').should.eql(triangleEditWrapperStateProps);
    officerRadarChart.prop('scaleEditWrapperStateProps').should.eql(scaleEditWrapperStateProps);
    officerRadarChart.prop('noDataRadarChartEditWrapperStateProps').should.eql(noDataRadarChartEditWrapperStateProps);
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
    ).dive();

    const documentMeta = wrapper.find(DocumentMeta);
    documentMeta.prop('title').should.equal('Officer Shaun Frank');
    documentMeta.prop('description').should.equal(
      'Officer Shaun Frank of the Chicago Police Department has ' +
      '5 complaints, 10 use of force reports, and 3 original documents available.'
    );
  });

  it('should render ShareableHeader with custom props', function () {
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
    ).dive();

    const shareableHeader = wrapper.find(ShareableHeaderContainer);
    shareableHeader.prop('buttonType').should.equal('menu');
    shareableHeader.prop('Menu').should.eql(DownloadMenuContainer);
    shareableHeader.prop('buttonText').should.equal('Download');
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
      ).dive();

      const documentMeta = wrapper.find(DocumentMeta);
      documentMeta.prop('title').should.equal('Officer Shaun Frank');
      documentMeta.prop('description').should.equal(
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
      ).dive();

      const documentMeta = wrapper.find(DocumentMeta);
      documentMeta.prop('title').should.equal('Officer Shaun Frank');
      documentMeta.prop('description').should.equal(
        'Officer Shaun Frank of the Chicago Police Department has ' +
        '1 complaint, 0 use of force reports, and 3 original documents available.'
      );
    }
  );

  it('should handle N/A rank', function () {
    const wrapper = shallow(
      <OfficerPage officerName='Jerome Finigan' officerSummary={ { rank: 'N/A' } }/>,
      { disableLifecycleMethods: true },
    ).dive();

    const documentMeta = wrapper.find(DocumentMeta);
    documentMeta.prop('title').should.equal('Jerome Finigan');
  });

  it('should render correct officer page in redirecting case', function () {
    const wrapper = shallow(
      <OfficerPage
        officerName='Shaun Frank'
        officerSummary={ { rank: 'Officer' } }
      />,
      { disableLifecycleMethods: true },
    ).dive();

    wrapper.setProps({
      officerName: 'Shaun Frank',
      officerSummary: { rank: 'Officer' },
      officerSlug: 'shaun-frank',
      pathName: '/officer/123456/',
    });

    let documentMeta = wrapper.find(DocumentMeta);
    documentMeta.prop('title').should.equal('Officer Shaun Frank');
  });

  it('should render PrintNotes component when printMode is true', function () {
    const wrapper = shallow(
      <OfficerPage
        officerName='Shaun Frank'
        officerSummary={ { rank: 'Officer' } }
      />
    );
    wrapper.setState({ printMode: true });
    wrapper.instance().getChildContext().should.eql({ printMode: true });
    wrapper.find('OfficerPage').dive({ context: { printMode: true } }).find(PrintNotes).should.have.length(2);
  });

  it('should call trackOfficerDownloadMenu when clicking on HeaderButton', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <OfficerPage
          officerId={ 1234 }
          officerName='Shaun Frank'
          officerSummary={ { rank: 'Officer' } }
        />
      </Provider>
    );
    const headerButton = wrapper.find('.button');
    headerButton.simulate('click');
    this.stubTrackOfficerDownloadMenu.should.be.calledWith(1234, 'open');
  });
});

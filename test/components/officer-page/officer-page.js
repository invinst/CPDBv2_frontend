import React from 'react';
import {
  findRenderedComponentWithType, renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import DocumentMeta from 'react-document-meta';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import OfficerPage from 'components/officer-page';
import SummarySection from 'components/officer-page/summary-section';
import MetricsSection from 'components/officer-page/metrics-section';
import TabbedPaneSection from 'components/officer-page/tabbed-pane-section';
import OfficerRadarChart from 'components/officer-page/radar-chart';
import { OFFICER_EDIT_TYPES } from 'utils/constants';
import PrintNotes from 'components/common/print-notes';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import DownloadMenuContainer from 'containers/headers/shareable-header/download-menu-container';


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
      }
    },
    breadcrumb: {
      breadcrumbs: []
    },
    popups: [],
  });
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render enough sections', function () {
    const triangleEditWrapperStateProps = { a: 1 };
    const scaleEditWrapperStateProps = { b: 2 };
    const noDataRadarChartEditWrapperStateProps = { c: 3 };

    instance = renderIntoDocument(
      <Provider store={ store }>
        <OfficerPage
          officerId={ 1 }
          triangleEditWrapperStateProps={ triangleEditWrapperStateProps }
          scaleEditWrapperStateProps={ scaleEditWrapperStateProps }
          noDataRadarChartEditWrapperStateProps={ noDataRadarChartEditWrapperStateProps }
        />
      </Provider>
    );

    findRenderedComponentWithType(instance, SummarySection);
    findRenderedComponentWithType(instance, MetricsSection);
    findRenderedComponentWithType(instance, TabbedPaneSection);
    const officerRadarChart = findRenderedComponentWithType(instance, OfficerRadarChart);
    officerRadarChart.props.triangleEditWrapperStateProps.should.eql(triangleEditWrapperStateProps);
    officerRadarChart.props.scaleEditWrapperStateProps.should.eql(scaleEditWrapperStateProps);
    officerRadarChart.props.noDataRadarChartEditWrapperStateProps.should.eql(noDataRadarChartEditWrapperStateProps);
  });

  it('should render correct document title and description', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <OfficerPage
          officerName='Shaun Frank'
          officerSummary={ { rank: 'Officer' } }
          officerMetrics={ {
            allegationCount: 5,
            useOfForceCount: 10,
          } }
          numAttachments={ 3 }
        />
      </Provider>
    );

    const documentMeta = findRenderedComponentWithType(instance, DocumentMeta);
    documentMeta.props.title.should.eql('Officer Shaun Frank');
    documentMeta.props.description.should.eql(
      'Officer Shaun Frank of the Chicago Police Department has ' +
      '5 complaints, 10 use of force reports, and 3 original documents available.'
    );
  });

  it('should render ShareableHeader with custom props', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <OfficerPage
          officerName='Shaun Frank'
          officerSummary={ { rank: 'Officer' } }
          officerMetrics={ {
            allegationCount: 5,
            useOfForceCount: 10,
          } }
          numAttachments={ 3 }
        />
      </Provider>
    );

    const shareableHeader = findRenderedComponentWithType(instance, ShareableHeaderContainer);
    shareableHeader.props.Menu.should.eql(DownloadMenuContainer);
    shareableHeader.props.buttonText.should.eql('Download');
  });

  it('should add badge number into document description if officer name is not unique and badge is not Unknown',
    function () {
      instance = renderIntoDocument(
        <Provider store={ store }>
          <OfficerPage
            officerName='Shaun Frank'
            officerSummary={ { rank: 'Officer', badge: '1424', hasUniqueName: false } }
            officerMetrics={ {
              allegationCount: 1,
              useOfForceCount: 0,
            } }
            numAttachments={ 3 }
          />
        </Provider>
      );

      const documentMeta = findRenderedComponentWithType(instance, DocumentMeta);
      documentMeta.props.title.should.eql('Officer Shaun Frank');
      documentMeta.props.description.should.eql(
        'Officer Shaun Frank of the Chicago Police Department with Badge Number 1424 has ' +
        '1 complaint, 0 use of force reports, and 3 original documents available.'
      );
    }
  );

  it('should not add badge number into document description if badge is Unknown',
    function () {
      instance = renderIntoDocument(
        <Provider store={ store }>
          <OfficerPage
            officerName='Shaun Frank'
            officerSummary={ { rank: 'Officer', badge: 'Unknown', hasUniqueName: false } }
            officerMetrics={ {
              allegationCount: 1,
              useOfForceCount: 0,
            } }
            numAttachments={ 3 }
          />
        </Provider>
      );

      const documentMeta = findRenderedComponentWithType(instance, DocumentMeta);
      documentMeta.props.title.should.eql('Officer Shaun Frank');
      documentMeta.props.description.should.eql(
        'Officer Shaun Frank of the Chicago Police Department has ' +
        '1 complaint, 0 use of force reports, and 3 original documents available.'
      );
    }
  );

  it('should handle N/A rank', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <OfficerPage officerName='Jerome Finigan' officerSummary={ { rank: 'N/A' } }/>
      </Provider>
    );

    const documentMeta = findRenderedComponentWithType(instance, DocumentMeta);
    documentMeta.props.title.should.eql('Jerome Finigan');
  });

  it('should render correct officer page in redirecting case', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <OfficerPage
          officerName='Shaun Frank'
          officerSummary={ { rank: 'Officer' } }
        />
      </Provider>
    );

    instance = reRender(
      <Provider store={ store }>
        <OfficerPage
          officerName='Shaun Frank'
          officerSummary={ { rank: 'Officer' } }
          officerSlug='shaun-frank'
          pathName='/officer/123456/'
        />
      </Provider>,
      instance
    );

    let documentMeta = findRenderedComponentWithType(instance, DocumentMeta);
    documentMeta.props.title.should.eql('Officer Shaun Frank');
  });

  it('should render PrintNotes component when printMode is true', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <OfficerPage
          officerName='Shaun Frank'
          officerSummary={ { rank: 'Officer' } }
        />
      </Provider>
    );
    findRenderedComponentWithType(instance, OfficerPage).setState({ printMode: true });
    scryRenderedComponentsWithType(instance, PrintNotes).should.have.length(2);
  });
});

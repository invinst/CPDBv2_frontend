import React from 'react';
import { findRenderedComponentWithType, renderIntoDocument, } from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { spy } from 'sinon';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import OfficerPage from 'components/officer-page';
import SummarySection from 'components/officer-page/summary-section';
import MetricsSection from 'components/officer-page/metrics-section';
import TabbedPaneSection from 'components/officer-page/tabbed-pane-section';
import OfficerRadarChart from 'components/officer-page/radar-chart';
import { OFFICER_EDIT_TYPES } from 'utils/constants';


describe.only('OfficerPage component', function () {
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
    const triangleEditWrapperStateProps = spy();
    const scaleEditWrapperStateProps = spy();
    const noDataRadarChartEditWrapperStateProps = spy();

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

    let documentTitle = findRenderedComponentWithType(instance, DocumentMeta);
    documentTitle.props.title.should.eql('Officer Shaun Frank');
  });
});

import React from 'react';
import { spy, stub } from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';
import DocumentMeta from 'react-document-meta';

import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';
import LandingPage from 'components/landing-page';
import SlimHeader from 'components/headers/slim-header';
import HeatMap from 'components/landing-page/heat-map';
import OfficersByAllegation from 'components/landing-page/officers-by-allegation';
import RecentActivity from 'components/landing-page/recent-activity';
import RecentDocument from 'components/landing-page/recent-document';
import ComplaintSummaries from 'components/landing-page/complaint-summaries';
import Footer from 'components/footer';
import styles from 'components/landing-page/landing-page.sass';
import { RawOfficerCardFactory } from 'utils/test/factories/activity-grid';
import { RawDocumentCardFactory } from 'utils/test/factories/attachment';
import { ComplaintSummaryFactory } from 'utils/test/factories/complaint';
import { unmountComponentSuppressError } from 'utils/test';

const mockStore = configureStore();
const store = mockStore({
  authentication: {},
  cms: {
    pages: {
    }
  },
  landingPage: {
    heatMap: {
      citySummary: {},
      communities: null
    },
    activityGrid: {
      cards: [
        RawOfficerCardFactory.build(),
        RawOfficerCardFactory.build(),
        RawOfficerCardFactory.build(),
      ],
      headerEditModeOn: false
    },
    officersByAllegation: {
      cards: [
        RawOfficerCardFactory.build({ kind: '' }),
        RawOfficerCardFactory.build({ kind: '' }),
        RawOfficerCardFactory.build({ kind: '' }),
      ],
      headerEditModeOn: false
    },
    recentDocument: {
      cards: [
        RawDocumentCardFactory.build(),
        RawDocumentCardFactory.build()
      ],
      headerEditModeOn: false
    },
    complaintSummaries: {
      cards: [
        ComplaintSummaryFactory.build(),
        ComplaintSummaryFactory.build()
      ],
      headerEditModeOn: false
    }
  },
  breadcrumb: {
    breadcrumbs: []
  },
  headers: {
    shareableHeader: {
      scrollPosition: 'top'
    },
    slimHeader: {
      logoSectionEditModeOn: false
    }
  }
});

describe('LandingPage component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render', function () {
    const stubResetBreadcrumbs = stub();
    LandingPage.should.be.responsiveRenderable({
      store: store,
      resetBreadcrumbs: stubResetBreadcrumbs
    });
  });

  it('should render enough content', function () {
    const stubResetBreadcrumbs = spy();

    instance = renderIntoDocument(
      <Provider store={ store }>
        <LandingPage
          resetBreadcrumbs={ stubResetBreadcrumbs }
          pathname='/'
        />
      </Provider>
    );

    const documentMeta = findRenderedComponentWithType(instance, DocumentMeta);
    documentMeta.props.title.should.equal('CPDP');

    const responsiveStyleComponent = findRenderedComponentWithType(documentMeta, ResponsiveStyleComponent);

    findRenderedDOMComponentWithClass(responsiveStyleComponent, styles.landingPage).should.be.ok();

    const slimHeader = findRenderedComponentWithType(responsiveStyleComponent, SlimHeader);
    slimHeader.props.pathname.should.equal('/');

    findRenderedComponentWithType(responsiveStyleComponent, HeatMap).should.be.ok();
    findRenderedComponentWithType(responsiveStyleComponent, OfficersByAllegation).should.be.ok();
    findRenderedComponentWithType(responsiveStyleComponent, RecentActivity).should.be.ok();
    findRenderedComponentWithType(responsiveStyleComponent, RecentDocument).should.be.ok();
    findRenderedComponentWithType(responsiveStyleComponent, ComplaintSummaries).should.be.ok();
    findRenderedComponentWithType(responsiveStyleComponent, Footer).should.be.ok();
  });
});

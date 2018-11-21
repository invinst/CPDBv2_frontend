import React from 'react';
import MockStore from 'redux-mock-store';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedComponentWithType
} from 'react-addons-test-utils';
import { Provider } from 'react-redux';

import CRPage from 'components/cr-page';
import SummaryRow from 'components/cr-page/summary-row';
import ComplaintCategory from 'components/cr-page/complaint-category';
import ComplaintIncidentDate from 'components/cr-page/complaint-incident-date';
import RelatedComplaints from 'components/cr-page/related-complaints';
import { unmountComponentSuppressError } from 'utils/test';
import PrintNotes from 'components/common/print-notes';


describe('CRPage component', function () {
  let instance;
  const store = MockStore()({
    breadcrumb: {
      breadcrumbs: []
    },
    crPage: {
      relatedComplaints: {
        relatedByCategory: {
          pagination: {},
          cards: {
            cards: []
          }
        },
        relatedByOfficer: {
          pagination: {},
          cards: {
            cards: []
          }
        }
      }
    },
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render victims row when there are victims', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage victims={ ['Black, Male, Age 51'] } />
      </Provider>
    );
    const rowLabels = scryRenderedComponentsWithType(instance, SummaryRow).map(element => element.props.label);
    rowLabels.indexOf('VICTIM').should.not.eql(-1);
  });

  it('should render complainants row when there are complainants', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage complainants={ ['Black, Male, Age 51'] } />
      </Provider>
    );
    const rowLabels = scryRenderedComponentsWithType(instance, SummaryRow).map(element => element.props.label);
    rowLabels.indexOf('COMPLAINANT').should.not.eql(-1);
  });

  it('should render summary row when there are summary', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage summary='abc' />
      </Provider>
    );
    const rowLabels = scryRenderedComponentsWithType(instance, SummaryRow).map(element => element.props.label);
    rowLabels.indexOf('SUMMARY').should.not.eql(-1);
  });

  it('should not render victims row when there are no victims', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage />
      </Provider>
    );
    const rowLabels = scryRenderedComponentsWithType(instance, SummaryRow).map(element => element.props.label);
    rowLabels.indexOf('VICTIM').should.eql(-1);
  });

  it('should not render complainants row when there are no complainants', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage />
      </Provider>
    );
    const rowLabels = scryRenderedComponentsWithType(instance, SummaryRow).map(element => element.props.label);
    rowLabels.indexOf('COMPLAINANT').should.eql(-1);
  });

  it('should not render summary row when there are no summary', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage />
      </Provider>
    );
    const rowLabels = scryRenderedComponentsWithType(instance, SummaryRow).map(element => element.props.label);
    rowLabels.indexOf('SUMMARY').should.eql(-1);
  });

  it('should render ComplaintCategory', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage />
      </Provider>
    );
    findRenderedComponentWithType(instance, ComplaintCategory);
  });

  it('should render incident date', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage incidentDate='2012-12-05' />
      </Provider>
    );

    findRenderedComponentWithType(instance, ComplaintIncidentDate).should.be.ok();
  });

  it('should render RelatedComplaints when there is address', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage address='3000 Michigan Ave, Chicago IL'/>
      </Provider>
    );
    findRenderedComponentWithType(instance, RelatedComplaints);
  });

  it('should not render RelatedComplaints when there is no address', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage address=''/>
      </Provider>
    );
    scryRenderedComponentsWithType(instance, RelatedComplaints).should.have.length(0);
  });

  it('should not render PrintNotes component when isPrinting is false', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage isPrinting={ false } />
      </Provider>
    );
    scryRenderedComponentsWithType(instance, PrintNotes).should.have.length(0);
  });

  it('should render PrintNotes component when isPrinting is true', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage isPrinting={ true } />
      </Provider>
    );
    scryRenderedComponentsWithType(instance, PrintNotes).should.have.length(1);
  });
});

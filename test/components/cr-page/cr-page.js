import React from 'react';
import { spy } from 'sinon';
import MockStore from 'redux-mock-store';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';
import { Provider } from 'react-redux';

import CRPage from 'components/cr-page';
import SummaryRow from 'components/cr-page/summary-row';
import { unmountComponentSuppressError, reRender } from 'utils/test';


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
    }
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should trigger fetchCR on initial', function () {
    const fetchCR = spy();
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage fetchCR={ fetchCR } crid='123' />
      </Provider>
    );

    fetchCR.calledWith('123').should.be.true();
  });

  it('should trigger fetchCR if crid changed', function () {
    const fetchCR = spy();
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage crid='123' />
      </Provider>
    );

    instance = reRender(
      <Provider store={ store }>
        <CRPage crid='456' fetchCR={ fetchCR } />
      </Provider>,
      instance
    );
    fetchCR.calledWith('456').should.be.true();
  });

  it('should render victims row when there are victims', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage victims={ ['Black, Male, Age 51'] }/>
      </Provider>
    );
    const rowLabels = scryRenderedComponentsWithType(instance, SummaryRow).map(element => element.props.label);
    rowLabels.indexOf('VICTIM').should.not.eql(-1);
  });

  it('should render complainants row when there are complainants', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage complainants={ ['Black, Male, Age 51'] }/>
      </Provider>
    );
    const rowLabels = scryRenderedComponentsWithType(instance, SummaryRow).map(element => element.props.label);
    rowLabels.indexOf('COMPLAINANT').should.not.eql(-1);
  });

  it('should render summary row when there are summary', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage summary='abc'/>
      </Provider>
    );
    const rowLabels = scryRenderedComponentsWithType(instance, SummaryRow).map(element => element.props.label);
    rowLabels.indexOf('SUMMARY').should.not.eql(-1);
  });

  it('should not render victims row when there are no victims', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage/>
      </Provider>
    );
    const rowLabels = scryRenderedComponentsWithType(instance, SummaryRow).map(element => element.props.label);
    rowLabels.indexOf('VICTIM').should.eql(-1);
  });

  it('should not render complainants row when there are no complainants', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage/>
      </Provider>
    );
    const rowLabels = scryRenderedComponentsWithType(instance, SummaryRow).map(element => element.props.label);
    rowLabels.indexOf('COMPLAINANT').should.eql(-1);
  });

  it('should not render summary row when there are no summary', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage/>
      </Provider>
    );
    const rowLabels = scryRenderedComponentsWithType(instance, SummaryRow).map(element => element.props.label);
    rowLabels.indexOf('SUMMARY').should.eql(-1);
  });
});

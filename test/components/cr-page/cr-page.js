import React from 'react';
import MockStore from 'redux-mock-store';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';
import { Provider } from 'react-redux';

import CRPage from 'components/cr-page';
import SummaryRow from 'components/cr-page/summary-row';
import { unmountComponentSuppressError } from 'utils/test';
import Popup from 'components/common/popup';


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
    popups: [{
      name: 'category',
      page: 'complaint',
      title: 'Complaint Category',
      text: 'Some complaint category explanation',
    }, {
      name: 'accused_officer',
      page: 'complaint',
      title: 'Accused Officer',
      text: 'Some accused officer explanation',
    }, {
      name: 'investigator',
      page: 'complaint',
      title: 'Investigator',
      text: 'Some investigator explanation'
    }],
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
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

  it('should render popups', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage/>
      </Provider>
    );
    const popup = scryRenderedComponentsWithType(instance, Popup);
    popup[0].props.title.should.eql('Complaint Category');
    popup[0].props.text.should.eql('Some complaint category explanation');
  });
});

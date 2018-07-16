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
    const popup = {
      'category': {
        title: 'Complaint Category',
        text: 'Some complaint category explanation',
      },
      'accusedOfficer': {
        title: 'Accused Officer',
        text: 'Some accused officer explanation',
      },
      'investigator': {
        title: 'Investigator',
        text: 'Some investigator explanation',
      },
    };
    const involvements = {
      'investigator': [{ id: 1 }],
      'police_witness': [{ id: 2 }]
    };
    instance = renderIntoDocument(
      <Provider store={ store }>
        <CRPage popup={ popup } involvements={ involvements }/>
      </Provider>
    );
    const crPopup = scryRenderedComponentsWithType(instance, Popup);
    crPopup[0].props.title.should.eql('Complaint Category');
    crPopup[0].props.text.should.eql('Some complaint category explanation');
    crPopup[1].props.title.should.eql('Accused Officer');
    crPopup[1].props.text.should.eql('Some accused officer explanation');
    crPopup[2].props.title.should.eql('Investigator');
    crPopup[2].props.text.should.eql('Some investigator explanation');
  });
});
